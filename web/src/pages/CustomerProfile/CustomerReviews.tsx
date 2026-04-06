import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";
import { formatDate } from "@/utils/eventList.utils";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type ReviewEventSnapshot = {
  id: number;
  title: string;
  eventDateStart: string;
  eventDateEnd: string;
  image: string | null;
  locationLabel: string;
};

type CustomerWrittenReview = {
  id: number;
  eventId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  event: ReviewEventSnapshot;
};

type CustomerReviewsResponse = {
  stats: {
    attendedEvents: number;
    reviewsWritten: number;
    averageRating: number | null;
  };
  pendingReviews: ReviewEventSnapshot[];
  writtenReviews: CustomerWrittenReview[];
};

type ReviewDraft = {
  rating: number;
  comment: string;
};

function getDefaultDraft(): ReviewDraft {
  return {
    rating: 5,
    comment: "",
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

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<CustomerReviewsResponse | null>(null);
  const [drafts, setDrafts] = useState<Record<number, ReviewDraft>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittingEventId, setSubmittingEventId] = useState<number | null>(
    null,
  );

  async function fetchReviews() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.REVIEWS);
      const nextReviews = response.data.data as CustomerReviewsResponse;

      setReviews(nextReviews);
      setDrafts((current) => {
        const nextDrafts = { ...current };

        nextReviews.pendingReviews.forEach((event) => {
          if (!nextDrafts[event.id]) {
            nextDrafts[event.id] = getDefaultDraft();
          }
        });

        return nextDrafts;
      });
    } catch (error) {
      console.error("Failed to fetch customer reviews", error);
      setReviews(null);
      setErrorMessage("We couldn't load your reviews right now.");
      toast.error("We couldn't load your reviews.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  function handleDraftChange(eventId: number, patch: Partial<ReviewDraft>) {
    setDrafts((current) => ({
      ...current,
      [eventId]: {
        ...(current[eventId] ?? getDefaultDraft()),
        ...patch,
      },
    }));
  }

  async function handleSubmitReview(eventId: number) {
    const draft = drafts[eventId] ?? getDefaultDraft();
    setSubmittingEventId(eventId);

    try {
      await apiClient.post(API_ENDPOINTS.CUSTOMERS.REVIEWS, {
        eventId,
        rating: draft.rating,
        comment: draft.comment,
      });
      toast.success("Review submitted successfully.");
      setDrafts((current) => {
        const nextDrafts = { ...current };
        delete nextDrafts[eventId];
        return nextDrafts;
      });
      await fetchReviews();
    } catch (error) {
      console.error("Failed to submit review", error);
      toast.error("We couldn't submit your review.");
    } finally {
      setSubmittingEventId(null);
    }
  }

  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:flex-row lg:p-5">
        <SideNavigation />
        <main className="min-w-0 flex-1">
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              Loading your reviews...
            </div>
          ) : errorMessage ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {errorMessage}
            </div>
          ) : (
            <div className="space-y-8">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Customer Reviews
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Share your event experience
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Review completed events from your real booking history and
                      revisit what you already submitted.
                    </p>
                  </div>
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                    to="/customer/dashboard"
                  >
                    Back to Tickets
                  </Link>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Attended Events
                  </p>
                  <p className="text-2xl font-bold">
                    {reviews?.stats.attendedEvents ?? 0}
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Reviews Written
                  </p>
                  <p className="text-2xl font-bold">
                    {reviews?.stats.reviewsWritten ?? 0}
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Average Rating
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-amber-500">
                      {reviews?.stats.averageRating ?? "-"}
                    </p>
                    <span className="material-symbols-outlined text-xl text-amber-500">
                      star
                    </span>
                  </div>
                </article>
              </section>

              <section className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-bold">Awaiting Your Review</h2>
                  <span className="text-xs font-medium text-slate-500">
                    {reviews?.pendingReviews.length ?? 0} event
                    {(reviews?.pendingReviews.length ?? 0) === 1 ? "" : "s"}
                  </span>
                </div>

                {reviews?.pendingReviews.length ? (
                  reviews.pendingReviews.map((event) => {
                    const draft = drafts[event.id] ?? getDefaultDraft();

                    return (
                      <article
                        className="overflow-hidden rounded-xl border border-primary/30 bg-white shadow-md ring-1 ring-primary/5 dark:border-primary/20 dark:bg-slate-900"
                        key={event.id}
                      >
                        <div className="p-5">
                          <div className="flex flex-col gap-5 md:flex-row">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                              <img
                                alt={event.title}
                                className="h-full w-full object-cover"
                                src={
                                  event.image ||
                                  "https://via.placeholder.com/240x240?text=Event"
                                }
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <h3 className="font-bold text-base">
                                    {event.title}
                                  </h3>
                                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                    <span className="material-icons-outlined text-sm">
                                      calendar_today
                                    </span>
                                    {formatDate(event.eventDateStart)}
                                    <span className="material-icons-outlined text-sm">
                                      location_on
                                    </span>
                                    {event.locationLabel || "Venue TBA"}
                                  </p>
                                </div>
                                <Link
                                  className="text-xs font-bold text-primary hover:underline"
                                  to={`/events/${event.id}`}
                                >
                                  View Event
                                </Link>
                              </div>

                              <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                                <div className="mb-4">
                                  <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                                    How was your experience?
                                  </label>
                                  <div className="mb-4 flex gap-1">
                                    {Array.from({ length: 5 }, (_, index) => {
                                      const ratingValue = index + 1;
                                      const isActive =
                                        ratingValue <= draft.rating;

                                      return (
                                        <button
                                          className={
                                            isActive
                                              ? "text-amber-400 transition-colors"
                                              : "text-slate-200 transition-colors hover:text-amber-400 dark:text-slate-700"
                                          }
                                          key={ratingValue}
                                          onClick={() =>
                                            handleDraftChange(event.id, {
                                              rating: ratingValue,
                                            })
                                          }
                                          type="button"
                                        >
                                          <span className="material-symbols-outlined text-3xl">
                                            star
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <textarea
                                    className="min-h-[100px] w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-sm transition-all focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                                    onChange={(eventTarget) =>
                                      handleDraftChange(event.id, {
                                        comment: eventTarget.target.value,
                                      })
                                    }
                                    placeholder="Share details of your experience to help others..."
                                    value={draft.comment}
                                  />
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <p className="flex items-center gap-1 text-xs text-slate-400">
                                    <span className="material-icons-outlined text-sm">
                                      verified
                                    </span>
                                    Your review will be public
                                  </p>
                                  <button
                                    className="w-full rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    disabled={submittingEventId === event.id}
                                    onClick={() => handleSubmitReview(event.id)}
                                    type="button"
                                  >
                                    {submittingEventId === event.id
                                      ? "Submitting..."
                                      : "Submit Review"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    No completed events are waiting for a review right now.
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold">Review History</h2>

                {reviews?.writtenReviews.length ? (
                  reviews.writtenReviews.map((review) => (
                    <article
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                      key={review.id}
                    >
                      <div className="p-5">
                        <div className="flex flex-col gap-5 md:flex-row">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              alt={review.event.title}
                              className="h-full w-full object-cover"
                              src={
                                review.event.image ||
                                "https://via.placeholder.com/240x240?text=Event"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                              <div>
                                <h3 className="font-bold text-base">
                                  {review.event.title}
                                </h3>
                                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                  <span className="material-icons-outlined text-sm">
                                    calendar_today
                                  </span>
                                  {formatDate(review.event.eventDateStart)}
                                  <span className="material-icons-outlined text-sm">
                                    location_on
                                  </span>
                                  {review.event.locationLabel || "Venue TBA"}
                                </p>
                              </div>
                              <Link
                                className="text-xs font-bold text-primary hover:underline"
                                to={`/events/${review.event.id}`}
                              >
                                View Event
                              </Link>
                            </div>

                            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                              <div className="mb-2 flex items-center gap-3">
                                <div className="flex text-amber-500">
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                      className="material-symbols-outlined text-sm"
                                      key={index}
                                    >
                                      {index < review.rating
                                        ? "star"
                                        : "star_outline"}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Updated {formatReviewDate(review.updatedAt)}
                                </span>
                              </div>
                              <p className="text-sm italic text-slate-600 dark:text-slate-300">
                                {review.comment || "No comment was provided."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    You haven't submitted any reviews yet.
                  </div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
