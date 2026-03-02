import type { NextFunction, Request, Response } from "express";
import { createDraftEvent } from "../services/event.service.js";

export async function handleCreateEvent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizerId = req.user!.userId;
    const payload = req.body;

    const event = await createDraftEvent(organizerId, payload);
    return res.status(201).json({
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
}
