import cloudinary from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import type { CreateEventInput } from "../types/event-type.js";
import { AppError } from "../utils/app-error.js";
import { createEventSchema } from "../validations/event.validation.js";
import fs from "fs/promises";

export async function createDraftEvent(
  organizerId: number,
  payload: CreateEventInput,
  files: Express.Multer.File[],
) {
  try {
    const parsedCreateEvent = createEventSchema.parse(payload);
    const uploadResults = await Promise.all(
      files.map((file) => cloudinary.uploader.upload(file.path)),
    );

    const imageUrls = uploadResults.map((result) => result.secure_url);
    const event = await prisma.$transaction(async (tx) => {
      const newEvent = await tx.event.create({
        data: {
          organizeBy: organizerId,
          title: parsedCreateEvent.title,
          eventDateStart: parsedCreateEvent.eventDateStart,
          eventDateEnd: parsedCreateEvent.eventDateEnd,
        },
      });
      await tx.eventImage.createMany({
        data: imageUrls.map((imageurl) => ({
          eventId: newEvent.id,
          imageURL: imageurl,
        })),
      });
      return newEvent;
    });
    return event;
  } catch (error) {
    throw new AppError("Failed to create Event", 400);
  } finally {
    await Promise.all(files.map((file) => fs.unlink(file.path)));
  }
}
