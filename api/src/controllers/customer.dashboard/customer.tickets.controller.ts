import type { Response, Request, NextFunction } from "express";
import {
  getCustomerTickets,
  upcomingEvents,
  orderHistory,
} from "../../services/customerProfile/customer.tickets.js";
import { AppError } from "../../utils/app-error.js";

export async function customerTicketsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }
    const [tickets, upcoming, history] = await Promise.all([
      getCustomerTickets(userId),
      upcomingEvents(userId),
      orderHistory(userId),
    ]);
    const responseData = {
      totalTickets: tickets,
      upcomingEvents: upcoming,
      orderHistory: history,
    };
    res.status(200).json({
      message: "Fetch Success",
      data: responseData,
      source: "database",
    });
  } catch (error) {
    next(error);
  }
}
