import { z } from "zod";
export declare const organizerProfileUpdateSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    address: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export declare const organizerPasswordUpdateSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strip>;
export type OrganizerProfileUpdateInput = z.infer<typeof organizerProfileUpdateSchema>;
export type OrganizerPasswordUpdateInput = z.infer<typeof organizerPasswordUpdateSchema>;
//# sourceMappingURL=organizer.validation.d.ts.map