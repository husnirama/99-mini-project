import OrganizerDashboardTable from "@/components/OrganizerDashboardTable";
import OrganizerMetricCard from "@/components/organizer/OrganizerMetricCard";
import OrganizerShell from "@/components/organizer/OrganizerShell";
import WeeklySalesChart, {
  getTotalWeeklySales,
} from "@/components/organizer/WeeklySalesChart";
import useOrganizerDashboard from "@/hooks/useOrganizerDashboard";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/utils/orderTransaction.utils";
import { Link } from "react-router";

export default function OrganizerDashboardPage() {
  const { dashboard, isLoading } = useOrganizerDashboard();
  const organizerId = useAuthStore((state) => state.user?.id);
  const weeklySales = dashboard?.weeklySales ?? [];
  const totalWeeklySales = getTotalWeeklySales(weeklySales);

  return (
    <OrganizerShell
      title="Organizer Dashboard"
      description="Track your live events, payments, and audience health from one place."
      actions={
        organizerId ? (
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            to={`/organizer/${organizerId}/statistics`}
          >
            Open Statistics
          </Link>
        ) : null
      }
    >
      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          Loading organizer dashboard...
        </div>
      ) : (
        <div className="space-y-8">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <OrganizerMetricCard
              helperText="All organizer events currently available in the system."
              icon="event"
              label="Total Events"
              value={dashboard?.numberOfEvent ?? 0}
            />
            <OrganizerMetricCard
              helperText="Events currently counted as active for this organizer."
              icon="rocket_launch"
              label="Active Events"
              value={dashboard?.numberOfActiveEvent ?? 0}
            />
            <OrganizerMetricCard
              helperText="Transactions routed to your organizer account."
              icon="receipt_long"
              label="Transactions"
              tone="amber"
              value={dashboard?.numberTransaction ?? 0}
            />
            <OrganizerMetricCard
              helperText="Confirmed attendees across completed orders."
              icon="groups"
              tone="emerald"
              label="Attendees"
              value={dashboard?.numberAttendees ?? 0}
            />
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.95fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Revenue
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {formatCurrency(dashboard?.sumRevenue._sum.totalAmount ?? 0)}
                  </h2>
                </div>
                {organizerId ? (
                  <Link
                    className="text-sm font-semibold text-primary hover:underline"
                    to={`/organizer/${organizerId}/statistics`}
                  >
                    View analytics
                  </Link>
                ) : null}
              </div>

              <div className="mt-8">
                <WeeklySalesChart weeklySales={weeklySales} />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm dark:border-slate-800">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Total weekly sales
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(totalWeeklySales)}
                </span>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Quick Actions
              </p>
              <div className="mt-5 space-y-3">
                <Link
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                  to="/organizer/create-event"
                >
                  <span>Create a new event</span>
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                  to="/organizer/transactions"
                >
                  <span>Review transactions</span>
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
                {organizerId ? (
                  <>
                    <Link
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                      to={`/organizer/${organizerId}/attendees`}
                    >
                      <span>Manage attendees</span>
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                      to={`/organizer/${organizerId}/settings`}
                    >
                      <span>Update profile</span>
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    </Link>
                  </>
                ) : null}
              </div>
            </article>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Recent Events
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Your latest event activity
                </h2>
              </div>
              <Link
                className="text-sm font-semibold text-primary hover:underline"
                to="/organizer/create-event"
              >
                Create another event
              </Link>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4">Event Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Sold</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.eventSummary.length ? (
                    dashboard.eventSummary.map((event) => (
                      <OrganizerDashboardTable event={event} key={event.id} />
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-8 text-sm text-slate-500 dark:text-slate-400"
                        colSpan={6}
                      >
                        No events have been created yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </OrganizerShell>
  );
}
