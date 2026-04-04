import { z } from "zod";

export const transactionStatusSchema = z.enum([
  "WAITING_FOR_PAYMENT",
  "WAITING_FOR_ADMIN_CONFIRMATION",
  "DONE",
  "REJECTED",
  "EXPIRED",
  "CANCELED",
]);

export const transactionListQuerySchema = z.object({
  status: transactionStatusSchema.optional(),
  eventId: z.coerce.number().int().positive().optional(),
});
