import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth.validation.js";
export const organizerProfileUpdateSchema = z.object({
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
export const organizerPasswordUpdateSchema = z
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
//# sourceMappingURL=organizer.validation.js.map