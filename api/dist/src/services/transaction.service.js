import { cacheTags, invalidateCacheTags } from "../lib/cache.js";
import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import { registerTransactionJob } from "../queues/order.scheduller.js";
import { hashGuestToken } from "../utils/guest-token.js";
import { AppError } from "../utils/app-error.js";
const transactionLifecycleInclude = {
    order: {
        include: {
            event: {
                include: {
                    venue: true,
                    eventImage: true,
                },
            },
            ticket: true,
        },
    },
};
export async function createTransaction(tx, payload) {
    return tx.transaction.create({
        data: {
            orderId: payload.orderId,
            paymentMethod: payload.paymentMethod,
            status: "WAITING_FOR_PAYMENT",
        },
    });
}
async function getTransactionForAction(transactionId) {
    return prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
            order: {
                select: {
                    id: true,
                    customerId: true,
                    eventId: true,
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
async function getTransactionWithLifecycle(transactionId) {
    return prisma.transaction.findUnique({
        where: { id: transactionId },
        include: transactionLifecycleInclude,
    });
}
function assertCustomerOwnership(transaction, actor) {
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
    if (!transaction.order.guestTokenHash ||
        hashedToken !== transaction.order.guestTokenHash) {
        throw new AppError("Invalid guest Token", 403);
    }
}
async function invalidateTransactionCache(transactionId, transaction) {
    await invalidateCacheTags([
        cacheTags.transaction(transactionId),
        cacheTags.transactionsOrganizer(transaction.order.event.organizeBy),
        cacheTags.organizerDashboard(transaction.order.event.organizeBy),
        cacheTags.organizerScope(transaction.order.event.organizeBy),
        cacheTags.eventsList,
        cacheTags.event(transaction.order.eventId),
        ...(transaction.order.customerId
            ? [cacheTags.transactionsUser(transaction.order.customerId)]
            : []),
    ]);
}
function assertOrganizerOwnership(transaction, actor) {
    if (!actor.userId) {
        throw new AppError("Unauthorized", 401);
    }
    if (actor.role !== "EVENT_ORGANIZER") {
        throw new AppError("Unauthorized", 401);
    }
    if (transaction.order.event.organizeBy !== actor.userId) {
        throw new AppError("Forbidden action, not the right organizer", 403);
    }
}
function assertCancelByActor(transaction, actor) {
    if (actor.userId && transaction.order.event.organizeBy === actor.userId) {
        return;
    }
    assertCustomerOwnership(transaction, actor);
}
function assertLifecycleAccess(transaction, actor) {
    if (actor.userId &&
        actor.role === "EVENT_ORGANIZER" &&
        transaction.order.event.organizeBy === actor.userId) {
        return;
    }
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
    if (!transaction.order.guestTokenHash ||
        hashedToken !== transaction.order.guestTokenHash) {
        throw new AppError("Invalid guest Token", 403);
    }
}
function serializeLifecycleRecord(transaction) {
    const venue = transaction.order.event.venue?.[0];
    const eventImage = transaction.order.event.eventImage?.[0]?.imageURL ??
        "https://via.placeholder.com/1200x700?text=Event";
    return {
        order: {
            id: transaction.order.id,
            customerId: transaction.order.customerId,
            eventId: transaction.order.eventId,
            ticketTypeId: transaction.order.ticketTypeId,
            quantity: transaction.order.quantity,
            unitPrice: transaction.order.unitPrice,
            subTotalAmount: transaction.order.subTotalAmount,
            discountAmount: transaction.order.discountAmount,
            totalAmount: transaction.order.totalAmount,
            promotionId: transaction.order.promotionId,
            voucherCode: transaction.order.voucherCode,
            buyerName: transaction.order.buyerName,
            buyerEmail: transaction.order.buyerEmail,
            buyerPhone: transaction.order.buyerPhone,
            status: transaction.order.status,
            createdAt: transaction.order.createdAt,
            updatedAt: transaction.order.updatedAt,
            expiresAt: transaction.order.expiresAt,
        },
        transaction: {
            id: transaction.id,
            orderId: transaction.orderId,
            paymentMethod: transaction.paymentMethod,
            paymentProof: transaction.paymentProof,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            paidAt: transaction.paidAt,
            verifiedBy: transaction.verifiedBy,
            verifiedAt: transaction.verifiedAt,
            canceledAt: transaction.canceledAt,
            canceledBy: transaction.canceledBy,
            rejectedReason: transaction.rejectedReason,
        },
        event: {
            id: transaction.order.event.id,
            title: transaction.order.event.title,
            category: transaction.order.event.category,
            eventDateStart: transaction.order.event.eventDateStart,
            eventDateEnd: transaction.order.event.eventDateEnd,
            image: eventImage,
            locationLabel: [venue?.name, venue?.city, venue?.region, venue?.country]
                .filter(Boolean)
                .join(", "),
        },
        ticket: {
            id: transaction.order.ticket.id,
            name: transaction.order.ticket.name,
            price: Number(transaction.order.ticket.price),
            quota: transaction.order.ticket.quota,
            status: transaction.order.ticket.status,
            description: transaction.order.ticket.description,
        },
    };
}
function buildTransactionListWhere(actor, query) {
    if (!actor.userId) {
        throw new AppError("Unauthorized", 401);
    }
    const where = {};
    if (query.status) {
        where.status = query.status;
    }
    if (actor.role === "EVENT_ORGANIZER") {
        where.order = {
            event: {
                organizeBy: actor.userId,
                ...(query.eventId ? { id: query.eventId } : {}),
            },
        };
        return where;
    }
    where.order = {
        customerId: actor.userId,
        ...(query.eventId ? { eventId: query.eventId } : {}),
    };
    return where;
}
async function restoreOrderResources(tx, data) {
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
async function finalizeOrderResource(tx, data) {
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
export async function listTransactions(actor, query) {
    const transactions = await prisma.transaction.findMany({
        where: buildTransactionListWhere(actor, query),
        include: transactionLifecycleInclude,
        orderBy: {
            createdAt: "desc",
        },
    });
    return transactions.map(serializeLifecycleRecord);
}
export async function getTransactionDetail(transactionId, actor) {
    const transaction = await getTransactionWithLifecycle(transactionId);
    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }
    assertLifecycleAccess(transaction, actor);
    return serializeLifecycleRecord(transaction);
}
export async function uploadPaymentProof(transactionId, paymentProof, actor) {
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
    await registerTransactionJob(transaction.order.id, updatedTransaction.id);
    await invalidateTransactionCache(transactionId, transaction);
    return updatedTransaction;
}
export async function approveTransaction(transactionId, adminId, actor) {
    const transaction = await getTransactionForAction(transactionId);
    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }
    assertOrganizerOwnership(transaction, actor);
    if (transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
        throw new AppError("Transaction is not waiting for admin confirmation", 400);
    }
    const updatedTransaction = await prisma.$transaction(async (tx) => {
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
    await invalidateTransactionCache(transactionId, transaction);
    return updatedTransaction;
}
export async function rejectTransaction(transactionId, adminId, role, actor) {
    if (!adminId && role !== "EVENT_ORGANIZER") {
        throw new AppError("Unauthorized", 401);
    }
    const transaction = await getTransactionForAction(transactionId);
    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }
    assertOrganizerOwnership(transaction, actor);
    if (transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
        throw new AppError("Transaction is not waiting for admin confirmation", 400);
    }
    const updatedTransaction = await prisma.$transaction(async (tx) => {
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
    await invalidateTransactionCache(transactionId, transaction);
    return updatedTransaction;
}
export async function cancelTransaction(transactionId, actor) {
    const transaction = await getTransactionForAction(transactionId);
    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }
    assertCancelByActor(transaction, actor);
    if (transaction.status !== "WAITING_FOR_PAYMENT" &&
        transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
        throw new AppError("Transaction can not be canceled", 400);
    }
    const updatedTransaction = await prisma.$transaction(async (tx) => {
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
                canceledAt: new Date(),
                canceledBy: actor.userId && actor.role === "EVENT_ORGANIZER" ? "ADMIN" : "USER",
            },
        });
    });
    await invalidateTransactionCache(transactionId, transaction);
    return updatedTransaction;
}
export async function expireTransaction(transactionId) {
    const transaction = await getTransactionForAction(transactionId);
    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }
    if (transaction.status !== "WAITING_FOR_PAYMENT" &&
        transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
        return transaction;
    }
    const updatedTransaction = await prisma.$transaction(async (tx) => {
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
    await invalidateTransactionCache(transactionId, transaction);
    return updatedTransaction;
}
//# sourceMappingURL=transaction.service.js.map