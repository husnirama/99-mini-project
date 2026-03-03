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

    const files = req.files as Express.Multer.File[];

    console.log(req.file);
    console.log("body:", req.body);
    console.log("files:", req.files);
    console.log("content-type:", req.headers["content-type"]);
    const result = await createDraftEvent(organizerId, payload, files);

    return res.status(201).json({
      message: "Event created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
