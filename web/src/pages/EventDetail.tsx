import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import EventCard from "@/components/EventCard";
import { buildAuthRedirectPath } from "@/lib/auth-redirect";
import { useAuthStore } from "@/store/auth-store";
import type { EventDetail } from "@/types/eventDetailTypes";
import type { EventItem } from "@/types/eventListTypes";
import { formatDate, formatPrice, formatTime } from "@/utils/eventList.utils";
import { useNavigate } from "react-router";

const EVENT_IMAGE_PLACEHOLDER =
  "https://via.placeholder.com/1200x700?text=Event";

function pickRandomEvents(
  events: EventItem[],
  activeEventId: number,
  limit: number,
) {
  const pool = events.filter((item) => item.id !== activeEventId);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, limit);
}

function getTicketStatusConfig(status?: string, isAuthenticated: boolean = false) {
  if (status === "ACTIVE") {
    return {
      badgeClass:
        "text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full",
      cardClass:
        "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/50 transition-colors",
      buttonClass:
        "w-full py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors",
      badgeText: "Available",
      buttonText: isAuthenticated ? "Select" : "Sign in to buy",
      buttonDisabled: false,
    };
  }

  if (status === "SOLD_OUT") {
    return {
      badgeClass:
        "text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200 dark:bg-slate-700 dark:text-slate-400 px-2 py-0.5 rounded-full",
      cardClass:
        "p-4 rounded-xl border border-slate-200 dark:border-slate-800 opacity-70 bg-slate-100 dark:bg-slate-800/20",
      buttonClass:
        "w-full py-2 bg-slate-200 dark:bg-slate-700 text-slate-400 rounded-lg font-semibold text-sm cursor-not-allowed",
      badgeText: "Sold Out",
      buttonText: "Sold Out",
      buttonDisabled: true,
    };
  }

  return {
    badgeClass:
      "text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full",
    cardClass:
      "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40",
    buttonClass:
      "w-full py-2 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-lg font-semibold text-sm cursor-not-allowed",
    badgeText: status ?? "Unavailable",
    buttonText: "Unavailable",
    buttonDisabled: true,
  };
}

function formatReviewDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getReviewerInitial(name?: string | null) {
  return name?.trim().charAt(0).toUpperCase() || "U";
}

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [recommendedEvents, setRecommendedEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const recommendedListRef = useRef<HTMLDivElement>(null);

  function handleSelectTicket(ticketId: number) {
    if (!event) {
      return;
    }

    const checkoutPath = `/events/${event.id}/checkout?ticketId=${ticketId}`;

    if (!isAuthenticated) {
      toast.info("Sign in or create an account before buying tickets.");
      navigate(buildAuthRedirectPath(checkoutPath));
      return;
    }

    navigate(checkoutPath);
  }

  useEffect(() => {
    const parsedEventId = Number(id);
    if (!id || Number.isNaN(parsedEventId)) {
      setEvent(null);
      setRecommendedEvents([]);
      setIsLoading(false);
      return;
    }

    async function fetchEventData() {
      setIsLoading(true);
      try {
        const eventResponse = await apiClient.get(
          API_ENDPOINTS.EVENTS.FIND(parsedEventId),
        );
        const fetchedEvent = eventResponse.data.data as EventDetail;
        setEvent(fetchedEvent);

        try {
          const listResponse = await apiClient.get(API_ENDPOINTS.EVENTS.SHOW);
          const allEvents = listResponse.data.data as EventItem[];
          setRecommendedEvents(pickRandomEvents(allEvents, fetchedEvent.id, 5));
        } catch (error) {
          console.error("Failed to fetch recommendation events", error);
          setRecommendedEvents([]);
        }
      } catch (error) {
        console.error("Failed to fetch event detail", error);
        toast.error("Failed to fetch event detail");
        setEvent(null);
        setRecommendedEvents([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEventData();
  }, [id]);

  const firstVenue = event?.venue?.[0];
  const eventImage =
    event?.eventImage?.[0]?.imageURL ?? event?.image ?? EVENT_IMAGE_PLACEHOLDER;
  const eventLocation = firstVenue
    ? [firstVenue.city ?? firstVenue.name, firstVenue.region]
        .filter(Boolean)
        .join(", ")
    : "Venue TBA";
  const venueAddress = firstVenue
    ? [
        firstVenue.addressLine ?? firstVenue.address,
        firstVenue.city,
        firstVenue.region,
        firstVenue.country,
      ]
        .filter(Boolean)
        .join(", ")
    : "Venue details are not available yet.";

  const eventTags = useMemo(() => {
    if (!event?.category) return [];
    return event.category
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [event?.category]);

  const eventTickets = useMemo(() => {
    if (!event?.ticket) return [];

    return event.ticket.filter((ticket) =>
      typeof ticket.eventId === "number" ? ticket.eventId === event.id : true,
    );
  }, [event]);
  const eventReviews = event?.reviews ?? [];
  const totalReviews = event?.reviewStats?.totalReviews ?? eventReviews.length;
  const averageRating = event?.reviewStats?.averageRating ?? null;

  function scrollRecommendations(direction: "left" | "right") {
    const list = recommendedListRef.current;
    if (!list) return;

    const firstCard = list.querySelector<HTMLElement>(
      "[data-recommendation-card]",
    );
    const scrollStep = firstCard ? firstCard.offsetWidth + 16 : 320;
    const scrollDirection = direction === "left" ? -scrollStep : scrollStep;

    list.scrollBy({ left: scrollDirection, behavior: "smooth" });
  }

  if (isLoading && !event) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-slate-500">Loading event details...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Event not found
        </h1>
        <p className="mt-3 text-slate-500">The event may have been removed.</p>
      </main>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link className="hover:text-primary" to="/">
                Home
              </Link>
            </li>
            <li>
              <span className="material-icons text-xs">chevron_right</span>
            </li>
            <li>
              <Link className="hover:text-primary" to="/">
                Events
              </Link>
            </li>
            <li>
              <span className="material-icons text-xs">chevron_right</span>
            </li>
            <li className="text-slate-900 dark:text-slate-200">
              {event.title}
            </li>
          </ol>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative group">
          <div className="w-full h-[450px] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
            <img
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={eventImage}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex flex-col justify-end p-8 text-white">
            <span className="bg-primary/90 backdrop-blur-sm text-xs font-bold uppercase tracking-widest px-3 py-1 rounded w-fit mb-4">
              {event.category ?? "Live Event"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary">
                  calendar_today
                </span>
                {formatDate(event.eventDateStart)}
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary">schedule</span>
                {formatTime(event.eventDateStart)} -{" "}
                {formatTime(event.eventDateEnd)} WIB
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary">location_on</span>
                {eventLocation}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-8 space-y-12">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">About this Event</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {event.eventDescription ?? "No description has been added yet."}
              </p>
              <h3 className="text-xl font-semibold mb-3">
                Terms and Conditions
              </h3>
              <p>{event.eventTnC ?? "No additional terms provided."}</p>
            </article>

            <section>
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <div className="rounded-xl overflow-hidden h-[300px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative">
                <img
                  alt={firstVenue?.name ?? "Event venue"}
                  className="w-full h-full object-cover opacity-45"
                  src={eventImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-xl flex items-start gap-3 max-w-md">
                    <span className="material-icons text-primary">
                      location_on
                    </span>
                    <div>
                      <p className="font-bold">
                        {firstVenue?.name ?? "Venue TBA"}
                      </p>
                      <p className="text-xs text-slate-500">{venueAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Event Tags</h2>
              {eventTags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {eventTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No tags available for this event.
                </p>
              )}
            </section>

            <section>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Customer Reviews</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Read feedback from verified attendees who already joined this
                    event.
                  </p>
                </div>
                <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {averageRating ?? "-"}
                    </span>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {totalReviews} review{totalReviews === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              {eventReviews.length > 0 ? (
                <div className="space-y-4">
                  {eventReviews.map((review) => (
                    <article
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                      key={review.id}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 sm:w-56 sm:flex-shrink-0">
                          {review.user.profilePicture ? (
                            <img
                              alt={review.user.name}
                              className="h-12 w-12 rounded-full object-cover"
                              src={review.user.profilePicture}
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                              {getReviewerInitial(review.user.name)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {review.user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Verified attendee
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }, (_, index) => (
                                <span
                                  className="material-symbols-outlined text-sm"
                                  key={index}
                                >
                                  {index < review.rating ? "star" : "star_outline"}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Updated {formatReviewDate(review.updatedAt)}
                            </p>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {review.comment || "No comment was provided."}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  No public reviews yet for this event.
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Event For You</h2>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous recommendations"
                    className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-primary transition-colors"
                    onClick={() => scrollRecommendations("left")}
                    type="button"
                  >
                    <span className="material-icons">chevron_left</span>
                  </button>
                  <button
                    aria-label="Next recommendations"
                    className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-primary transition-colors"
                    onClick={() => scrollRecommendations("right")}
                    type="button"
                  >
                    <span className="material-icons">chevron_right</span>
                  </button>
                </div>
              </div>

              {recommendedEvents.length > 0 ? (
                <div
                  ref={recommendedListRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
                >
                  {recommendedEvents.map((recommendedEvent) => (
                    <div
                      key={recommendedEvent.id}
                      className="w-[270px] sm:w-[290px] shrink-0 snap-start"
                      data-recommendation-card
                    >
                      <EventCard event={recommendedEvent} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No recommendations available right now.
                </p>
              )}
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky-widget space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Select Tickets
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Choose your preferred experience
                  </p>
                </div>

                {eventTickets.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {eventTickets.map((ticket) => {
                      const ticketStatus = getTicketStatusConfig(
                        ticket.status,
                        isAuthenticated,
                      );
                      const price = Number(ticket.price);
                      const hasValidPrice = Number.isFinite(price);

                      return (
                        <div className={ticketStatus.cardClass} key={ticket.id}>
                          <div className="flex justify-between items-start mb-2 gap-3">
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white">
                                {ticket.name}
                              </h4>
                              <span className={ticketStatus.badgeClass}>
                                {ticketStatus.badgeText}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                {hasValidPrice
                                  ? `IDR ${formatPrice(price)}`
                                  : "Price TBA"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <span className="material-icons text-xs">
                                timer
                              </span>
                              {ticket.salesEndAt
                                ? `Sales end on ${formatDate(ticket.salesEndAt)}`
                                : "Sales period not specified"}
                            </div>
                            {typeof ticket.quota === "number" && (
                              <div className="flex items-center gap-1">
                                <span className="material-icons text-xs">
                                  event_seat
                                </span>
                                {ticket.quota} total seats
                              </div>
                            )}
                          </div>

                          <button
                            className={ticketStatus.buttonClass}
                            disabled={ticketStatus.buttonDisabled}
                            type="button"
                            onClick={() => handleSelectTicket(ticket.id)}
                          >
                            {ticketStatus.buttonText}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mb-8 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-sm text-slate-500">
                    No ticket tiers available for this event yet.
                  </div>
                )}

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                    <span className="material-icons text-xs">security</span>
                    Secure checkout with SSL Encryption
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20">
                <div className="flex gap-4">
                  <div className="text-primary mt-1">
                    <span className="material-icons">info</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">
                      Group Booking?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                      Buy 5 or more tickets to get an additional 15% discount on
                      your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
