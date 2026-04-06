import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth.validation.js";

export const customerProfileUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  email: emailSchema,
  address: z
    .string()
    .trim()
    .max(255, "Address must be at most 255 characters")
    .optional()
    .or(z.literal("")),
});

export const customerPasswordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .superRefine((value, ctx) => {
    if (value.currentPassword === value.newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "New password must be different from current password",
      });
    }

    if (value.confirmNewPassword !== value.newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmNewPassword"],
        message: "Password confirmation does not match",
      });
    }
  });

export const customerReviewCreateSchema = z.object({
  eventId: z.number().int("Event is invalid").positive("Event is invalid"),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .trim()
    .max(1000, "Comment must be at most 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type CustomerProfileUpdateInput = z.infer<
  typeof customerProfileUpdateSchema
>;

export type CustomerPasswordUpdateInput = z.infer<
  typeof customerPasswordUpdateSchema
>;

export type CustomerReviewCreateInput = z.infer<
  typeof customerReviewCreateSchema
>;
