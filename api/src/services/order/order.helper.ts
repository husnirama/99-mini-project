import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";

export async function getUserInfo(customerId: number) {
  return prisma.user.findUnique({
    where: { id: customerId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export async function getTicketInfo(ticketTypeId: number, eventId: number) {
  return prisma.ticketType.findUnique({
    where: { id: ticketTypeId, eventId: eventId },
    select: {
      price: true,
      quota: true,
      salesStartAt: true,
      salesEndAt: true,
      status: true,
      event: {
        select: {
          id: true,
          organizeBy: true,
          deletedAt: true,
        },
      },
    },
  });
}

export async function getPromotionInfo(voucherCode: string) {
  return prisma.promotion.findFirst({
    where: {
      code: voucherCode,
      deletedAt: null,
    },
    select: {
      id: true,
      discountType: true,
      discountValue: true,
      maxDiscount: true,
      minPurchase: true,
      startDate: true,
      endDate: true,
      quota: true,
      usedCount: true,
    },
  });
}

export async function resolveBuyerInfo(
  customerId: number,
) {
  const buyerInfo = await getUserInfo(customerId);
  if (!buyerInfo) {
    throw new AppError("User Not Found", 404);
  }

  return {
    buyerName: buyerInfo.name,
    buyerEmail: buyerInfo.email,
  };
}

export function calculateOrderAmounts(
  quantity: number,
  unitPrice: number,
  discountAmount: number,
) {
  const subTotalAmount = quantity * unitPrice;
  const totalAmount = Math.max(0, subTotalAmount - discountAmount);

  return {
    subTotalAmount,
    totalAmount,
  };
}

export function validateTicketAvailability(
  ticket: {
    salesStartAt: Date | null;
    salesEndAt: Date | null;
    status: string | null;
    event: { deletedAt: Date | null };
  } | null,
) {
  const now = new Date();
  if (!ticket || ticket.event.deletedAt) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.salesEndAt && now > ticket.salesEndAt) {
    throw new AppError("Ticket sales has ended", 400);
  }

  if (ticket.salesStartAt && now < ticket.salesStartAt) {
    throw new AppError("Ticket sales has not started yet", 400);
  }

  if (ticket.status !== "ACTIVE") {
    throw new AppError("Ticket is not active", 400);
  }
}

export async function resolvePromotion(
  voucherCode: string | undefined,
  subTotal: number,
) {
  if (!voucherCode) {
    return {
      promotionId: null as number | null,
      discountAmount: 0,
    };
  }

  const promotionInfo = await getPromotionInfo(voucherCode);

  if (!promotionInfo) {
    throw new AppError("Voucher Code is invalid", 400);
  }

  const now = new Date();
  if (promotionInfo.startDate && now < promotionInfo.startDate) {
    throw new AppError("Voucher is not active yet", 400);
  }

  if (promotionInfo.endDate && now > promotionInfo.endDate) {
    throw new AppError("Voucher has expired", 400);
  }

  if (
    promotionInfo.minPurchase &&
    subTotal < Number(promotionInfo.minPurchase)
  ) {
    throw new AppError(
      `Minimum Purchase for this voucher is ${promotionInfo.minPurchase}`,
      400,
    );
  }

  const quota = promotionInfo.quota;
  const usedCount = promotionInfo.usedCount ?? 0;

  if (quota !== null && usedCount >= quota) {
    throw new AppError("Voucher quota has been execeeded", 400);
  }

  let discountAmount = 0;
  if (promotionInfo.discountType === "PERCENTAGE") {
    discountAmount = Math.floor(
      (subTotal * Number(promotionInfo.discountValue)) / 100,
    );
  }

  if (promotionInfo.discountType === "FIXED") {
    discountAmount = Number(promotionInfo.discountValue);
  }

  discountAmount = Math.min(discountAmount, subTotal);

  return {
    promotionId: promotionInfo.id,
    discountAmount,
  };
}
