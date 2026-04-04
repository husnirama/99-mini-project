import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";

export default async function customerRegisterpoints(
  userId: number,
  points: number,
  referralCode: string,
) {
  // check if referral code is valid
  const validReferral = await prisma.user.findFirst({
    where: {
      referralCode: referralCode,
    },
    select: {
      id: true,
    },
  });
  if (!validReferral) {
    throw new AppError("Invalid referral Code", 400);
  }
  // add points to the user who referred
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 3);
  const referredPoints = await prisma.points.create({
    data: {
      userId: validReferral.id,
      points: points,
      source: "REFERRAL",
      expiresAt,
    },
  });
  // add points to the new user
  const newUserPoints = await prisma.points.create({
    data: {
      userId: userId,
      points: points,
      source: "REFERRAL",
      expiresAt,
    },
  });
  return [referredPoints, newUserPoints];
}

// GetPromotion Coupon
// export default async function getPromotionCoupon()
