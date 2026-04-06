import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import { getOrganizerEntryPath } from "@/config/site-navigation";
import EventCard from "@/components/EventCard";
import FeatureEventCard from "@/components/FeatureCard";
import type { EventItem } from "@/types/eventListTypes";
import { formatPrice, getLowestPrice } from "@/utils/eventList.utils";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

type DatePreset = "ANY" | "TODAY" | "THIS_WEEKEND" | "NEXT_WEEK";
type SortOption = "RECOMMENDED" | "NEWEST" | "PRICE_LOW" | "PRICE_HIGH";

const DEFAULT_TAGS = ["Music", "Technology", "Business", "Workshop"];

function toDateAtDayBoundary(value: string, boundary: "start" | "end") {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;

  const [year, month, day] = parts;
  if (boundary === "start") {
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function getPresetRange(preset: DatePreset, reference: Date = new Date()) {
  const todayStart = new Date(reference);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(reference);
  todayEnd.setHours(23, 59, 59, 999);

  if (preset === "TODAY") {
    return { start: todayStart, end: todayEnd };
  }

  if (preset === "THIS_WEEKEND") {
    const day = todayStart.getDay();
    const dayFromMonday = (day + 6) % 7;
    const monday = new Date(todayStart);
    monday.setDate(todayStart.getDate() - dayFromMonday);

    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);
    saturday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { start: saturday, end: sunday };
  }

  if (preset === "NEXT_WEEK") {
    const day = todayStart.getDay();
    const dayFromMonday = (day + 6) % 7;
    const monday = new Date(todayStart);
    monday.setDate(todayStart.getDate() - dayFromMonday);

    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    nextMonday.setHours(0, 0, 0, 0);

    const nextSunday = new Date(nextMonday);
    nextSunday.setDate(nextMonday.getDate() + 6);
    nextSunday.setHours(23, 59, 59, 999);

    return { start: nextMonday, end: nextSunday };
  }

  return { start: null, end: null };
}

function getEventCategories(event: EventItem) {
  if (!event.category) return [];
  return event.category
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getEventLocationText(event: EventItem) {
  const firstVenue = event.venue?.[0];
  if (!firstVenue) return "";

  return [firstVenue.name, firstVenue.city, firstVenue.region, firstVenue.country]
    .filter(Boolean)
    .join(", ");
}

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [selectedDatePreset, setSelectedDatePreset] = useState<DatePreset>("ANY");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [customDateStart, setCustomDateStart] = useState("");
  const [customDateEnd, setCustomDateEnd] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("RECOMMENDED");
  const location = useLocation();
  const queryFromUrl = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("q") ?? "";
  }, [location.search]);
  const organizerEntryPath = getOrganizerEntryPath(user);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await apiClient.get(API_ENDPOINTS.EVENTS.SHOW);
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Can not fetch Events");
      }
    }

    fetchEvents();
  }, []);

  const availableCategories = useMemo(() => {
    const categorySet = new Set<string>();

    events.forEach((event) => {
      getEventCategories(event).forEach((category) => categorySet.add(category));
    });

    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const tagButtons = availableCategories.length
    ? availableCategories.slice(0, 4)
    : DEFAULT_TAGS;

  const maxKnownPrice = useMemo(() => {
    const highestPrice = events.reduce((currentMax, event) => {
      const lowestTicketPrice = getLowestPrice(event.ticket);
      if (lowestTicketPrice === null) return currentMax;
      return Math.max(currentMax, lowestTicketPrice);
    }, 0);

    if (highestPrice <= 0) return 100_000;
    return Math.ceil(highestPrice / 50_000) * 50_000;
  }, [events]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = (searchQuery.trim() || queryFromUrl.trim()).toLowerCase();
    const normalizedLocation = locationQuery.trim().toLowerCase();
    const selectedCategorySet = new Set(
      selectedCategories.map((category) => category.toLowerCase()),
    );

    const minPrice = minPriceInput === "" ? null : Number(minPriceInput);
    const maxPrice = maxPriceInput === "" ? null : Number(maxPriceInput);
    const hasMinPrice = minPrice !== null && Number.isFinite(minPrice);
    const hasMaxPrice = maxPrice !== null && Number.isFinite(maxPrice);

    const presetRange = getPresetRange(selectedDatePreset);
    const customStart = toDateAtDayBoundary(customDateStart, "start");
    const customEnd = toDateAtDayBoundary(customDateEnd, "end");
    const hasCustomDate = Boolean(customStart || customEnd);
    const activeStart = hasCustomDate ? customStart : presetRange.start;
    const activeEnd = hasCustomDate ? customEnd : presetRange.end;

    const list = events.filter((event) => {
      const locationText = getEventLocationText(event).toLowerCase();
      const categories = getEventCategories(event).map((category) =>
        category.toLowerCase(),
      );
      const searchableText = `${event.title} ${event.category ?? ""} ${locationText}`.toLowerCase();

      if (normalizedSearch && !searchableText.includes(normalizedSearch)) {
        return false;
      }

      if (normalizedLocation && !locationText.includes(normalizedLocation)) {
        return false;
      }

      if (selectedCategorySet.size > 0) {
        const hasAtLeastOneCategory = categories.some((category) =>
          selectedCategorySet.has(category),
        );
        if (!hasAtLeastOneCategory) {
          return false;
        }
      }

      const lowestPrice = getLowestPrice(event.ticket);
      if (hasMinPrice && (lowestPrice === null || lowestPrice < minPrice)) {
        return false;
      }
      if (hasMaxPrice && (lowestPrice === null || lowestPrice > maxPrice)) {
        return false;
      }

      const eventDate = new Date(event.eventDateStart);
      if (activeStart && eventDate < activeStart) {
        return false;
      }
      if (activeEnd && eventDate > activeEnd) {
        return false;
      }

      return true;
    });

    if (sortBy === "NEWEST") {
      return list.sort(
        (a, b) =>
          new Date(b.eventDateStart).getTime() - new Date(a.eventDateStart).getTime(),
      );
    }

    if (sortBy === "PRICE_LOW") {
      return list.sort((a, b) => {
        const aPrice = getLowestPrice(a.ticket);
        const bPrice = getLowestPrice(b.ticket);
        const normalizedA = aPrice === null ? Number.POSITIVE_INFINITY : aPrice;
        const normalizedB = bPrice === null ? Number.POSITIVE_INFINITY : bPrice;
        return normalizedA - normalizedB;
      });
    }

    if (sortBy === "PRICE_HIGH") {
      return list.sort((a, b) => {
        const aPrice = getLowestPrice(a.ticket);
        const bPrice = getLowestPrice(b.ticket);
        const normalizedA = aPrice === null ? Number.NEGATIVE_INFINITY : aPrice;
        const normalizedB = bPrice === null ? Number.NEGATIVE_INFINITY : bPrice;
        return normalizedB - normalizedA;
      });
    }

    return list;
  }, [
    customDateEnd,
    customDateStart,
    events,
    locationQuery,
    maxPriceInput,
    minPriceInput,
    queryFromUrl,
    searchQuery,
    selectedCategories,
    selectedDatePreset,
    sortBy,
  ]);

  const featuredEvents = filteredEvents.slice(0, 3);
  const eventList = filteredEvents.slice(0, 12);

  function toggleCategory(category: string) {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category],
    );
  }

  function resetAllFilters() {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedDatePreset("ANY");
    setSelectedCategories([]);
    setMinPriceInput("");
    setMaxPriceInput("");
    setCustomDateStart("");
    setCustomDateEnd("");
    setSortBy("RECOMMENDED");
  }

  function handleSubscription() {
    const normalizedEmail = subscriptionEmail.trim();

    if (!normalizedEmail) {
      toast.error("Enter your email address first.");
      return;
    }

    navigate(`/auth/register?email=${encodeURIComponent(normalizedEmail)}`);
  }

  return (
    <>
      <header className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08)_0%,transparent_70%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Find your next <br />
            <span className="text-primary">extraordinary</span> moment.
          </h1>
          <p className="text-lg md:text-xl text-neutral-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover the best events in your city, from intimate jazz sessions
            to global tech summits.
          </p>

          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center gap-1 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-icons text-primary mr-3">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium placeholder:text-slate-400"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search events, artist, or keyword"
                type="text"
                value={searchQuery || queryFromUrl}
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-100 dark:bg-slate-800"></div>
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-icons text-primary mr-3">location_on</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium"
                onChange={(event) => setLocationQuery(event.target.value)}
                placeholder="City, venue, or country"
                type="text"
                value={locationQuery}
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-100 dark:bg-slate-800"></div>
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-symbols-outlined text-primary mr-3">
                calendar_month
              </span>
              <select
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium appearance-none cursor-pointer"
                onChange={(event) =>
                  setSelectedDatePreset(event.target.value as DatePreset)
                }
                value={selectedDatePreset}
              >
                <option value="ANY">Any Date</option>
                <option value="TODAY">Today</option>
                <option value="THIS_WEEKEND">This Weekend</option>
                <option value="NEXT_WEEK">Next Week</option>
              </select>
            </div>
            <button
              className="w-full md:w-auto bg-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
              onClick={() =>
                document.getElementById("event-results")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              type="button"
            >
              Search
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center mr-2">
              Trending
            </span>
            {tagButtons.map((tag) => {
              const isActive = selectedCategories.includes(tag);
              return (
                <button
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white border-transparent"
                  }`}
                  key={tag}
                  onClick={() => toggleCategory(tag)}
                  type="button"
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Experiences
              </h2>
              <p className="text-neutral-muted text-base mt-2">
                Curated events from your current search and filter settings.
              </p>
            </div>
            <span className="text-primary font-bold text-sm">
              {featuredEvents.length} featured
            </span>
          </div>
          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <FeatureEventCard event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-6 text-sm text-slate-500">
              No featured events match your filters.
            </div>
          )}
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center justify-between">
                  Categories
                  <button
                    className="text-primary text-[10px] font-bold hover:underline"
                    onClick={resetAllFilters}
                    type="button"
                  >
                    RESET ALL
                  </button>
                </h3>
                <div className="space-y-4">
                  {availableCategories.length > 0 ? (
                    availableCategories.map((category) => (
                      <label className="flex items-center group cursor-pointer" key={category}>
                        <input
                          checked={selectedCategories.includes(category)}
                          className="w-5 h-5 rounded text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                          onChange={() => toggleCategory(category)}
                          type="checkbox"
                        />
                        <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                          {category}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No categories available yet.</p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                      min={0}
                      onChange={(event) => setMinPriceInput(event.target.value)}
                      placeholder="Min (IDR)"
                      type="number"
                      value={minPriceInput}
                    />
                    <input
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                      min={0}
                      onChange={(event) => setMaxPriceInput(event.target.value)}
                      placeholder="Max (IDR)"
                      type="number"
                      value={maxPriceInput}
                    />
                  </div>
                  <input
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    max={maxKnownPrice}
                    min={0}
                    onChange={(event) => setMaxPriceInput(event.target.value)}
                    step={10_000}
                    type="range"
                    value={maxPriceInput === "" ? maxKnownPrice : Number(maxPriceInput)}
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                    <span>
                      Min{" "}
                      {minPriceInput === ""
                        ? "IDR 0"
                        : `IDR ${formatPrice(Number(minPriceInput))}`}
                    </span>
                    <span>
                      Max{" "}
                      {maxPriceInput === ""
                        ? `IDR ${formatPrice(maxKnownPrice)}`
                        : `IDR ${formatPrice(Number(maxPriceInput))}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
                  Date Range
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500" htmlFor="start-date-filter">
                      From
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                      id="start-date-filter"
                      onChange={(event) => setCustomDateStart(event.target.value)}
                      type="date"
                      value={customDateStart}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500" htmlFor="end-date-filter">
                      To
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                      id="end-date-filter"
                      onChange={(event) => setCustomDateEnd(event.target.value)}
                      type="date"
                      value={customDateEnd}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Custom dates override the quick date filter above.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-bold text-primary mb-2">Host your event</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                  Reach thousands of people looking for experiences like yours.
                </p>
                <button
                  className="w-full bg-primary text-white text-xs font-bold py-3 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
                  onClick={() => navigate(organizerEntryPath)}
                  type="button"
                >
                  {user?.role === "EVENT_ORGANIZER" ? "Create Event" : "Get Started"}
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1" id="event-results">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white w-full tracking-tight">
                {locationQuery.trim() ? (
                  <>
                    Events in <span className="text-primary">{locationQuery.trim()}</span>
                  </>
                ) : (
                  <>
                    Events in <span className="text-primary">All Locations</span>
                  </>
                )}
              </h2>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Sort by
                </span>
                <select
                  className="text-sm font-bold bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none py-2.5 pl-4 pr-10 cursor-pointer shadow-sm"
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                  value={sortBy}
                >
                  <option value="RECOMMENDED">Recommended</option>
                  <option value="NEWEST">Newest</option>
                  <option value="PRICE_LOW">Price: Low to High</option>
                  <option value="PRICE_HIGH">Price: High to Low</option>
                </select>
              </div>
            </div>

            {eventList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {eventList.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-6 text-sm text-slate-500">
                No events matched your search and filters.
              </div>
            )}

            <p className="mt-8 text-sm text-slate-500">
              Showing {eventList.length} of {filteredEvents.length} matched events ({events.length}{" "}
              total from database).
            </p>
          </div>
        </div>
      </main>

      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" fill="none" viewBox="0 0 100 100">
            <pattern
              height="20"
              id="grid"
              patternUnits="userSpaceOnUse"
              width="20"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              ></path>
            </pattern>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                Never miss an <br />
                unforgettable moment.
              </h2>
              <p className="text-blue-100 text-xl font-medium opacity-90">
                Get weekly curated event recommendations and exclusive early-bird
                access to tickets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 px-8 py-5 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50 border-none placeholder:text-slate-400 text-lg shadow-2xl"
                onChange={(event) => setSubscriptionEmail(event.target.value)}
                placeholder="Email address"
                type="email"
                value={subscriptionEmail}
              />
              <button
                className="bg-slate-950 text-white font-extrabold px-10 py-5 rounded-2xl hover:bg-black transition-all transform active:scale-95 shadow-2xl"
                onClick={handleSubscription}
                type="button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
