import { cacheTags, invalidateCacheTags } from "../../lib/cache.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/app-error.js";
import {
  customerReviewCreateSchema,
  type CustomerReviewCreateInput,
} from "../../validations/customer.validation.js";

type ReviewEventRecord = {
  id: number;
  title: string;
  eventDateStart: Date;
  eventDateEnd: Date;
  image: string | null;
  eventImage: Array<{ imageURL: string }>;
  venue: Array<{
    name: string;
    city: string;
    region: string | null;
    country: string;
  }>;
};

function serializeReviewEvent(event: ReviewEventRecord) {
  const venue = event.venue[0];

  return {
    id: event.id,
    title: event.title,
    eventDateStart: event.eventDateStart,
    eventDateEnd: event.eventDateEnd,
    image: event.eventImage[0]?.imageURL ?? event.image,
    locationLabel: [venue?.name, venue?.city, venue?.region, venue?.country]
      .filter(Boolean)
      .join(", "),
  };
}

function normalizeComment(comment?: string) {
  const trimmedComment = comment?.trim();
  return trimmedComment ? trimmedComment : null;
}

export async function getCustomerReviews(userId: number) {
  const [writtenReviews, completedEvents] = await Promise.all([
    prisma.reviews.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        eventId: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        event: {
          select: {
            id: true,
            title: true,
            eventDateStart: true,
            eventDateEnd: true,
            image: true,
            eventImage: {
              select: {
                imageURL: true,
              },
            },
            venue: {
              select: {
                name: true,
                city: true,
                region: true,
                country: true,
              },
            },
          },
        },
      },
    }),
    prisma.order.findMany({
      where: {
        customerId: userId,
        status: "COMPLETED",
        event: {
          deletedAt: null,
          eventDateEnd: {
            lt: new Date(),
          },
        },
      },
      distinct: ["eventId"],
      orderBy: {
        createdAt: "desc",
      },
      select: {
        eventId: true,
        event: {
          select: {
            id: true,
            title: true,
            eventDateStart: true,
            eventDateEnd: true,
            image: true,
            eventImage: {
              select: {
                imageURL: true,
              },
            },
            venue: {
              select: {
                name: true,
                city: true,
                region: true,
                country: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const reviewedEventIds = new Set(writtenReviews.map((review) => review.eventId));
  const pendingReviews = completedEvents
    .filter((entry) => !reviewedEventIds.has(entry.eventId))
    .map((entry) => serializeReviewEvent(entry.event));
  const totalRating = writtenReviews.reduce(
    (sum, review) => sum + review.rating,
    0,
  );

  return {
    stats: {
      attendedEvents: completedEvents.length,
      reviewsWritten: writtenReviews.length,
      averageRating: writtenReviews.length
        ? Number((totalRating / writtenReviews.length).toFixed(1))
        : null,
    },
    pendingReviews,
    writtenReviews: writtenReviews.map((review) => ({
      id: review.id,
      eventId: review.eventId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      event: serializeReviewEvent(review.event),
    })),
  };
}

export async function createCustomerReview(
  userId: number,
  payload: CustomerReviewCreateInput,
) {
  const parsedPayload = customerReviewCreateSchema.parse(payload);
  const eligibleOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      eventId: parsedPayload.eventId,
      status: "COMPLETED",
      event: {
        deletedAt: null,
        eventDateEnd: {
          lt: new Date(),
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!eligibleOrder) {
    throw new AppError(
      "You can only review events with completed attendance",
      400,
    );
  }

  const existingReview = await prisma.reviews.findFirst({
    where: {
      userId,
      eventId: parsedPayload.eventId,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  if (existingReview) {
    throw new AppError("You have already reviewed this event", 400);
  }

  const review = await prisma.reviews.create({
    data: {
      userId,
      eventId: parsedPayload.eventId,
      rating: parsedPayload.rating,
      comment: normalizeComment(parsedPayload.comment),
    },
    select: {
      id: true,
      eventId: true,
      rating: true,
      comment: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  await invalidateCacheTags([
    cacheTags.customerScope(userId),
    cacheTags.customerReviews(userId),
    cacheTags.event(parsedPayload.eventId),
  ]);

  return review;
}
