import fs from "node:fs/promises";
import { cacheTags, invalidateCacheTags } from "../lib/cache.js";
import cloudinary from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import type { CreateEventInput } from "../types/event-type.js";
import { AppError } from "../utils/app-error.js";
import { createEventSchema } from "../validations/event.validation.js";

function normalizeNumeric(value: string, field: string) {
  const normalized = value.replace(/\D/g, "");
  if (!normalized) {
    throw new AppError(`${field} is required`, 400);
  }
  return normalized;
}

export async function createDraftEvent(
  organizerId: number,
  payload: CreateEventInput,
  files: Express.Multer.File[] = [],
) {
  let uploadedPublicIds: string[] = [];

  try {
    const parsedCreateEvent = createEventSchema.parse(payload);

    if (!files.length) {
      throw new AppError("At least one event image is required", 400);
    }

    const uploadResults = await Promise.all(
      files.map((file) => cloudinary.uploader.upload(file.path)),
    );
    const imageUrls = uploadResults.map((result) => result.secure_url);
    uploadedPublicIds = uploadResults.map((result) => result.public_id);

    const event = await prisma.$transaction(async (tx) => {
      const createdEvent = await tx.event.create({
        data: {
          organizeBy: organizerId,
          title: parsedCreateEvent.title,
          category: parsedCreateEvent.category ?? null,
          eventDescription: parsedCreateEvent.eventDescription ?? null,
          eventDateStart: parsedCreateEvent.eventDateStart,
          eventDateEnd: parsedCreateEvent.eventDateEnd,
          termsAccepted: parsedCreateEvent.termsAccepted,
        },
      });

      const latitudeRaw = parsedCreateEvent.venue.latitude
        ? Number(parsedCreateEvent.venue.latitude)
        : null;
      const longitudeRaw = parsedCreateEvent.venue.longitude
        ? Number(parsedCreateEvent.venue.longitude)
        : null;
      const latitude =
        latitudeRaw !== null && Number.isFinite(latitudeRaw)
          ? latitudeRaw
          : null;
      const longitude =
        longitudeRaw !== null && Number.isFinite(longitudeRaw)
          ? longitudeRaw
          : null;

      await tx.venue.create({
        data: {
          eventId: createdEvent.id,
          name: parsedCreateEvent.venue.name,
          addressLine: parsedCreateEvent.venue.addressLine,
          city: parsedCreateEvent.venue.city,
          region: parsedCreateEvent.venue.region ?? null,
          country: parsedCreateEvent.venue.country,
          latitude,
          longitude,
        },
      });

      await tx.ticketType.createMany({
        data: parsedCreateEvent.ticketTypes.map((ticket) => ({
          eventId: createdEvent.id,
          name: ticket.name,
          price: normalizeNumeric(ticket.price, "Ticket price"),
          quota: Number(normalizeNumeric(ticket.capacity, "Ticket capacity")),
          sold: 0,
          reserved: 0,
          salesStartAt: parsedCreateEvent.eventDateStart,
          salesEndAt: parsedCreateEvent.eventDateEnd,
          status: "ACTIVE",
          contactPerson: parsedCreateEvent.contactInfo.contactName,
          emailContactPerson: parsedCreateEvent.contactInfo.contactEmail,
          phoneContactPerson: `${parsedCreateEvent.contactInfo.countryCode} ${parsedCreateEvent.contactInfo.phoneNumber}`,
        })),
      });

      if (parsedCreateEvent.promotions.length > 0) {
        await tx.promotion.createMany({
          data: parsedCreateEvent.promotions.map((promotion) => ({
            eventId: createdEvent.id,
            name: promotion.name,
            code: promotion.code,
            discountType: promotion.discountType,
            discountValue: normalizeNumeric(
              promotion.discountValue,
              "Promotion discount value",
            ),
            maxDiscount: promotion.maxDiscount
              ? normalizeNumeric(
                  promotion.maxDiscount,
                  "Promotion max discount",
                )
              : null,
            minPurchase: promotion.minPurchase
              ? normalizeNumeric(
                  promotion.minPurchase,
                  "Promotion min purchase",
                )
              : null,
            quota: Number(normalizeNumeric(promotion.quota, "Promotion quota")),
            startDate: promotion.startDate
              ? new Date(promotion.startDate)
              : null,
            endDate: promotion.endDate ? new Date(promotion.endDate) : null,
          })),
        });
      }

      await tx.eventImage.createMany({
        data: imageUrls.map((imageUrl) => ({
          eventId: createdEvent.id,
          imageURL: imageUrl,
        })),
      });

      return tx.event.findUnique({
        where: { id: createdEvent.id },
        include: {
          venue: true,
          ticket: true,
          eventImage: true,
          promotion: true,
        },
      });
    });

    await invalidateCacheTags([
      cacheTags.eventsList,
      cacheTags.organizerDashboard(organizerId),
      cacheTags.organizerScope(organizerId),
    ]);

    return event;
  } catch (error) {
    if (uploadedPublicIds.length > 0) {
      await Promise.all(
        uploadedPublicIds.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch(() => null),
        ),
      );
    }
    throw error;
  } finally {
    await Promise.all(
      files.map(async (file) => {
        try {
          await fs.unlink(file.path);
        } catch {
          return null;
        }
      }),
    );
  }
}

export async function getEventList() {
  try {
    const events = await prisma.event.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        venue: true,
        ticket: true,
        eventImage: true,
      },
      orderBy: {
        eventDateStart: "asc",
      },
    });
    return events;
  } catch (error) {
    throw new AppError("Failed to fetch event", 400);
  }
}

export async function getUniqueEvent(id: number) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        venue: true,
        ticket: true,
        eventImage: true,
      },
    });
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    return event;
  } catch (error) {
    throw new AppError("Failed to get unique event", 400);
  }
}
