import { cacheTags, invalidateCacheTags } from "../../lib/cache.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
import { calculatePointsDiscount, calculatePromotionDiscount, getTicketInfo, getCustomerAvailablePoints, normalizeRedeemedPoints, resolveBuyerInfo, resolvePromotion, calculateOrderAmounts, validateTicketAvailability, } from "./order.helper.js";
import { createTransaction } from "../transaction.service.js";
import { Prisma } from "../../generated/prisma/client.js";
import { registerOrderJob, registerTransactionJob, } from "../../queues/order.scheduller.js";
async function buildOrderPricing(payload, customerId) {
    const ticketInfo = await getTicketInfo(payload.ticketTypeId, payload.eventId);
    validateTicketAvailability(ticketInfo);
    const unitPrice = Number(ticketInfo?.price);
    const subTotalAmount = payload.quantity * unitPrice;
    const availablePoints = await getCustomerAvailablePoints(customerId);
    const { promotionId, voucherDiscountAmount } = await resolvePromotion(payload.voucherCode, subTotalAmount, payload.eventId);
    const appliedRedeemedPoints = calculatePointsDiscount(payload.redeemedPoints ?? 0, availablePoints, subTotalAmount - voucherDiscountAmount);
    const discountAmount = voucherDiscountAmount + appliedRedeemedPoints;
    const { totalAmount } = calculateOrderAmounts(payload.quantity, unitPrice, discountAmount);
    return {
        ticketInfo,
        unitPrice,
        subTotalAmount,
        totalAmount,
        discountAmount,
        promotionId,
        voucherDiscountAmount,
        pointsDiscountAmount: appliedRedeemedPoints,
        appliedRedeemedPoints,
        availablePoints,
    };
}
export async function previewOrderPricing(payload, customerId) {
    const pricing = await buildOrderPricing(payload, customerId);
    return {
        unitPrice: pricing.unitPrice,
        quantity: payload.quantity,
        subTotalAmount: pricing.subTotalAmount,
        voucherDiscountAmount: pricing.voucherDiscountAmount,
        pointsDiscountAmount: pricing.pointsDiscountAmount,
        totalDiscountAmount: pricing.discountAmount,
        totalAmount: pricing.totalAmount,
        availablePoints: pricing.availablePoints,
        appliedRedeemedPoints: pricing.appliedRedeemedPoints,
        voucherCode: payload.voucherCode ?? null,
    };
}
export default async function orderCreation(payload, customerId) {
    const { buyerName, buyerEmail } = await resolveBuyerInfo(customerId);
    const pricing = await buildOrderPricing(payload, customerId);
    const normalizedRedeemedPoints = normalizeRedeemedPoints(payload.redeemedPoints);
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
    const result = await prisma.$transaction(async (tx) => {
        const freshTicketType = await tx.ticketType.findFirst({
            where: {
                id: payload.ticketTypeId,
                eventId: payload.eventId,
            },
            select: {
                id: true,
                eventId: true,
                quota: true,
                reserved: true,
                sold: true,
                salesEndAt: true,
                salesStartAt: true,
                status: true,
                event: {
                    select: {
                        deletedAt: true,
                    },
                },
            },
        });
        validateTicketAvailability(freshTicketType);
        const reserved = freshTicketType?.reserved ?? 0;
        const sold = freshTicketType?.sold ?? 0;
        const availableStock = (freshTicketType?.quota ?? 0) - reserved - sold;
        if (availableStock < payload.quantity) {
            throw new AppError("Ticket Stock is not enough", 400);
        }
        let promotionId = pricing.promotionId;
        let voucherDiscountAmount = pricing.voucherDiscountAmount;
        if (promotionId) {
            const freshPromotion = await tx.promotion.findUnique({
                where: { id: promotionId },
                select: {
                    id: true,
                    quota: true,
                    usedCount: true,
                    startDate: true,
                    endDate: true,
                    deletedAt: true,
                    discountType: true,
                    discountValue: true,
                    maxDiscount: true,
                },
            });
            if (!freshPromotion || freshPromotion.deletedAt) {
                throw new AppError("Voucher code is invalid", 400);
            }
            const now = new Date();
            if (freshPromotion.startDate && now < freshPromotion.startDate) {
                throw new AppError("Voucher is not active yet", 400);
            }
            if (freshPromotion.endDate && now > freshPromotion.endDate) {
                throw new AppError("Voucher has expired", 400);
            }
            const currentUsedCount = freshPromotion.usedCount ?? 0;
            if (freshPromotion.quota !== null &&
                currentUsedCount >= freshPromotion.quota) {
                throw new AppError("Voucher quota has been exhausted", 400);
            }
            voucherDiscountAmount = calculatePromotionDiscount(freshPromotion, pricing.subTotalAmount);
            await tx.promotion.update({
                where: { id: freshPromotion.id },
                data: {
                    usedCount: currentUsedCount + 1,
                },
            });
        }
        else {
            promotionId = null;
            voucherDiscountAmount = 0;
        }
        const freshPointsBalance = await tx.points.aggregate({
            where: {
                userId: customerId,
                deletedAt: null,
            },
            _sum: {
                points: true,
            },
        });
        const availablePoints = Math.max(0, freshPointsBalance._sum.points ?? 0);
        const pointsDiscountAmount = calculatePointsDiscount(normalizedRedeemedPoints, availablePoints, pricing.subTotalAmount - voucherDiscountAmount);
        const discountAmount = voucherDiscountAmount + pointsDiscountAmount;
        const { subTotalAmount, totalAmount } = calculateOrderAmounts(payload.quantity, pricing.unitPrice, discountAmount);
        const isZeroAmountOrder = totalAmount <= 0;
        await tx.ticketType.update({
            where: { id: freshTicketType.id },
            data: {
                reserved: reserved + payload.quantity,
            },
        });
        const order = await tx.order.create({
            data: {
                customerId,
                eventId: payload.eventId,
                ticketTypeId: payload.ticketTypeId,
                quantity: payload.quantity,
                unitPrice: pricing.unitPrice,
                subTotalAmount,
                discountAmount,
                totalAmount,
                promotionId,
                voucherCode: payload.voucherCode ?? null,
                buyerName,
                buyerEmail,
                buyerPhone: payload.buyerPhone.trim(),
                expiresAt,
                status: "PENDING",
            },
        });
        if (pointsDiscountAmount > 0) {
            await tx.points.create({
                data: {
                    userId: customerId,
                    points: -pointsDiscountAmount,
                    discount: order.id,
                    source: "PURCHASE",
                    expiresAt,
                },
            });
        }
        const transaction = await createTransaction(tx, {
            orderId: order.id,
            paymentMethod: payload.paymentMethod,
            status: isZeroAmountOrder
                ? "WAITING_FOR_ADMIN_CONFIRMATION"
                : "WAITING_FOR_PAYMENT",
        });
        return { order, transaction, isZeroAmountOrder };
    });
    if (result.isZeroAmountOrder) {
        await registerTransactionJob(result.order.id, result.transaction.id);
    }
    else {
        await registerOrderJob(result.order.id, result.transaction.id, expiresAt);
    }
    await invalidateCacheTags([
        cacheTags.eventsList,
        cacheTags.event(payload.eventId),
        cacheTags.organizerDashboard(pricing.ticketInfo.event.organizeBy),
        cacheTags.organizerScope(pricing.ticketInfo.event.organizeBy),
        cacheTags.transactionsOrganizer(pricing.ticketInfo.event.organizeBy),
        cacheTags.transactionsUser(customerId),
        cacheTags.customerPoints(customerId),
        cacheTags.customerProfile(customerId),
        cacheTags.customerScope(customerId),
    ]);
    return {
        order: result.order,
        transaction: result.transaction,
    };
}
//# sourceMappingURL=order.service.js.map