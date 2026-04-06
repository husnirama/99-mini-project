import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";

export async function getCustomerTickets(userId: number) {
  const tickets = await prisma.order.aggregate({
    where: {
      customerId: userId,
    },
    _count: {
      id: true,
    },
  });
  if (!tickets) {
    throw new AppError("No tickets found for this user", 404);
  }
  return tickets;
}

export async function upcomingEvents(userId: number) {
  const upcomingTickets = await prisma.order.aggregate({
    where: {
      customerId: userId,
      event: {
        eventDateStart: {
          gt: new Date(),
        },
      },
    },
    _count: {
      id: true,
    },
  });
  if (!upcomingTickets) {
    throw new AppError("No upcoming events found for this user", 404);
  }
  return upcomingTickets;
}

export async function orderHistory(userId: number) {
  const orderHistory = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      event: {
        select: {
          title: true,
          eventDateStart: true,
        },
      },
      transaction: {
        select: {
          status: true,
        },
      },
    },
  });
  if (!orderHistory) {
    throw new AppError("No order history found for this user", 404);
  }
  return orderHistory;
}
