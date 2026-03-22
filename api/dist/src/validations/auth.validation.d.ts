import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        CUSTOMER: "CUSTOMER";
        EVENT_ORGANIZER: "EVENT_ORGANIZER";
    }>>>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map