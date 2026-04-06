import { srLatn } from "date-fns/locale";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";

export async function getUserInfo(customerId: number) {
  return prisma.user.findUnique({
    where: { id: customerId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export async function getTicketInfo(ticketTypeId: number, eventId: number) {
  return prisma.ticketType.findUnique({
    where: { id: ticketTypeId, eventId: eventId },
    select: {
      price: true,
      quota: true,
      salesStartAt: true,
      salesEndAt: true,
      status: true,
      event: {
        select: {
          id: true,
          organizeBy: true,
          deletedAt: true,
        },
      },
    },
  });
}

export async function getPromotionInfo(voucherCode: string, eventId: number) {
  return prisma.promotion.findFirst({
    where: {
      code: voucherCode,
      eventId,
      deletedAt: null,
    },
    select: {
      id: true,
      discountType: true,
      discountValue: true,
      maxDiscount: true,
      minPurchase: true,
      startDate: true,
      endDate: true,
      quota: true,
      usedCount: true,
    },
  });
}

export async function resolveBuyerInfo(customerId: number) {
  const buyerInfo = await getUserInfo(customerId);
  if (!buyerInfo) {
    throw new AppError("User Not Found", 404);
  }

  return {
    buyerName: buyerInfo.name,
    buyerEmail: buyerInfo.email,
  };
}

export function calculateOrderAmounts(
  quantity: number,
  unitPrice: number,
  discountAmount: number,
) {
  const subTotalAmount = quantity * unitPrice;
  const totalAmount = Math.max(0, subTotalAmount - discountAmount);

  return {
    subTotalAmount,
    totalAmount,
  };
}

export function validateTicketAvailability(
  ticket: {
    salesStartAt: Date | null;
    salesEndAt: Date | null;
    status: string | null;
    event: { deletedAt: Date | null };
  } | null,
) {
  const now = new Date(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
    }),
  );

  if (!ticket || ticket.event.deletedAt) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.salesEndAt && now > ticket.salesEndAt) {
    throw new AppError("Ticket sales has ended", 400);
  }

  if (ticket.salesStartAt && now < ticket.salesStartAt) {
    console.log("Sales Start At:", ticket.salesStartAt, now);
    throw new AppError("Ticket sales has not started yet", 400);
  }

  if (ticket.status !== "ACTIVE") {
    throw new AppError("Ticket is not active", 400);
  }
}

export async function getCustomerAvailablePoints(customerId: number) {
  const pointsBalance = await prisma.points.aggregate({
    where: {
      userId: customerId,
      deletedAt: null,
    },
    _sum: {
      points: true,
    },
  });

  return Math.max(0, pointsBalance._sum.points ?? 0);
}

export function normalizeRedeemedPoints(redeemedPoints?: number) {
  if (!Number.isFinite(redeemedPoints)) {
    return 0;
  }

  return Math.max(0, Math.floor(redeemedPoints ?? 0));
}

export function calculatePromotionDiscount(
  promotion: {
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number | string | { toString(): string };
    maxDiscount?: number | string | { toString(): string } | null;
  },
  subTotal: number,
) {
  let discountAmount = 0;

  if (promotion.discountType === "PERCENTAGE") {
    discountAmount = Math.floor(
      (subTotal * Number(promotion.discountValue)) / 100,
    );

    if (promotion.maxDiscount !== null && promotion.maxDiscount !== undefined) {
      discountAmount = Math.min(discountAmount, Number(promotion.maxDiscount));
    }
  }

  if (promotion.discountType === "FIXED") {
    discountAmount = Number(promotion.discountValue);
  }

  return Math.min(discountAmount, subTotal);
}

export function calculatePointsDiscount(
  redeemedPoints: number,
  availablePoints: number,
  remainingAmount: number,
) {
  return Math.min(
    normalizeRedeemedPoints(redeemedPoints),
    Math.max(0, availablePoints),
    Math.max(0, remainingAmount),
  );
}

export async function resolvePromotion(
  voucherCode: string | undefined,
  subTotal: number,
  eventId: number,
) {
  if (!voucherCode) {
    return {
      promotionId: null as number | null,
      voucherDiscountAmount: 0,
    };
  }

  const promotionInfo = await getPromotionInfo(voucherCode, eventId);

  if (!promotionInfo) {
    throw new AppError("Voucher Code is invalid", 400);
  }

  const now = new Date();
  if (promotionInfo.startDate && now < promotionInfo.startDate) {
    throw new AppError("Voucher is not active yet", 400);
  }

  if (promotionInfo.endDate && now > promotionInfo.endDate) {
    throw new AppError("Voucher has expired", 400);
  }

  if (
    promotionInfo.minPurchase &&
    subTotal < Number(promotionInfo.minPurchase)
  ) {
    throw new AppError(
      `Minimum Purchase for this voucher is ${promotionInfo.minPurchase}`,
      400,
    );
  }

  const quota = promotionInfo.quota;
  const usedCount = promotionInfo.usedCount ?? 0;

  if (quota !== null && usedCount >= quota) {
    throw new AppError("Voucher quota has been execeeded", 400);
  }

  return {
    promotionId: promotionInfo.id,
    voucherDiscountAmount: calculatePromotionDiscount(promotionInfo, subTotal),
  };
}
