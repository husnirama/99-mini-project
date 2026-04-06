import { z } from "zod";
export declare const orderSchema: z.ZodObject<{
    eventId: z.ZodNumber;
    ticketTypeId: z.ZodNumber;
    quantity: z.ZodNumber;
    voucherCode: z.ZodOptional<z.ZodString>;
    redeemedPoints: z.ZodOptional<z.ZodNumber>;
    buyerName: z.ZodString;
    buyerEmail: z.ZodEmail;
    buyerPhone: z.ZodString;
    paymentMethod: z.ZodEnum<{
        CARD: "CARD";
        BANK_TRANSFER: "BANK_TRANSFER";
    }>;
}, z.core.$strip>;
export declare const orderPreviewSchema: z.ZodObject<{
    eventId: z.ZodNumber;
    ticketTypeId: z.ZodNumber;
    quantity: z.ZodNumber;
    voucherCode: z.ZodOptional<z.ZodString>;
    redeemedPoints: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const transactionSchema: z.ZodObject<{
    paymentProof: z.ZodURL;
}, z.core.$strip>;
//# sourceMappingURL=order.validation.d.ts.map