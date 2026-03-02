import { prisma } from "../lib/prisma.js";
import type { CreateEventInput } from "../types/event-type.js";
import { createEventSchema } from "../validations/event.validation.js";

export async function createDraftEvent(
  organizerId: number,
  payload: CreateEventInput,
) {
  const parsedCreateEvent = createEventSchema.parse(payload);

  const event = await prisma.event.create({
    data: {
      organizeBy: organizerId,
      title: parsedCreateEvent.title,
      eventDateStart: parsedCreateEvent.eventDateStart,
      eventDateEnd: parsedCreateEvent.eventDateEnd,
    },
    select: {
      id: true,
      title: true,
      eventDateStart: true,
      eventDateEnd: true,
      createdAt: true,
    },
  });
  return event;
}
