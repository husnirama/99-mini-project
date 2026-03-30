import { z } from "zod";
export declare const transactionStatusSchema: z.ZodEnum<{
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT";
    WAITING_FOR_ADMIN_CONFIRMATION: "WAITING_FOR_ADMIN_CONFIRMATION";
    DONE: "DONE";
    REJECTED: "REJECTED";
    EXPIRED: "EXPIRED";
    CANCELED: "CANCELED";
}>;
export declare const transactionListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT";
        WAITING_FOR_ADMIN_CONFIRMATION: "WAITING_FOR_ADMIN_CONFIRMATION";
        DONE: "DONE";
        REJECTED: "REJECTED";
        EXPIRED: "EXPIRED";
        CANCELED: "CANCELED";
    }>>;
    eventId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=transaction.validation.d.ts.map