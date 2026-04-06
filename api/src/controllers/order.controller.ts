import type { Response, Request, NextFunction } from "express";
import orderCreation, {
  previewOrderPricing,
} from "../services/order/order.service.js";
import {
  orderPreviewSchema,
  orderSchema,
} from "../validations/order.validation.js";
import { AppError } from "../utils/app-error.js";

function resolveCustomerId(req: Request) {
  const customerId =
    typeof req.user?.userId === "number"
      ? req.user.userId
      : typeof req.user?.id === "number"
        ? req.user.id
        : undefined;

  if (typeof customerId !== "number") {
    throw new AppError("Unauthorized", 401);
  }

  return customerId;
}

export async function createOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = orderSchema.parse(req.body);
    const customerId = resolveCustomerId(req);
    const order = await orderCreation(payload, customerId);

    return res.status(201).json({
      message: "Order Created Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

export async function previewOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = orderPreviewSchema.parse(req.body);
    const customerId = resolveCustomerId(req);
    const pricing = await previewOrderPricing(payload, customerId);

    return res.status(200).json({
      message: "Order Pricing Preview Success",
      data: pricing,
    });
  } catch (error) {
    next(error);
  }
}
