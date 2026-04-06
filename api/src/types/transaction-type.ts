import {
  paymentMethod,
  transactionStatus,
} from "../generated/prisma/client.js";

export interface CreateTransactionTxPayload {
  orderId: number;
  paymentMethod: paymentMethod;
  status?: transactionStatus;
  paidAt?: Date | null;
}

export interface TransactionListQuery {
  status?: transactionStatus | undefined;
  eventId?: number | undefined;
}
