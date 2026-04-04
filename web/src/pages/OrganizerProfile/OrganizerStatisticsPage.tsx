import OrganizerMetricCard from "@/components/organizer/OrganizerMetricCard";
import OrganizerShell from "@/components/organizer/OrganizerShell";
import WeeklySalesChart, {
  getTotalWeeklySales,
} from "@/components/organizer/WeeklySalesChart";
import useOrganizerDashboard from "@/hooks/useOrganizerDashboard";
import { useAuthStore } from "@/store/auth-store";
import { formatEventDate } from "@/utils/eventList.utils";
import { formatCurrency } from "@/utils/orderTransaction.utils";
import { Link, useSearchParams } from "react-router";

function formatSoldTickets(
  tickets: Array<{
    quota: number;
    sold: number;
  }>,
) {
  const totalSold = tickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  const totalQuota = tickets.reduce((sum, ticket) => sum + ticket.quota, 0);

  return `${totalSold}/${totalQuota}`;
}

export default function OrganizerStatisticsPage() {
  const { dashboard, isLoading } = useOrganizerDashboard();
  const [searchParams] = useSearchParams();
  const organizerId = useAuthStore((state) => state.user?.id);
  const eventIdFromQuery = Number(searchParams.get("eventId"));
  const selectedEvent =
    Number.isFinite(eventIdFromQuery) && dashboard?.eventSummary
      ? dashboard.eventSummary.find((event) => event.id === eventIdFromQuery) ?? null
      : null;

  return (
    <OrganizerShell
      title="Organizer Statistics"
      description="Review performance trends, weekly revenue movement, and event inventory at a glance."
      actions={
        organizerId ? (
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            to={`/organizer/${organizerId}/attendees`}
          >
            View Attendees
          </Link>
        ) : null
      }
    >
      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          Loading statistics...
        </div>
      ) : (
        <div className="space-y-8">
          {selectedEvent ? (
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Focus Event
              </p>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {selectedEvent.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {selectedEvent.category || "Uncategorized"} - Created on{" "}
                    {formatEventDate(selectedEvent.createdAt)}
                  </p>
                </div>
                <Link
                  className="text-sm font-semibold text-primary hover:underline"
                  to={`/organizer/transactions?eventId=${selectedEvent.id}`}
                >
                  Open matching transactions
                </Link>
              </div>
            </section>
          ) : null}

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OrganizerMetricCard
              helperText="Total organizer revenue from completed orders."
              icon="payments"
              label="Gross Revenue"
              value={formatCurrency(dashboard?.sumRevenue._sum.totalAmount ?? 0)}
            />
            <OrganizerMetricCard
              helperText="Completed attendee count across your events."
              icon="group"
              tone="emerald"
              label="Attendees"
              value={dashboard?.numberAttendees ?? 0}
            />
            <OrganizerMetricCard
              helperText="All transactions currently associated with your events."
              icon="receipt_long"
              tone="amber"
              label="Transactions"
              value={dashboard?.numberTransaction ?? 0}
            />
            <OrganizerMetricCard
              helperText="Weekly sales captured in the chart below."
              icon="insights"
              label="Weekly Revenue"
              value={formatCurrency(getTotalWeeklySales(dashboard?.weeklySales ?? []))}
            />
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Weekly Revenue Trend
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Ticket sales this week
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {formatCurrency(getTotalWeeklySales(dashboard?.weeklySales ?? []))}
                </span>
              </div>

              <div className="mt-6">
                <WeeklySalesChart weeklySales={dashboard?.weeklySales ?? []} />
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Event Snapshot
              </p>
              <div className="mt-5 space-y-4">
                {(dashboard?.eventSummary ?? []).slice(0, 4).map((event) => (
                  <div
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                    key={event.id}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {event.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {event.category || "Uncategorized"}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {event.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>{formatEventDate(event.createdAt)}</span>
                      <span>{formatSoldTickets(event.ticket)} sold</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      )}
    </OrganizerShell>
  );
}
