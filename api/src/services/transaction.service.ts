import type { Prisma, Role } from "../generated/prisma/client.js";
import type { CreateTransactionTxPayload } from "../types/transaction-type.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/app-error.js";
import { registerTransactionJob } from "../queues/order.scheduller.js";
import cloudinary from "../lib/cloudinary.js";
import { hashGuestToken } from "../utils/guest-token.js";

interface TransactionActor {
  userId?: number | null;
  role?: Role | string | null;
  guestToken?: string | null;
}

export async function createTransaction(
  tx: Prisma.TransactionClient,
  payload: CreateTransactionTxPayload,
) {
  return tx.transaction.create({
    data: {
      orderId: payload.orderId,
      paymentMethod: payload.paymentMethod,
      status: "WAITING_FOR_PAYMENT",
    },
  });
}

async function getTransactionForAction(transactionId: number) {
  return prisma.transaction.findUnique({
    where: { id: transactionId },
    include: {
      order: {
        select: {
          id: true,
          customerId: true,
          guestTokenHash: true,
          ticketTypeId: true,
          quantity: true,
          promotionId: true,
          status: true,
          event: {
            select: {
              organizeBy: true,
            },
          },
        },
      },
    },
  });
}

function assertCustomerOwnership(
  transaction: NonNullable<Awaited<ReturnType<typeof getTransactionForAction>>>,
  actor: TransactionActor,
) {
  if (transaction.order.customerId) {
    if (!actor.userId || transaction.order.customerId !== actor.userId) {
      throw new AppError("Forbidden Action, Not the right user", 403);
    }
    return;
  }
  if (!actor.guestToken) {
    throw new AppError("Guest Token is Required", 401);
  }

  const hashedToken = hashGuestToken(actor.guestToken);
  if (
    !transaction.order.guestTokenHash ||
    hashedToken !== transaction.order.guestTokenHash
  ) {
    throw new AppError("Invalid guest Token", 403);
  }
}

function assertOrganizerOwnership(
  transaction: NonNullable<Awaited<ReturnType<typeof getTransactionForAction>>>,
  actor: TransactionActor,
) {
  if (!actor.userId) {
    throw new AppError("Unauthorized", 401);
  }
  if (actor.role !== "EVENT_ORGANIZER") {
    throw new AppError("Unauthorized", 401);
  }
  if (transaction.order.event.organizeBy !== actor.userId) {
    throw new AppError("Forbidden Action, not the right Orginzer", 403);
  }
}

function assertCancelByActor(
  transaction: NonNullable<Awaited<ReturnType<typeof getTransactionForAction>>>,
  actor: TransactionActor,
) {
  if (actor.userId && transaction.order.event.organizeBy === actor.userId) {
    return;
  }
  assertCustomerOwnership(transaction, actor);
}

async function restoreOrderResources(
  tx: Prisma.TransactionClient,
  data: {
    ticketTypeId: number;
    quantity: number;
    promotionId: number | null;
  },
) {
  const ticketType = await tx.ticketType.findUnique({
    where: { id: data.ticketTypeId },
    select: {
      id: true,
      reserved: true,
    },
  });

  if (!ticketType) {
    throw new AppError("Ticket not found", 404);
  }
  const currentReserved = ticketType.reserved ?? 0;
  const nextReserved = Math.max(0, currentReserved - data.quantity);

  await tx.ticketType.update({
    where: { id: ticketType.id },
    data: {
      reserved: nextReserved,
    },
  });

  if (data.promotionId) {
    const promotion = await tx.promotion.findUnique({
      where: {
        id: data.promotionId,
      },
      select: {
        id: true,
        usedCount: true,
      },
    });

    if (promotion) {
      const currentUsedCount = promotion.usedCount ?? 0;
      const nextUsedCount = Math.max(0, currentUsedCount - 1);

      await tx.promotion.update({
        where: { id: promotion.id },
        data: {
          usedCount: nextUsedCount,
        },
      });
    }
  }
}

async function finalizeOrderResource(
  tx: Prisma.TransactionClient,
  data: {
    ticketTypeId: number;
    quantity: number;
  },
) {
  const ticketType = await tx.ticketType.findUnique({
    where: { id: data.ticketTypeId },
    select: {
      id: true,
      reserved: true,
      sold: true,
    },
  });
  if (!ticketType) {
    throw new AppError("Ticket not found", 404);
  }

  const currentReserved = ticketType.reserved ?? 0;
  const currentSold = ticketType.sold ?? 0;

  await tx.ticketType.update({
    where: { id: ticketType.id },
    data: {
      reserved: Math.max(0, currentReserved - data.quantity),
      sold: currentSold + data.quantity,
    },
  });
}

export async function uploadPaymentProof(
  transactionId: number,
  paymentProof: Express.Multer.File,
  actor: TransactionActor,
) {
  const transaction = await getTransactionForAction(transactionId);

  if (!paymentProof) {
    throw new AppError("Please upload payment proof image", 400);
  }

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }
  assertCustomerOwnership(transaction, actor);

  if (transaction.status !== "WAITING_FOR_PAYMENT") {
    throw new AppError("Transaction is not waiting for payment", 400);
  }

  const uploadResult = await cloudinary.uploader.upload(paymentProof.path);
  const paymentProofUrl = uploadResult.secure_url;

  const updatedTransaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      paymentProof: paymentProofUrl,
      status: "WAITING_FOR_ADMIN_CONFIRMATION",
    },
  });
  registerTransactionJob(transaction.order.id, updatedTransaction.id);
  return updatedTransaction;
}

export async function approveTransaction(
  transactionId: number,
  adminId: number,
  actor: TransactionActor,
) {
  const transaction = await getTransactionForAction(transactionId);

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  assertOrganizerOwnership(transaction, actor);

  if (transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
    throw new AppError(
      "Transaction is not waiting for admin confirmation",
      400,
    );
  }

  return prisma.$transaction(async (tx) => {
    await finalizeOrderResource(tx, {
      ticketTypeId: transaction.order.ticketTypeId,
      quantity: transaction.order.quantity,
    });

    await tx.order.update({
      where: { id: transaction.order.id },
      data: {
        status: "COMPLETED",
      },
    });

    return tx.transaction.update({
      where: { id: transactionId },
      data: {
        status: "DONE",
        paidAt: new Date(),
        verifiedAt: new Date(),
        verifiedBy: adminId,
      },
    });
  });
}

export async function rejectTransaction(
  transactionId: number,
  adminId: number,
  role: string,
  actor: TransactionActor,
) {
  if (!adminId && role !== "EVENT_ORGANIZER") {
    throw new AppError("Unauthorized", 401);
  }
  const transaction = await getTransactionForAction(transactionId);

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  assertOrganizerOwnership(transaction, actor);

  if (transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
    throw new AppError(
      "Transaction is not waiting for admin confirmation",
      400,
    );
  }

  return prisma.$transaction(async (tx) => {
    await restoreOrderResources(tx, {
      ticketTypeId: transaction.order.ticketTypeId,
      quantity: transaction.order.quantity,
      promotionId: transaction.order.promotionId,
    });

    await tx.order.update({
      where: { id: transaction.order.id },
      data: {
        status: "REJECTED",
      },
    });

    return tx.transaction.update({
      where: { id: transactionId },
      data: {
        status: "REJECTED",
        verifiedAt: new Date(),
        verifiedBy: adminId,
      },
    });
  });
}

export async function cancelTransaction(
  transactionId: number,
  actor: TransactionActor,
) {
  const transaction = await getTransactionForAction(transactionId);

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  assertCancelByActor(transaction, actor);
  if (
    transaction.status !== "WAITING_FOR_PAYMENT" &&
    transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION"
  ) {
    throw new AppError("Transaction can not be canceled", 400);
  }

  return prisma.$transaction(async (tx) => {
    await restoreOrderResources(tx, {
      ticketTypeId: transaction.order.ticketTypeId,
      quantity: transaction.order.quantity,
      promotionId: transaction.order.promotionId,
    });

    await tx.order.update({
      where: { id: transaction.order.id },
      data: {
        status: "CANCELED",
      },
    });

    return tx.transaction.update({
      where: { id: transactionId },
      data: {
        status: "CANCELED",
      },
    });
  });
}

export async function expireTransaction(transactionId: number) {
  const transaction = await getTransactionForAction(transactionId);

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  if (
    transaction.status !== "WAITING_FOR_PAYMENT" &&
    transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION"
  ) {
    return transaction;
  }

  return prisma.$transaction(async (tx) => {
    await restoreOrderResources(tx, {
      ticketTypeId: transaction.order.ticketTypeId,
      quantity: transaction.order.quantity,
      promotionId: transaction.order.promotionId,
    });

    await tx.order.update({
      where: { id: transaction.order.id },
      data: {
        status: "EXPIRED",
      },
    });

    return tx.transaction.update({
      where: { id: transactionId },
      data: {
        status: "EXPIRED",
      },
    });
  });
}
