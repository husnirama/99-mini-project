import { paymentMethod, transactionStatus } from "../generated/prisma/client.js";
export interface CreateTransactionTxPayload {
    orderId: number;
    paymentMethod: paymentMethod;
}
export interface TransactionListQuery {
    status?: transactionStatus | undefined;
    eventId?: number | undefined;
}
//# sourceMappingURL=transaction-type.d.ts.map