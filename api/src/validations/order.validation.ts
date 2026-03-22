import { z } from "zod";
import { paymentMethod } from "../generated/prisma/enums.js";

export const orderSchema = z.object({
  eventId: z.number().min(1, "Event ID can not be empty"),
  ticketTypeId: z.number().min(1, "Ticket ID can not be empty"),
  quantity: z.number().positive(),
  voucherCode: z.string().min(1, "Incorrect Voucher Code").optional(),
  buyerName: z.string().min(1, "Name can not be empty"),
  buyerEmail: z.email({ message: "Invalid Email Format" }),
  buyerPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  paymentMethod: z.enum(["CARD", "BANK_TRANSFER"]),
});

export const transactionSchema = z.object({
  paymentProof: z.url({
    message: "Incorrect URL",
  }),
});
