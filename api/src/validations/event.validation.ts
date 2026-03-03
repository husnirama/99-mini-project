import { z } from "zod";

export const createEventSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    eventDateStart: z.coerce.date({
      message: "Event date start must be formatted YYYY-MM-DDTHH:mm:ssZ",
    }),
    eventDateEnd: z.coerce.date({
      message: "Event date end must be formatted YYYY-MM-DDTHH:mm:ssZ",
    }),
    image: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventDateEnd <= data.eventDateStart) {
      ctx.addIssue({
        code: "custom",
        path: ["eventDateEnd"],
        message: "Event end date must be after start date",
      });
    }
  });
