import type { CreateEventInput } from "../types/event-type.js";
export declare function createDraftEvent(organizerId: number, payload: CreateEventInput, files?: Express.Multer.File[]): Promise<({
    venue: {
        id: number;
        name: string;
        addressLine: string;
        city: string;
        region: string | null;
        country: string;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
        eventId: number;
    }[];
    eventImage: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        eventId: number;
        imageURL: string;
    }[];
    promotion: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        code: string;
        discountType: import("../generated/prisma/enums.js").promotionDiscountType;
        discountValue: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        minPurchase: import("@prisma/client-runtime-utils").Decimal | null;
        quota: number;
        startDate: Date | null;
        endDate: Date | null;
        eventId: number;
    }[];
    ticket: {
        id: number;
        name: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quota: number;
        status: import("../generated/prisma/enums.js").ticketStatus;
        eventId: number;
        description: string | null;
        salesStartAt: Date;
        salesEndAt: Date;
        contactPerson: string;
        emailContactPerson: string;
        phoneContactPerson: string;
    }[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    title: string;
    category: string | null;
    eventDescription: string | null;
    eventDateStart: Date;
    eventDateEnd: Date;
    termsAccepted: boolean;
    organizeBy: number;
    image: string | null;
    status: import("../generated/prisma/enums.js").eventStatus;
    eventTnC: string | null;
}) | null>;
//# sourceMappingURL=event.service.d.ts.map