import { z } from "zod";
function parseJsonInput(value) {
    if (typeof value !== "string")
        return value;
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
}
const venueSchema = z.object({
    name: z.string().min(1, "Venue name is required"),
    addressLine: z.string().min(1, "Venue address is required"),
    city: z.string().min(1, "Venue city is required"),
    region: z.string().optional(),
    country: z.string().min(1, "Venue country is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
});
const ticketTypeSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    name: z.string().min(1, "Ticket type name is required"),
    availability: z.enum(["Paid", "Free"]),
    price: z.string().min(1, "Ticket price is required"),
    capacity: z.string().min(1, "Ticket capacity is required"),
});
const contactInfoSchema = z.object({
    contactName: z.string().min(1, "Contact name is required"),
    contactEmail: z.email("Invalid contact email"),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
});
const promotionSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    name: z.string().min(1, "Promotion name is required"),
    code: z.string().min(1, "Promotion code is required"),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    discountValue: z.string().min(1, "Discount value is required"),
    maxDiscount: z.string().optional(),
    minPurchase: z.string().optional(),
    quota: z.string().min(1, "Promotion quota is required"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});
export const createEventSchema = z
    .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z
        .string()
        .optional()
        .transform((value) => (value && value.trim() ? value.trim() : undefined)),
    eventDescription: z
        .string()
        .optional()
        .transform((value) => (value && value.trim() ? value.trim() : undefined)),
    eventDateStart: z.coerce.date({
        message: "Event date start must be formatted YYYY-MM-DDTHH:mm:ssZ",
    }),
    eventDateEnd: z.coerce.date({
        message: "Event date end must be formatted YYYY-MM-DDTHH:mm:ssZ",
    }),
    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]).optional(),
    termsAccepted: z.preprocess((value) => {
        if (value === "true")
            return true;
        if (value === "false")
            return false;
        return value;
    }, z.boolean()),
    venue: z.preprocess(parseJsonInput, venueSchema),
    ticketTypes: z.preprocess(parseJsonInput, z.array(ticketTypeSchema).min(1, "At least one ticket type is required")),
    contactInfo: z.preprocess(parseJsonInput, contactInfoSchema),
    promotions: z
        .preprocess(parseJsonInput, z.array(promotionSchema).optional())
        .default([]),
})
    .superRefine((data, ctx) => {
    if (data.eventDateEnd <= data.eventDateStart) {
        ctx.addIssue({
            code: "custom",
            path: ["eventDateEnd"],
            message: "Event end date must be after start date",
        });
    }
});
//# sourceMappingURL=event.validation.js.map