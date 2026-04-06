import type { NextFunction, Request, Response } from "express";
type CacheOptions = {
    namespace: string;
    ttlSeconds: number;
    tags: (req: Request) => string[];
    shouldCache?: (req: Request, res: Response, body: unknown) => boolean;
};
export declare function createGetCacheMiddleware(options: CacheOptions): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare function invalidateCacheTags(tags: string[]): Promise<void>;
export declare const cacheTags: {
    status: string;
    eventsList: string;
    event: (eventId: number) => string;
    authMe: (userId: number) => string;
    organizerScope: (userId: number) => string;
    organizerDashboard: (userId: number) => string;
    organizerProfile: (userId: number) => string;
    transactionsUser: (userId: number) => string;
    transactionsOrganizer: (userId: number) => string;
    transaction: (transactionId: number) => string;
    customerScope: (userId: number) => string;
    customerProfile: (userId: number) => string;
    customerPoints: (userId: number) => string;
    customerTickets: (userId: number) => string;
    customerReviews: (userId: number) => string;
};
export {};
//# sourceMappingURL=cache.d.ts.map