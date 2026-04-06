import type { Request, Response, NextFunction } from "express";
import { addPointsSchema } from "../validations/points.validation.js";
import customerRegisterpoints from "../services/customerProfile/customer.points.js";

export async function createRegisterPointsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = addPointsSchema.parse(req.body);
    const addPointsResult = await customerRegisterpoints(
      payload.userId,
      payload.points,
      payload.referralCode ?? "",
    );
    return res.status(201).json({
      message: "Points added successfully",
      data: addPointsResult,
    });
  } catch (error) {
    next(error);
  }
}
