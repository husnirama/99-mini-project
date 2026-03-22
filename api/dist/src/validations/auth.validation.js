import { z } from "zod";
const RoleEnum = z.enum(["CUSTOMER", "EVENT_ORGANIZER"]);
export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email Address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase")
        .regex(/[0-9]/, "Password must contain at least 1 symbol")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character"),
    role: RoleEnum.optional().default("CUSTOMER"),
});
export const loginSchema = z.object({
    email: z.email("invalid email address").nonempty("Email is required"),
});
//# sourceMappingURL=auth.validation.js.map