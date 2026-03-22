import { Prisma, paymentMethod } from "../generated/prisma/client.js";

export interface CreateTransactionTxPayload {
  orderId: number;
  paymentMethod: paymentMethod;
}
