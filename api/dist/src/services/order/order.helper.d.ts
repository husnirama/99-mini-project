export declare function getUserInfo(customerId: number): Promise<{
    id: number;
    email: string;
    name: string;
} | null>;
export declare function getTicketInfo(ticketTypeId: number, eventId: number): Promise<{
    event: {
        id: number;
        deletedAt: Date | null;
        organizeBy: number;
    };
    status: import("../../generated/prisma/enums.js").ticketStatus;
    quota: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    salesStartAt: Date;
    salesEndAt: Date;
} | null>;
export declare function getPromotionInfo(voucherCode: string, eventId: number): Promise<{
    id: number;
    discountType: import("../../generated/prisma/enums.js").promotionDiscountType;
    discountValue: import("@prisma/client-runtime-utils").Decimal;
    maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
    minPurchase: import("@prisma/client-runtime-utils").Decimal | null;
    quota: number;
    startDate: Date | null;
    endDate: Date | null;
    usedCount: number | null;
} | null>;
export declare function resolveBuyerInfo(customerId: number): Promise<{
    buyerName: string;
    buyerEmail: string;
}>;
export declare function calculateOrderAmounts(quantity: number, unitPrice: number, discountAmount: number): {
    subTotalAmount: number;
    totalAmount: number;
};
export declare function validateTicketAvailability(ticket: {
    salesStartAt: Date | null;
    salesEndAt: Date | null;
    status: string | null;
    event: {
        deletedAt: Date | null;
    };
} | null): void;
export declare function getCustomerAvailablePoints(customerId: number): Promise<number>;
export declare function normalizeRedeemedPoints(redeemedPoints?: number): number;
export declare function calculatePromotionDiscount(promotion: {
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number | string | {
        toString(): string;
    };
    maxDiscount?: number | string | {
        toString(): string;
    } | null;
}, subTotal: number): number;
export declare function calculatePointsDiscount(redeemedPoints: number, availablePoints: number, remainingAmount: number): number;
export declare function resolvePromotion(voucherCode: string | undefined, subTotal: number, eventId: number): Promise<{
    promotionId: number | null;
    voucherDiscountAmount: number;
}>;
//# sourceMappingURL=order.helper.d.ts.map