import type { TicketType, EventItem } from "@/types/eventListTypes";

export function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// export function formatDate(date: string) {
//   return new Date(date).toLocaleDateString("id-ID", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

export function formatDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatEventTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID").format(price);
}

export function getLowestPrice(tickets: TicketType[]) {
  if (!tickets.length) return null;

  const numericPrices = tickets
    .map((ticket) =>
      typeof ticket.price === "number"
        ? ticket.price
        : Number(String(ticket.price).replace(/[^\d.-]/g, "")),
    )
    .filter((price) => Number.isFinite(price));

  if (!numericPrices.length) return null;
  return Math.min(...numericPrices);
}

export function getEventImage(event: EventItem) {
  return (
    event.eventImage?.[0]?.imageURL ||
    "https://via.placeholder.com/600x400?text=Event"
  );
}

export function getEventLocation(event: EventItem) {
  const firstVenue = event.venue?.[0];
  if (!firstVenue) return "Venue TBA";

  if (firstVenue.city) return `${firstVenue.city}, ${firstVenue.country}`;
  return firstVenue.name;
}
