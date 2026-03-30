import { id } from "zod/locales";
import { prisma } from "../../lib/prisma.js";
export async function getGrossRevenue(userId, eventId) {
    if (eventId === "all") {
        const totalTransaction = await prisma.order.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                },
            },
            _sum: {
                totalAmount: true,
            },
        });
        return totalTransaction;
    }
    else if (typeof eventId === "number") {
        const totalTransaction = await prisma.order.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                    id: eventId,
                },
            },
            _sum: {
                totalAmount: true,
            },
        });
        return totalTransaction;
    }
}
export async function getGrossRevenueLastMonth(userId, eventId) {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    if (eventId === "all") {
        const totalTransactionLastMonth = await prisma.order.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                    createdAt: {
                        gte: startOfLastMonth,
                        lt: startOfThisMonth,
                    },
                },
            },
            _sum: {
                totalAmount: true,
            },
        });
        return totalTransactionLastMonth;
    }
    else if (typeof eventId === "number") {
        const totalTransactionLastMonth = await prisma.order.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                    createdAt: {
                        gte: startOfLastMonth,
                        lt: startOfThisMonth,
                    },
                    id: eventId,
                },
            },
            _sum: {
                totalAmount: true,
            },
        });
    }
}
export async function NumPaidOrders(userId, eventId) {
    if (eventId === "all") {
        const numOrdersPaid = await prisma.order.aggregate({
            where: {
                status: "COMPLETED",
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                },
            },
            _sum: {
                totalAmount: true,
            },
            _avg: {
                totalAmount: true,
            },
        });
        return numOrdersPaid;
    }
    else if (typeof eventId === "number") {
        const numOrdersPaid = await prisma.order.aggregate({
            where: {
                status: "COMPLETED",
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                    id: eventId,
                },
            },
            _sum: {
                totalAmount: true,
            },
            _avg: {
                totalAmount: true,
            },
        });
        return numOrdersPaid;
    }
}
export async function numRejectTransaction(userId, eventId) {
    if (eventId === "all") {
        const numReject = await prisma.order.count({
            where: {
                status: "REJECTED",
                event: {
                    organizeBy: userId,
                },
            },
        });
        return numReject;
    }
    else if (typeof eventId === "number") {
        const numReject = await prisma.order.count({
            where: {
                status: "REJECTED",
                event: {
                    organizeBy: userId,
                    id: eventId,
                },
            },
        });
        return numReject;
    }
}
export async function seatOccupancy(userId, eventId) {
    if (eventId === "all") {
        const numSeatOccupancy = await prisma.ticketType.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                },
            },
            _sum: {
                quota: true,
            },
        });
        return numSeatOccupancy;
    }
    else if (typeof eventId === "number") {
        const numSeatOccupancy = await prisma.ticketType.aggregate({
            where: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                    id: eventId,
                },
            },
            _sum: {
                quota: true,
            },
        });
        return numSeatOccupancy;
    }
}
export async function TransactionStatusDetails(userId, eventId) {
    if (eventId === "all") {
        const transactionDetailByStatus = await prisma.order.groupBy({
            by: ["status"],
            _count: {
                id: true,
            },
            where: {
                event: {
                    organizeBy: userId,
                },
            },
        });
        return transactionDetailByStatus;
    }
    else if (typeof eventId === "number") {
        const transactionDetailByStatus = await prisma.order.groupBy({
            by: ["status"],
            _count: {
                id: true,
            },
            where: {
                event: {
                    organizeBy: userId,
                    id: eventId,
                },
            },
        });
        return transactionDetailByStatus;
    }
}
//# sourceMappingURL=organizer.statistics.js.map