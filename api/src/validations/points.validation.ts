import { z } from "zod";

const PointsSourceEnum = z.enum(["REFERRAL", "PURCHASE"]);
export const addPointsSchema = z.object({
  userId: z.number(),
  points: z.number().positive("Points must be a positive number"),
  source: PointsSourceEnum,
  referralCode: z.string().trim().min(3).max(32).optional(),
});
