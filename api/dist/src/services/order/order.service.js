import { cacheTags, invalidateCacheTags } from "../../lib/cache.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
import { getTicketInfo, resolveBuyerInfo, resolvePromotion, calculateOrderAmounts, validateTicketAvailability, } from "./order.helper.js";
import { createTransaction } from "../transaction.service.js";
import { Prisma } from "../../generated/prisma/client.js";
import { registerOrderJob } from "../../queues/order.scheduller.js";
export default async function orderCreation(payload, customerId) {
    const { buyerName, buyerEmail } = await resolveBuyerInfo(customerId);
    const ticketInfo = await getTicketInfo(payload.ticketTypeId, payload.eventId);
    validateTicketAvailability(ticketInfo);
    const unitPrice = Number(ticketInfo?.price);
    const initialAmount = payload.quantity * Number(unitPrice);
    const { promotionId, discountAmount } = await resolvePromotion(payload.voucherCode, initialAmount);
    const { subTotalAmount, totalAmount } = calculateOrderAmounts(payload.quantity, unitPrice, discountAmount);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
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
        await tx.ticketType.update({
            where: { id: freshTicketType.id },
            data: {
                reserved: reserved + payload.quantity,
            },
        });
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
            await tx.promotion.update({
                where: { id: freshPromotion.id },
                data: {
                    usedCount: currentUsedCount + 1,
                },
            });
        }
        const order = await tx.order.create({
            data: {
                customerId,
                eventId: payload.eventId,
                ticketTypeId: payload.ticketTypeId,
                quantity: payload.quantity,
                unitPrice,
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
        const transaction = await createTransaction(tx, {
            orderId: order.id,
            paymentMethod: payload.paymentMethod,
        });
        return { order, transaction };
    });
    await registerOrderJob(result.order.id, result.transaction.id, expiresAt);
    await invalidateCacheTags([
        cacheTags.eventsList,
        cacheTags.event(payload.eventId),
        cacheTags.organizerDashboard(ticketInfo.event.organizeBy),
        cacheTags.organizerScope(ticketInfo.event.organizeBy),
        cacheTags.transactionsOrganizer(ticketInfo.event.organizeBy),
        cacheTags.transactionsUser(customerId),
    ]);
    return result;
}
//# sourceMappingURL=order.service.js.map