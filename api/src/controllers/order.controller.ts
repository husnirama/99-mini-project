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
    const order = await orderCreation(payload);

    return res.status(201).json({
      message: "Order Created Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}
