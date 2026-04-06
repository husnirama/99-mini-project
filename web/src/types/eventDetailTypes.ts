import type { EventImage, TicketType, Venue } from "./eventListTypes";

export type EventDetailReview = {
  id: number;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    profilePicture?: string | null;
  };
};

export type EventDetail = {
  id: number;
  title: string;
  category?: string | null;
  image?: string | null;
  eventDateStart: string;
  eventDateEnd: string;
  status?: string;
  eventDescription?: string;
  eventTnC?: string;
  venue?: Venue[];
  eventImage?: EventImage[];
  ticket?: TicketType[];
  reviews?: EventDetailReview[];
  reviewStats?: {
    totalReviews: number;
    averageRating: number | null;
  };
};
