import type { CreateOrderPayload } from "../../types/order-type.js";
export default function orderCreation(payload: CreateOrderPayload, customerId?: number): Promise<{
    guestToken: string | null;
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
        paymentMethod: import("../../generated/prisma/enums.js").paymentMethod;
        paymentProof: string | null;
        paidAt: Date | null;
        verifiedBy: number | null;
        verifiedAt: Date | null;
        canceledAt: Date | null;
        canceledBy: import("../../generated/prisma/enums.js").cancelActor | null;
        rejectedReason: string | null;
    };
}>;
//# sourceMappingURL=order.service.d.ts.map