import { Worker } from "bullmq";
import { cacheTags, invalidateCacheTags } from "../lib/cache.js";
import { prisma } from "../lib/prisma.js";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

new Worker(
  "orderQueue",
  async (job) => {
    const { orderId, transactionId } = job.data as {
      orderId: number;
      transactionId: number;
    };

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: {
          id: true,
          customerId: true,
          eventId: true,
          status: true,
          expiresAt: true,
          quantity: true,
          ticketTypeId: true,
          promotionId: true,
          event: {
            select: {
              organizeBy: true,
            },
          },
        },
      });

    if (!order) {
      return;
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: {
        id: true,
        status: true,
      },
    });

    if (!transaction) {
      return;
    }

    if (job.name === "expire-payment-proof") {
      const now = new Date();

      const stillWaitingForPayment =
        order.status === "PENDING" &&
        transaction.status === "WAITING_FOR_PAYMENT";

      if (!stillWaitingForPayment) {
        return;
      }

      if (!order.expiresAt || now < order.expiresAt) {
        return;
      }

      await prisma.$transaction(async (tx) => {
        const ticketType = await tx.ticketType.findUnique({
          where: { id: order.ticketTypeId },
          select: {
            id: true,
            reserved: true,
          },
        });

        if (!ticketType) {
          throw new Error("Ticket type not found");
        }

        const currentReserved = ticketType.reserved ?? 0;

        await tx.ticketType.update({
          where: { id: ticketType.id },
          data: {
            reserved: Math.max(0, currentReserved - order.quantity),
          },
        });

        if (order.promotionId) {
          const promotion = await tx.promotion.findUnique({
            where: { id: order.promotionId },
            select: {
              id: true,
              usedCount: true,
            },
          });

          if (promotion) {
            const currentUsedCount = promotion.usedCount ?? 0;

            await tx.promotion.update({
              where: { id: promotion.id },
              data: {
                usedCount: Math.max(0, currentUsedCount - 1),
              },
            });
          }
        }

        if (order.customerId) {
          await tx.points.updateMany({
            where: {
              userId: order.customerId,
              source: "PURCHASE",
              discount: order.id,
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        }

        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "EXPIRED",
          },
        });

        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "EXPIRED",
          },
        });
      });

      await invalidateCacheTags([
        cacheTags.eventsList,
        cacheTags.event(order.eventId),
        cacheTags.transactionsOrganizer(order.event.organizeBy),
        cacheTags.organizerDashboard(order.event.organizeBy),
        cacheTags.organizerScope(order.event.organizeBy),
        ...(order.customerId
          ? [
              cacheTags.transactionsUser(order.customerId),
              cacheTags.customerPoints(order.customerId),
              cacheTags.customerProfile(order.customerId),
              cacheTags.customerScope(order.customerId),
            ]
          : []),
      ]);

      return;
    }

    if (job.name === "expire-admin-review") {
      const stillWaitingForAdmin =
        order.status === "PENDING" &&
        transaction.status === "WAITING_FOR_ADMIN_CONFIRMATION";

      if (!stillWaitingForAdmin) {
        return;
      }

      await prisma.$transaction(async (tx) => {
        const ticketType = await tx.ticketType.findUnique({
          where: { id: order.ticketTypeId },
          select: {
            id: true,
            reserved: true,
          },
        });

        if (!ticketType) {
          throw new Error("Ticket type not found");
        }

        const currentReserved = ticketType.reserved ?? 0;

        await tx.ticketType.update({
          where: { id: ticketType.id },
          data: {
            reserved: Math.max(0, currentReserved - order.quantity),
          },
        });

        if (order.promotionId) {
          const promotion = await tx.promotion.findUnique({
            where: { id: order.promotionId },
            select: {
              id: true,
              usedCount: true,
            },
          });

          if (promotion) {
            const currentUsedCount = promotion.usedCount ?? 0;

            await tx.promotion.update({
              where: { id: promotion.id },
              data: {
                usedCount: Math.max(0, currentUsedCount - 1),
              },
            });
          }
        }

        if (order.customerId) {
          await tx.points.updateMany({
            where: {
              userId: order.customerId,
              source: "PURCHASE",
              discount: order.id,
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        }

        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "EXPIRED",
          },
        });

        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "EXPIRED",
          },
        });
      });

      await invalidateCacheTags([
        cacheTags.eventsList,
        cacheTags.event(order.eventId),
        cacheTags.transactionsOrganizer(order.event.organizeBy),
        cacheTags.organizerDashboard(order.event.organizeBy),
        cacheTags.organizerScope(order.event.organizeBy),
        ...(order.customerId
          ? [
              cacheTags.transactionsUser(order.customerId),
              cacheTags.customerPoints(order.customerId),
              cacheTags.customerProfile(order.customerId),
              cacheTags.customerScope(order.customerId),
            ]
          : []),
      ]);
    }
  },
  {
    connection: {
      url: redisUrl,
    },
  },
);
