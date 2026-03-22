import type { EventImage, TicketType, Venue } from "./eventListTypes";

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
};
