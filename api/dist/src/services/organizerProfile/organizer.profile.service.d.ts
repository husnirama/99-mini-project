import { type OrganizerPasswordUpdateInput, type OrganizerProfileUpdateInput } from "../../validations/organizer.validation.js";
export declare function getOrganizerProfile(userId: number): Promise<{
    stats: {
        totalEvents: number;
        totalTransactions: number;
        totalAttendees: number;
    };
    id: number;
    name: string;
    email: string;
    address: string | null;
    role: import("../../generated/prisma/enums.js").Role;
    referralCode: string;
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
    name: string;
    email: string;
    address: string | null;
    role: import("../../generated/prisma/enums.js").Role;
    referralCode: string;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateOrganizerPassword(userId: number, payload: OrganizerPasswordUpdateInput): Promise<boolean>;
//# sourceMappingURL=organizer.profile.service.d.ts.map