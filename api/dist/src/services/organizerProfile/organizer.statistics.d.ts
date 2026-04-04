export declare function getGrossRevenue(userId: number, eventId: number | string): Promise<import("../../generated/prisma/models.js").GetOrderAggregateType<{
    where: {
        event: {
            organizeBy: number;
            deletedAt: null;
        };
    };
    _sum: {
        totalAmount: true;
    };
}> | undefined>;
export declare function getGrossRevenueLastMonth(userId: number, eventId: number | string): Promise<import("../../generated/prisma/models.js").GetOrderAggregateType<{
    where: {
        event: {
            organizeBy: number;
            deletedAt: null;
            createdAt: {
                gte: Date;
                lt: Date;
            };
        };
    };
    _sum: {
        totalAmount: true;
    };
}> | undefined>;
export declare function NumPaidOrders(userId: number, eventId: number | string): Promise<import("../../generated/prisma/models.js").GetOrderAggregateType<{
    where: {
        status: "COMPLETED";
        event: {
            organizeBy: number;
            deletedAt: null;
        };
    };
    _sum: {
        totalAmount: true;
    };
    _avg: {
        totalAmount: true;
    };
}> | undefined>;
export declare function numRejectTransaction(userId: number, eventId: number | string): Promise<number | undefined>;
export declare function seatOccupancy(userId: number, eventId: number | string): Promise<import("../../generated/prisma/models.js").GetTicketTypeAggregateType<{
    where: {
        event: {
            organizeBy: number;
            deletedAt: null;
        };
    };
    _sum: {
        quota: true;
    };
}> | undefined>;
export declare function TransactionStatusDetails(userId: number, eventId: number | string): Promise<(import("../../generated/prisma/internal/prismaNamespace.js").PickEnumerable<import("../../generated/prisma/models.js").OrderGroupByOutputType, "status"[]> & {
    _count: {
        id: number;
    };
})[] | undefined>;
//# sourceMappingURL=organizer.statistics.d.ts.map