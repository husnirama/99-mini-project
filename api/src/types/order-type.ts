export interface CreateOrderPayload {
  eventId: number;
  ticketTypeId: number;
  quantity: number;
  voucherCode?: string | undefined;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  paymentMethod: "CARD" | "BANK_TRANSFER";
}
