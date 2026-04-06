import { type OrganizerPasswordUpdateInput, type OrganizerProfileUpdateInput } from "../../validations/organizer.validation.js";
export declare function getOrganizerProfile(userId: number): Promise<{
    stats: {
        totalEvents: number;
        totalTransactions: number;
        totalAttendees: number;
    };
    id: number;
    email: string;
    referralCode: string;
    name: string;
    address: string | null;
    profilePicture: string | null;
    role: import("../../generated/prisma/enums.js").Role;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateOrganizerProfile(userId: number, payload: OrganizerProfileUpdateInput): Promise<{
    stats: {
        totalEvents: number;
        totalTransactions: number;
        totalAttendees: number;
    };
    id: number;
    email: string;
    referralCode: string;
    name: string;
    address: string | null;
    profilePicture: string | null;
    role: import("../../generated/prisma/enums.js").Role;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateOrganizerPassword(userId: number, payload: OrganizerPasswordUpdateInput): Promise<boolean>;
export declare function updateOrganizerProfilePicture(userId: number, file?: Express.Multer.File): Promise<{
    stats: {
        totalEvents: number;
        totalTransactions: number;
        totalAttendees: number;
    };
    id: number;
    email: string;
    referralCode: string;
    name: string;
    address: string | null;
    profilePicture: string | null;
    role: import("../../generated/prisma/enums.js").Role;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
//# sourceMappingURL=organizer.profile.service.d.ts.map