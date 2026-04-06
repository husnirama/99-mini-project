import fs from "node:fs/promises";
import { cacheTags, invalidateCacheTags } from "../lib/cache.js";
import cloudinary from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/app-error.js";
import { createEventSchema } from "../validations/event.validation.js";
function normalizeNumeric(value, field) {
    const normalized = value.replace(/\D/g, "");
    if (!normalized) {
        throw new AppError(`${field} is required`, 400);
    }
    return normalized;
}
function parseCoordinate(value) {
    if (!value) {
        return null;
    }
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
}
function normalizeTicketPrice(price, availability) {
    if (availability === "Free") {
        return "0";
    }
    return normalizeNumeric(price, "Ticket price");
}
const publicEventInclude = {
    venue: true,
    ticket: {
        where: {
            status: {
                not: "HIDDEN",
            },
        },
        orderBy: {
            id: "asc",
        },
    },
    eventImage: {
        where: {
            deletedAt: null,
        },
        orderBy: {
            id: "asc",
        },
    },
};
const organizerManagedEventInclude = {
    ...publicEventInclude,
    promotion: {
        where: {
            deletedAt: null,
        },
        orderBy: {
            id: "asc",
        },
    },
};
const publicEventDetailInclude = {
    ...publicEventInclude,
    reviews: {
        where: {
            deletedAt: null,
        },
        orderBy: {
            updatedAt: "desc",
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                    profilePicture: true,
                },
            },
        },
    },
};
export async function createDraftEvent(organizerId, payload, files = []) {
    let uploadedPublicIds = [];
    try {
        const parsedCreateEvent = createEventSchema.parse(payload);
        if (!files.length) {
            throw new AppError("At least one event image is required", 400);
        }
        const uploadResults = await Promise.all(files.map((file) => cloudinary.uploader.upload(file.path)));
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
                    image: imageUrls[0] ?? null,
                },
            });
            const latitude = parseCoordinate(parsedCreateEvent.venue.latitude);
            const longitude = parseCoordinate(parsedCreateEvent.venue.longitude);
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
                    price: normalizeTicketPrice(ticket.price, ticket.availability),
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
                        discountValue: normalizeNumeric(promotion.discountValue, "Promotion discount value"),
                        maxDiscount: promotion.maxDiscount
                            ? normalizeNumeric(promotion.maxDiscount, "Promotion max discount")
                            : null,
                        minPurchase: promotion.minPurchase
                            ? normalizeNumeric(promotion.minPurchase, "Promotion min purchase")
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
                include: organizerManagedEventInclude,
            });
        });
        await invalidateCacheTags([
            cacheTags.eventsList,
            cacheTags.organizerDashboard(organizerId),
            cacheTags.organizerScope(organizerId),
        ]);
        return event;
    }
    catch (error) {
        if (uploadedPublicIds.length > 0) {
            await Promise.all(uploadedPublicIds.map((publicId) => cloudinary.uploader.destroy(publicId).catch(() => null)));
        }
        throw error;
    }
    finally {
        await Promise.all(files.map(async (file) => {
            try {
                await fs.unlink(file.path);
            }
            catch {
                return null;
            }
        }));
    }
}
export async function getOrganizerOwnedEvent(organizerId, eventId) {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            organizeBy: organizerId,
            deletedAt: null,
        },
        include: organizerManagedEventInclude,
    });
    if (!event) {
        throw new AppError("Event not found", 404);
    }
    return event;
}
export async function updateEventByOrganizer(organizerId, eventId, payload, files = []) {
    let uploadedPublicIds = [];
    try {
        const parsedUpdateEvent = createEventSchema.parse(payload);
        const existingEvent = await prisma.event.findFirst({
            where: {
                id: eventId,
                organizeBy: organizerId,
                deletedAt: null,
            },
            include: {
                venue: true,
                ticket: true,
                promotion: true,
                eventImage: {
                    where: {
                        deletedAt: null,
                    },
                },
            },
        });
        if (!existingEvent) {
            throw new AppError("Event not found", 404);
        }
        let imageUrls = [];
        if (files.length > 0) {
            const uploadResults = await Promise.all(files.map((file) => cloudinary.uploader.upload(file.path)));
            imageUrls = uploadResults.map((result) => result.secure_url);
            uploadedPublicIds = uploadResults.map((result) => result.public_id);
        }
        const latitude = parseCoordinate(parsedUpdateEvent.venue.latitude);
        const longitude = parseCoordinate(parsedUpdateEvent.venue.longitude);
        const submittedTicketIds = parsedUpdateEvent.ticketTypes
            .map((ticket) => ticket.id)
            .filter((ticketId) => Boolean(ticketId));
        const submittedPromotionIds = parsedUpdateEvent.promotions
            .map((promotion) => promotion.id)
            .filter((promotionId) => Boolean(promotionId));
        const updatedEvent = await prisma.$transaction(async (tx) => {
            await tx.event.update({
                where: {
                    id: eventId,
                },
                data: {
                    title: parsedUpdateEvent.title,
                    category: parsedUpdateEvent.category ?? null,
                    eventDescription: parsedUpdateEvent.eventDescription ?? null,
                    eventDateStart: parsedUpdateEvent.eventDateStart,
                    eventDateEnd: parsedUpdateEvent.eventDateEnd,
                    status: parsedUpdateEvent.status ?? existingEvent.status,
                    termsAccepted: parsedUpdateEvent.termsAccepted,
                    ...(imageUrls[0]
                        ? {
                            image: imageUrls[0],
                        }
                        : {}),
                },
            });
            const existingVenue = existingEvent.venue[0];
            if (existingVenue) {
                await tx.venue.update({
                    where: {
                        id: existingVenue.id,
                    },
                    data: {
                        name: parsedUpdateEvent.venue.name,
                        addressLine: parsedUpdateEvent.venue.addressLine,
                        city: parsedUpdateEvent.venue.city,
                        region: parsedUpdateEvent.venue.region ?? null,
                        country: parsedUpdateEvent.venue.country,
                        latitude,
                        longitude,
                    },
                });
            }
            else {
                await tx.venue.create({
                    data: {
                        eventId,
                        name: parsedUpdateEvent.venue.name,
                        addressLine: parsedUpdateEvent.venue.addressLine,
                        city: parsedUpdateEvent.venue.city,
                        region: parsedUpdateEvent.venue.region ?? null,
                        country: parsedUpdateEvent.venue.country,
                        latitude,
                        longitude,
                    },
                });
            }
            for (const ticket of parsedUpdateEvent.ticketTypes) {
                const ticketPayload = {
                    name: ticket.name,
                    price: normalizeTicketPrice(ticket.price, ticket.availability),
                    quota: Number(normalizeNumeric(ticket.capacity, "Ticket capacity")),
                    salesStartAt: parsedUpdateEvent.eventDateStart,
                    salesEndAt: parsedUpdateEvent.eventDateEnd,
                    status: "ACTIVE",
                    contactPerson: parsedUpdateEvent.contactInfo.contactName,
                    emailContactPerson: parsedUpdateEvent.contactInfo.contactEmail,
                    phoneContactPerson: `${parsedUpdateEvent.contactInfo.countryCode} ${parsedUpdateEvent.contactInfo.phoneNumber}`,
                };
                if (ticket.id) {
                    const existingTicket = existingEvent.ticket.find((currentTicket) => currentTicket.id === ticket.id);
                    if (!existingTicket) {
                        throw new AppError("Ticket type not found", 404);
                    }
                    await tx.ticketType.update({
                        where: {
                            id: ticket.id,
                        },
                        data: ticketPayload,
                    });
                    continue;
                }
                await tx.ticketType.create({
                    data: {
                        eventId,
                        sold: 0,
                        reserved: 0,
                        ...ticketPayload,
                    },
                });
            }
            const ticketIdsToHide = existingEvent.ticket
                .filter((ticket) => !submittedTicketIds.includes(ticket.id))
                .map((ticket) => ticket.id);
            if (ticketIdsToHide.length > 0) {
                await tx.ticketType.updateMany({
                    where: {
                        id: {
                            in: ticketIdsToHide,
                        },
                    },
                    data: {
                        status: "HIDDEN",
                    },
                });
            }
            for (const promotion of parsedUpdateEvent.promotions) {
                const promotionPayload = {
                    name: promotion.name,
                    code: promotion.code,
                    discountType: promotion.discountType,
                    discountValue: normalizeNumeric(promotion.discountValue, "Promotion discount value"),
                    maxDiscount: promotion.maxDiscount
                        ? normalizeNumeric(promotion.maxDiscount, "Promotion max discount")
                        : null,
                    minPurchase: promotion.minPurchase
                        ? normalizeNumeric(promotion.minPurchase, "Promotion min purchase")
                        : null,
                    quota: Number(normalizeNumeric(promotion.quota, "Promotion quota")),
                    startDate: promotion.startDate ? new Date(promotion.startDate) : null,
                    endDate: promotion.endDate ? new Date(promotion.endDate) : null,
                    deletedAt: null,
                };
                if (promotion.id) {
                    const existingPromotion = existingEvent.promotion.find((currentPromotion) => currentPromotion.id === promotion.id);
                    if (!existingPromotion) {
                        throw new AppError("Promotion not found", 404);
                    }
                    await tx.promotion.update({
                        where: {
                            id: promotion.id,
                        },
                        data: promotionPayload,
                    });
                    continue;
                }
                await tx.promotion.create({
                    data: {
                        eventId,
                        ...promotionPayload,
                    },
                });
            }
            const promotionIdsToDelete = existingEvent.promotion
                .filter((promotion) => !submittedPromotionIds.includes(promotion.id))
                .map((promotion) => promotion.id);
            if (promotionIdsToDelete.length > 0) {
                await tx.promotion.updateMany({
                    where: {
                        id: {
                            in: promotionIdsToDelete,
                        },
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                });
            }
            if (imageUrls.length > 0) {
                await tx.eventImage.updateMany({
                    where: {
                        eventId,
                        deletedAt: null,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                });
                await tx.eventImage.createMany({
                    data: imageUrls.map((imageUrl) => ({
                        eventId,
                        imageURL: imageUrl,
                    })),
                });
            }
            return tx.event.findUnique({
                where: {
                    id: eventId,
                },
                include: organizerManagedEventInclude,
            });
        });
        await invalidateCacheTags([
            cacheTags.eventsList,
            cacheTags.event(eventId),
            cacheTags.organizerDashboard(organizerId),
            cacheTags.organizerScope(organizerId),
        ]);
        return updatedEvent;
    }
    catch (error) {
        if (uploadedPublicIds.length > 0) {
            await Promise.all(uploadedPublicIds.map((publicId) => cloudinary.uploader.destroy(publicId).catch(() => null)));
        }
        throw error;
    }
    finally {
        await Promise.all(files.map(async (file) => {
            try {
                await fs.unlink(file.path);
            }
            catch {
                return null;
            }
        }));
    }
}
export async function getEventList() {
    try {
        const events = await prisma.event.findMany({
            where: {
                deletedAt: null,
            },
            include: publicEventInclude,
            orderBy: {
                eventDateStart: "asc",
            },
        });
        return events;
    }
    catch (error) {
        throw new AppError("Failed to fetch event", 400);
    }
}
export async function getUniqueEvent(id) {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id,
            },
            include: publicEventDetailInclude,
        });
        if (!event) {
            throw new AppError("Event not found", 404);
        }
        const totalReviews = event.reviews.length;
        const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0);
        return {
            ...event,
            reviewStats: {
                totalReviews,
                averageRating: totalReviews
                    ? Number((totalRating / totalReviews).toFixed(1))
                    : null,
            },
        };
    }
    catch (error) {
        throw new AppError("Failed to get unique event", 400);
    }
}
//# sourceMappingURL=event.service.js.map