import type { Response, Request, NextFunction } from "express";
import {
  getCustomerPoints,
  getHistoryPoints,
  getReferralCode,
} from "../../services/customerProfile/customer.points.js";
import { AppError } from "../../utils/app-error.js";

export async function customerPointsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    // const OldResponseData = await redis.get(`customer:points:${userId}`);
    // if (OldResponseData) {
    //   return res.status(200).json({
    //     message: "Fetch Success",
    //     data: JSON.parse(OldResponseData),
    //     source: "cache",
    //   });
    // }
    const [points, pointsHistory, referralCode] = await Promise.all([
      getCustomerPoints(userId),
      getHistoryPoints(userId),
      getReferralCode(userId),
    ]);
    const responseData = {
      totalPoints: points,
      pointsHistory,
      referralCode,
    };
    // await redis.set(`customer:points:${userId}`, JSON.stringify(responseData));

    res.status(200).json({
      message: "Fetch Success",
      data: responseData,
      source: "database",
    });
  } catch (error) {
    next(error);
  }
}
