export declare function getTotalEventById(userId: number): Promise<number>;
export declare function getEventActive(userId: number): Promise<number>;
export declare function getTotalTransaction(userId: number): Promise<number>;
export declare function getTotalRevenue(userId: number): Promise<import("../../generated/prisma/models.js").GetOrderAggregateType<{
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
}>>;
export declare function getEventsByOrganizer(userId: number): Promise<{
    id: number;
    createdAt: Date;
    title: string;
    category: string | null;
    status: import("../../generated/prisma/enums.js").eventStatus;
    ticket: {
        quota: number;
        sold: number;
    }[];
}[]>;
export declare function getTotalAttendees(userId: number): Promise<number>;
type WeeklySalesChartItem = {
    day: string;
    fullDate: string;
    revenue: number;
};
export declare function getWeeklySales(userId: number): Promise<WeeklySalesChartItem[]>;
export {};
//# sourceMappingURL=organizer.events.d.ts.map