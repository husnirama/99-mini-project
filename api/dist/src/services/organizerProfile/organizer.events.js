import { prisma } from "../../lib/prisma.js";
import { startOfWeek, addDays, eachDayOfInterval, format } from "date-fns";
export async function getTotalEventById(userId) {
    const totalEvent = await prisma.event.count({
        where: {
            organizeBy: userId,
        },
    });
    return totalEvent;
}
export async function getEventActive(userId) {
    const totalEventActive = await prisma.event.count({
        where: {
            organizeBy: userId,
            // status: "PUBLISHED",
        },
    });
    return totalEventActive;
}
export async function getTotalTransaction(userId) {
    const totalTransaction = await prisma.transaction.count({
        where: {
            order: {
                event: {
                    organizeBy: userId,
                    deletedAt: null,
                },
            },
        },
    });
    return totalTransaction;
}
export async function getTotalRevenue(userId) {
    const totalRevenue = await prisma.order.aggregate({
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
    });
    return totalRevenue;
}
export async function getEventsByOrganizer(userId) {
    const EventSummary = await prisma.event.findMany({
        where: {
            organizeBy: userId,
        },
        select: {
            id: true,
            title: true,
            category: true,
            createdAt: true,
            status: true,
            ticket: {
                select: {
                    quota: true,
                    sold: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return EventSummary;
}
export async function getTotalAttendees(userId) {
    const getTotalAttendees = await prisma.order.count({
        where: {
            status: "COMPLETED",
            event: {
                organizeBy: userId,
                deletedAt: null,
            },
        },
    });
    return getTotalAttendees;
}
export async function getWeeklySales(userId) {
    const now = new Date();
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    const nextMonday = addDays(startOfWeekDate, 7);
    const weeklySales = await prisma.$queryRaw `
    SELECT
      date_trunc('day', o."createdAt" AT TIME ZONE 'Asia/Jakarta') AS day,
      COALESCE(SUM(o."totalAmount"), 0)::int AS revenue
    FROM "Order" o
    INNER JOIN "Event" e ON e."id" = o."eventId"
    WHERE e."organizeBy" = ${userId}
      AND e."deletedAt" IS NULL
      AND o."status" = 'COMPLETED'
      AND o."createdAt" >= ${startOfWeekDate}
      AND o."createdAt" < ${nextMonday}
    GROUP BY 1
    ORDER BY 1 ASC
  `;
    const revenueMap = new Map();
    for (const item of weeklySales) {
        const key = format(new Date(item.day), "yyyy-MM-dd");
        revenueMap.set(key, Number(item.revenue));
    }
    const allDays = eachDayOfInterval({
        start: startOfWeekDate,
        end: addDays(nextMonday, -1), // Sunday
    });
    const chartData = allDays.map((date) => {
        const key = format(date, "yyyy-MM-dd");
        return {
            day: format(date, "EEE"),
            fullDate: key,
            revenue: revenueMap.get(key) ?? 0,
        };
    });
    return chartData;
}
//# sourceMappingURL=organizer.events.js.map