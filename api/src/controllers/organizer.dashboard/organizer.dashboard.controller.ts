import type { Response, Request, NextFunction } from "express";
import {
  getEventActive,
  getEventsByOrganizer,
  getTotalAttendees,
  getTotalEventById,
  getTotalRevenue,
  getTotalTransaction,
  getWeeklySales,
} from "../../services/organizerProfile/organizer.events.js";
import { AppError } from "../../utils/app-error.js";

export async function organizerDahsboardController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }
    const [
      totalEvent,
      countActiveEvent,
      countTransaction,
      totalRevenue,
      eventSummary,
      totalAttendees,
      weeklySales,
    ] = await Promise.all([
      getTotalEventById(userId),
      getEventActive(userId),
      getTotalTransaction(userId),
      getTotalRevenue(userId),
      getEventsByOrganizer(userId),
      getTotalAttendees(userId),
      getWeeklySales(userId),
    ]);

    const dashboardData = {
      numberOfEvent: totalEvent,
      numberOfActiveEvent: countActiveEvent,
      numberTransaction: countTransaction,
      sumRevenue: totalRevenue,
      eventSummary,
      numberAttendees: totalAttendees,
      weeklySales,
    };
    res.status(200).json({ message: "Fetch Success", data: dashboardData });
  } catch (error) {
    next(error);
  }
}
