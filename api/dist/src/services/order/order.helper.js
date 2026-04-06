import { srLatn } from "date-fns/locale";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
export async function getUserInfo(customerId) {
    return prisma.user.findUnique({
        where: { id: customerId },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}
export async function getTicketInfo(ticketTypeId, eventId) {
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
export async function getPromotionInfo(voucherCode, eventId) {
    return prisma.promotion.findFirst({
        where: {
            code: voucherCode,
            eventId,
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
export async function resolveBuyerInfo(customerId) {
    const buyerInfo = await getUserInfo(customerId);
    if (!buyerInfo) {
        throw new AppError("User Not Found", 404);
    }
    return {
        buyerName: buyerInfo.name,
        buyerEmail: buyerInfo.email,
    };
}
export function calculateOrderAmounts(quantity, unitPrice, discountAmount) {
    const subTotalAmount = quantity * unitPrice;
    const totalAmount = Math.max(0, subTotalAmount - discountAmount);
    return {
        subTotalAmount,
        totalAmount,
    };
}
export function validateTicketAvailability(ticket) {
    const now = new Date(new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
    }));
    if (!ticket || ticket.event.deletedAt) {
        throw new AppError("Ticket not found", 404);
    }
    if (ticket.salesEndAt && now > ticket.salesEndAt) {
        throw new AppError("Ticket sales has ended", 400);
    }
    if (ticket.salesStartAt && now < ticket.salesStartAt) {
        console.log("Sales Start At:", ticket.salesStartAt, now);
        throw new AppError("Ticket sales has not started yet", 400);
    }
    if (ticket.status !== "ACTIVE") {
        throw new AppError("Ticket is not active", 400);
    }
}
export async function getCustomerAvailablePoints(customerId) {
    const pointsBalance = await prisma.points.aggregate({
        where: {
            userId: customerId,
            deletedAt: null,
        },
        _sum: {
            points: true,
        },
    });
    return Math.max(0, pointsBalance._sum.points ?? 0);
}
export function normalizeRedeemedPoints(redeemedPoints) {
    if (!Number.isFinite(redeemedPoints)) {
        return 0;
    }
    return Math.max(0, Math.floor(redeemedPoints ?? 0));
}
export function calculatePromotionDiscount(promotion, subTotal) {
    let discountAmount = 0;
    if (promotion.discountType === "PERCENTAGE") {
        discountAmount = Math.floor((subTotal * Number(promotion.discountValue)) / 100);
        if (promotion.maxDiscount !== null && promotion.maxDiscount !== undefined) {
            discountAmount = Math.min(discountAmount, Number(promotion.maxDiscount));
        }
    }
    if (promotion.discountType === "FIXED") {
        discountAmount = Number(promotion.discountValue);
    }
    return Math.min(discountAmount, subTotal);
}
export function calculatePointsDiscount(redeemedPoints, availablePoints, remainingAmount) {
    return Math.min(normalizeRedeemedPoints(redeemedPoints), Math.max(0, availablePoints), Math.max(0, remainingAmount));
}
export async function resolvePromotion(voucherCode, subTotal, eventId) {
    if (!voucherCode) {
        return {
            promotionId: null,
            voucherDiscountAmount: 0,
        };
    }
    const promotionInfo = await getPromotionInfo(voucherCode, eventId);
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
    if (promotionInfo.minPurchase &&
        subTotal < Number(promotionInfo.minPurchase)) {
        throw new AppError(`Minimum Purchase for this voucher is ${promotionInfo.minPurchase}`, 400);
    }
    const quota = promotionInfo.quota;
    const usedCount = promotionInfo.usedCount ?? 0;
    if (quota !== null && usedCount >= quota) {
        throw new AppError("Voucher quota has been execeeded", 400);
    }
    return {
        promotionId: promotionInfo.id,
        voucherDiscountAmount: calculatePromotionDiscount(promotionInfo, subTotal),
    };
}
//# sourceMappingURL=order.helper.js.map