import type { Response, Request, NextFunction } from "express";
import orderCreation from "../services/order/order.service.js";
import { orderSchema } from "../validations/order.validation.js";

export async function createOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = orderSchema.parse(req.body);
    const customerId =
      typeof req.user?.userId === "number"
        ? req.user.userId
        : typeof req.user?.id === "number"
          ? req.user.id
          : undefined;
    const order = await orderCreation(payload, customerId);

    return res.status(201).json({
      message: "Order Created Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}
