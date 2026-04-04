import type { CreateEventInput } from "../types/event-type.js";
export declare function createDraftEvent(organizerId: number, payload: CreateEventInput, files?: Express.Multer.File[]): Promise<({
    eventImage: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        imageURL: string;
        eventId: number;
    }[];
    venue: {
        id: number;
        name: string;
        eventId: number;
        addressLine: string;
        city: string;
        region: string | null;
        country: string;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }[];
    promotion: {
        discountType: import("../generated/prisma/enums.js").promotionDiscountType;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        eventId: number;
        code: string;
        discountValue: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        minPurchase: import("@prisma/client-runtime-utils").Decimal | null;
        quota: number;
        usedCount: number | null;
        startDate: Date | null;
        endDate: Date | null;
    }[];
    ticket: {
        id: number;
        name: string;
        status: import("../generated/prisma/enums.js").ticketStatus;
        eventId: number;
        quota: number;
        price: import("@prisma/client-runtime-utils").Decimal;
        sold: number;
        reserved: number;
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
    image: string | null;
    eventDateStart: Date;
    eventDateEnd: Date;
    status: import("../generated/prisma/enums.js").eventStatus;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean;
    organizeBy: number;
}) | null>;
export declare function getEventList(): Promise<({
    eventImage: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        imageURL: string;
        eventId: number;
    }[];
    venue: {
        id: number;
        name: string;
        eventId: number;
        addressLine: string;
        city: string;
        region: string | null;
        country: string;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }[];
    ticket: {
        id: number;
        name: string;
        status: import("../generated/prisma/enums.js").ticketStatus;
        eventId: number;
        quota: number;
        price: import("@prisma/client-runtime-utils").Decimal;
        sold: number;
        reserved: number;
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
    image: string | null;
    eventDateStart: Date;
    eventDateEnd: Date;
    status: import("../generated/prisma/enums.js").eventStatus;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean;
    organizeBy: number;
})[]>;
export declare function getUniqueEvent(id: number): Promise<{
    eventImage: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        imageURL: string;
        eventId: number;
    }[];
    venue: {
        id: number;
        name: string;
        eventId: number;
        addressLine: string;
        city: string;
        region: string | null;
        country: string;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }[];
    ticket: {
        id: number;
        name: string;
        status: import("../generated/prisma/enums.js").ticketStatus;
        eventId: number;
        quota: number;
        price: import("@prisma/client-runtime-utils").Decimal;
        sold: number;
        reserved: number;
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
    image: string | null;
    eventDateStart: Date;
    eventDateEnd: Date;
    status: import("../generated/prisma/enums.js").eventStatus;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean;
    organizeBy: number;
}>;
//# sourceMappingURL=event.service.d.ts.map