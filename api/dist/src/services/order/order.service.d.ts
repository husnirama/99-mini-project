import type { CreateOrderPayload, PreviewOrderPayload } from "../../types/order-type.js";
export declare function previewOrderPricing(payload: PreviewOrderPayload, customerId: number): Promise<{
    unitPrice: number;
    quantity: number;
    subTotalAmount: number;
    voucherDiscountAmount: number;
    pointsDiscountAmount: number;
    totalDiscountAmount: number;
    totalAmount: number;
    availablePoints: number;
    appliedRedeemedPoints: number;
    voucherCode: string | null;
}>;
export default function orderCreation(payload: CreateOrderPayload, customerId: number): Promise<{
    order: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums.js").orderStatus;
        eventId: number;
        expiresAt: Date;
        customerId: number | null;
        ticketTypeId: number;
        quantity: number;
        unitPrice: number;
        subTotalAmount: number;
        discountAmount: number;
        totalAmount: number;
        promotionId: number | null;
        voucherCode: string | null;
        buyerName: string;
        buyerEmail: string;
        buyerPhone: string;
        guestTokenHash: string | null;
    };
    transaction: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums.js").transactionStatus;
        orderId: number;
        paidAt: Date | null;
        paymentMethod: import("../../generated/prisma/enums.js").paymentMethod;
        paymentProof: string | null;
        verifiedAt: Date | null;
        verifiedBy: number | null;
        canceledAt: Date | null;
        canceledBy: import("../../generated/prisma/enums.js").cancelActor | null;
        rejectedReason: string | null;
    };
}>;
//# sourceMappingURL=order.service.d.ts.map