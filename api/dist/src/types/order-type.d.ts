export interface CreateOrderPayload {
    eventId: number;
    ticketTypeId: number;
    quantity: number;
    voucherCode?: string | undefined;
    redeemedPoints?: number | undefined;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    paymentMethod: "CARD" | "BANK_TRANSFER";
}
export interface PreviewOrderPayload {
    eventId: number;
    ticketTypeId: number;
    quantity: number;
    voucherCode?: string | undefined;
    redeemedPoints?: number | undefined;
}
//# sourceMappingURL=order-type.d.ts.map