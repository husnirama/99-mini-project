import type { UserCreateInput } from "../generated/prisma/models.js";
export declare function createUser(data: UserCreateInput): Promise<{
    id: number;
    name: string;
    password: string;
    email: string;
    address: string | null;
    role: import("../generated/prisma/enums.js").Role;
    referralCode: string;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare function loginUser(email: string, pwd: string): Promise<{
    user: {
        id: number;
        name: string;
        email: string;
        role: import("../generated/prisma/enums.js").Role;
    };
    token: string;
    refreshToken: string;
}>;
export declare function authorizeMe(userId: number): Promise<{
    id: number;
    name: string;
    email: string;
    address: string | null;
    role: import("../generated/prisma/enums.js").Role;
    referralCode: string;
    referredBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
}>;
export declare function userLogout(refreshToken: string): Promise<boolean>;
//# sourceMappingURL=auth.service.d.ts.map