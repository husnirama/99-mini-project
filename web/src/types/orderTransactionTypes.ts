export type PaymentMethod = "CARD" | "BANK_TRANSFER";

export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export type OrderStatus =
  | "PENDING"
  | "COMPLETED"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export type NormalizedOrderStatus =
  | "PENDING"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface CreateOrderPayload {
  eventId: number;
  ticketTypeId: number;
  quantity: number;
  voucherCode?: string;
  redeemedPoints?: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  paymentMethod: PaymentMethod;
}

export interface OrderPricingPreview {
  unitPrice: number;
  quantity: number;
  subTotalAmount: number;
  voucherDiscountAmount: number;
  pointsDiscountAmount: number;
  totalDiscountAmount: number;
  totalAmount: number;
  availablePoints: number;
  appliedRedeemedPoints: number;
  voucherCode?: string | null;
}

export interface OrderRecord {
  id: number;
  customerId?: number | null;
  eventId: number;
  ticketTypeId: number;
  quantity: number;
  unitPrice: number;
  subTotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  promotionId?: number | null;
  voucherCode?: string | null;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string;
}

export interface TransactionRecord {
  id: number;
  orderId: number;
  paymentMethod: PaymentMethod;
  paymentProof?: string | null;
  status: TransactionStatus;
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string | null;
  verifiedBy?: number | null;
  verifiedAt?: string | null;
  canceledAt?: string | null;
  canceledBy?: "USER" | "ADMIN" | null;
  rejectedReason?: string | null;
}

export interface TransactionCheckoutResponse {
  order: OrderRecord;
  transaction: TransactionRecord;
}

export interface OrderEventSnapshot {
  id: number;
  title: string;
  category?: string | null;
  eventDateStart: string;
  eventDateEnd: string;
  image?: string | null;
  locationLabel: string;
}

export interface OrderTicketSnapshot {
  id: number;
  name: string;
  price: number;
  quota?: number;
  status?: string;
  description?: string | null;
}

export interface TransactionLifecycleRecord {
  order: OrderRecord;
  transaction: TransactionRecord;
  event: OrderEventSnapshot;
  ticket: OrderTicketSnapshot;
  lastSyncedAt: string;
}

export type TransactionStatusFilter = "ALL" | TransactionStatus;
