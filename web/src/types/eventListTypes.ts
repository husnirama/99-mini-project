export type Venue = {
  id: number;
  name: string;
  address?: string | null;
  addressLine?: string | null;
  city?: string | null;
  country?: string | null;
  region?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

export type TicketType = {
  id: number;
  eventId?: number;
  name: string;
  price: number | string;
  quota?: number;
  status?: "ACTIVE" | "SOLD_OUT" | "HIDDEN" | string;
  salesStartAt?: string;
  salesEndAt?: string;
  description?: string | null;
};

export type EventImage = {
  id: number;
  imageURL: string;
};

export type EventItem = {
  id: number;
  title: string;
  category?: string | null;
  image?: string | null;
  eventDateStart: string;
  eventDateEnd: string;
  status: string;
  venue: Venue[];
  ticket: TicketType[];
  eventImage: EventImage[];
};

export type EventCardProps = {
  event: EventItem;
};
