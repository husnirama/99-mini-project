import { z } from "zod";
export declare const createEventSchema: z.ZodObject<{
    title: z.ZodString;
    category: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    eventDescription: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    eventDateStart: z.ZodCoercedDate<unknown>;
    eventDateEnd: z.ZodCoercedDate<unknown>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        CANCELLED: "CANCELLED";
    }>>;
    termsAccepted: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    venue: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodObject<{
        name: z.ZodString;
        addressLine: z.ZodString;
        city: z.ZodString;
        region: z.ZodOptional<z.ZodString>;
        country: z.ZodString;
        latitude: z.ZodOptional<z.ZodString>;
        longitude: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    ticketTypes: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        name: z.ZodString;
        availability: z.ZodEnum<{
            Paid: "Paid";
            Free: "Free";
        }>;
        price: z.ZodString;
        capacity: z.ZodString;
    }, z.core.$strip>>>;
    contactInfo: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodObject<{
        contactName: z.ZodString;
        contactEmail: z.ZodEmail;
        countryCode: z.ZodString;
        phoneNumber: z.ZodString;
    }, z.core.$strip>>;
    promotions: z.ZodDefault<z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        name: z.ZodString;
        code: z.ZodString;
        discountType: z.ZodEnum<{
            PERCENTAGE: "PERCENTAGE";
            FIXED: "FIXED";
        }>;
        discountValue: z.ZodString;
        maxDiscount: z.ZodOptional<z.ZodString>;
        minPurchase: z.ZodOptional<z.ZodString>;
        quota: z.ZodString;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>>;
}, z.core.$strip>;
//# sourceMappingURL=event.validation.d.ts.map