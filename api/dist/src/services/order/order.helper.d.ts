import type { CreateOrderPayload } from "../../types/order-type.js";
export declare function getUserInfo(customerId: number): Promise<{
    id: number;
    name: string;
    email: string;
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
export declare function getPromotionInfo(voucherCode: string): Promise<{
    discountType: import("../../generated/prisma/enums.js").promotionDiscountType;
    id: number;
    discountValue: import("@prisma/client-runtime-utils").Decimal;
    maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
    minPurchase: import("@prisma/client-runtime-utils").Decimal | null;
    quota: number;
    usedCount: number | null;
    startDate: Date | null;
    endDate: Date | null;
} | null>;
export declare function resolveBuyerInfo(payload: CreateOrderPayload, customerId: number | null): Promise<{
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
export declare function resolvePromotion(voucherCode: string | undefined, subTotal: number): Promise<{
    promotionId: number | null;
    discountAmount: number;
}>;
//# sourceMappingURL=order.helper.d.ts.map