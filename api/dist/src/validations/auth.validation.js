import { z } from "zod";
const RoleEnum = z.enum(["CUSTOMER", "EVENT_ORGANIZER"]);
export const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase")
    .regex(/[0-9]/, "Password must contain at least 1 symbol")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character");
export const emailSchema = z.email("Invalid email address");
export const registerSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: emailSchema,
    password: passwordSchema,
    role: RoleEnum.optional().default("CUSTOMER"),
    referralCode: z.string().trim().min(3).max(32).optional(),
});
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});
//# sourceMappingURL=auth.validation.js.map