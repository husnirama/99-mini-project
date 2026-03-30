// import { useParams } from "react-router";

import { useEffect, useState } from "react";
import type {
  EventDashboard,
  WeeklySales as WeeklySalesPoint,
} from "@/types/eventSummaryTypes";
import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/orderTransaction.utils";
import OrganizerDashboardTable from "../../components/OrganizerDashboardTable";

function normalizeRevenue(value: number | string) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

type WeeklyTicketSalesChartProps = {
  weeklySales: WeeklySalesPoint[];
};

function WeeklyTicketSalesChart({ weeklySales }: WeeklyTicketSalesChartProps) {
  const chartWidth = 320;
  const chartHeight = 128;
  const padding = {
    top: 12,
    right: 8,
    bottom: 18,
    left: 8,
  };

  const revenues = weeklySales.map((point) => normalizeRevenue(point.revenue));
  const maxRevenue = Math.max(...revenues, 0);
  const safeMaxRevenue = maxRevenue > 0 ? maxRevenue : 1;
  const drawableWidth = chartWidth - padding.left - padding.right;
  const baselineY = chartHeight - padding.bottom;
  const drawableHeight = baselineY - padding.top;

  const points = weeklySales.map((point, index) => {
    const revenue = normalizeRevenue(point.revenue);
    const x =
      weeklySales.length === 1
        ? chartWidth / 2
        : padding.left + (drawableWidth * index) / (weeklySales.length - 1);
    const y =
      maxRevenue > 0
        ? baselineY - (revenue / safeMaxRevenue) * drawableHeight
        : baselineY;

    return {
      ...point,
      revenue,
      x,
      y,
      label: point.day.charAt(0),
    };
  });

  const linePath = points.reduce((path, point, index) => {
    const command = `${point.x} ${point.y}`;
    return `${path}${index === 0 ? "M" : " L"}${command}`;
  }, "");

  const gridLineCount = 4;
  const gridLines = Array.from({ length: gridLineCount }, (_, index) => {
    return padding.top + (drawableHeight * index) / (gridLineCount - 1);
  });

  return (
    <div className="space-y-3">
      <div className="relative h-32 w-full">
        <svg
          aria-label="Weekly ticket sales line chart"
          className="h-full w-full"
          preserveAspectRatio="none"
          role="img"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {gridLines.map((lineY, index) => (
            <line
              key={index}
              stroke="var(--border)"
              strokeOpacity={index === gridLines.length - 1 ? "0.9" : "0.45"}
              strokeWidth={index === gridLines.length - 1 ? "1.2" : "1"}
              x1={padding.left}
              x2={chartWidth - padding.right}
              y1={lineY}
              y2={lineY}
            />
          ))}

          <path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {points.map((point) => (
            <g key={point.fullDate}>
              <title>{`${point.day}, ${point.fullDate}: ${formatCurrency(
                point.revenue,
              )}`}</title>
              <circle
                cx={point.x}
                cy={point.y}
                fill="white"
                r="5"
                stroke="var(--primary)"
                strokeWidth="2.5"
              />
              <circle cx={point.x} cy={point.y} fill="var(--primary)" r="2" />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {points.map((point) => (
          <span
            className="text-center text-[9px] font-bold text-outline"
            key={point.fullDate}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OrganizerDashboardPage() {
  const [event, setEvents] = useState<EventDashboard>(null);
  const weeklySales = event?.weeklySales ?? [];
  const totalWeeklySales = weeklySales.reduce(
    (sum, point) => sum + normalizeRevenue(point.revenue),
    0,
  );

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ORGANIZER.DASHBOARD);
        const data = response.data.data;
        setEvents(data);
      } catch (error) {
        console.error(error);
        toast.error("Can not fetch Dashboard Data");
      }
    }
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="bg-background text-on-background antialiased flex">
        <aside className="hidden md:flex flex-col h-screen sticky top-0 left-0 w-64 p-4 bg-slate-100 dark:bg-slate-900 font-inter antialiased tracking-tight text-slate-900 dark:text-slate-100 shrink-0">
          <div className="mb-8 px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-1">
              Event Management
            </p>
          </div>
          <nav className="flex-1 space-y-1">
            <a
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold active:scale-95 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="dashboard">
                dashboard
              </span>
              <span>Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="bar_chart">
                bar_chart
              </span>
              <span>Statistics</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="payments">
                payments
              </span>
              <span>Transactions</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="groups">
                groups
              </span>
              <span>Attendees</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
              <span>Settings</span>
            </a>
          </nav>
          <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800 space-y-1">
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="help">
                help
              </span>
              <span>Help Center</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
              <span>Logout</span>
            </a>
          </div>
        </aside>
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
          {/* <!-- TopNavBar (JSON Derived) --> */}
          <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl flex justify-between items-center h-16 px-6 font-inter text-sm font-medium">
            <div className="flex items-center gap-8">
              <h2 className="text-xl font-black text-slate-900">
                Event Portal
              </h2>
              <div className="hidden lg:flex items-center gap-6">
                <a
                  className="text-slate-500 hover:text-blue-700 transition-all"
                  href="#"
                >
                  Overview
                </a>
                <a
                  className="text-blue-600 border-b-2 border-blue-600 pb-1"
                  href="#"
                >
                  Analytics
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 cursor-pointer active:opacity-70 transition-all">
                <span className="material-symbols-outlined text-sm">add</span>
                New Event
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </button>
                <button className="p-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden ml-2 bg-surface-container-high">
                  <img
                    alt="Organizer Profile Picture"
                    className="w-full h-full object-cover"
                    data-alt="professional portrait of a confident event manager with a soft office background in daylight"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6jnF_S3ueiJlDlFETuuDXDjeuNn6vuqWk5pvsaKc03G87Tnedq60wsO076RCZgfA07wxdGGkTvdkX45w9PT4BJKInDnHWSLWEioHtDUQ8p-LbXAUIlTjwSgx9rw0EsfAKvtXmeuu76OsXTrReTJwvDo60KqaxWbLZs22RzyRIqsveS1P6keH3rtkr7MmnfrxsN75imi6Gq66JYFfAsMANkIPSuxmKanywLiLBCLK9rwK9AVM2S3Zpr15wOW2BZD_4MFOoKu3-CxnV"
                  />
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Dashboard Content --> */}
          <div className="p-6 md:p-10 space-y-10">
            {/* <!-- Header & Quick Actions --> */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  Organizer Dashboard
                </h2>
                <p className="text-on-surface-variant mt-1 font-medium">
                  Welcome back, Marcus. Here's what's happening today.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 primary-gradient text-white rounded-lg font-bold card-shadow hover:opacity-90 transition-opacity active:scale-95">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="add_circle"
                  >
                    add_circle
                  </span>
                  Create Event
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary-container text-on-secondary-container rounded-lg font-bold hover:bg-secondary-fixed transition-colors active:scale-95">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="event_note"
                  >
                    event_note
                  </span>
                  Manage Events
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest text-primary rounded-lg font-bold card-shadow hover:bg-surface-container-low transition-colors active:scale-95">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="insights"
                  >
                    insights
                  </span>
                  Open Statistics
                </button>
              </div>
            </section>
            {/* <!-- KPI Bento Grid --> */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* <!-- KPI 1 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex flex-col relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <span className="text-label text-[10px] font-bold tracking-widest uppercase text-outline mb-2">
                  Total Events
                </span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-on-surface">
                    {event?.numberOfEvent ?? 0}
                  </span>
                  <div className="p-2 bg-primary-fixed-dim/20 rounded-lg text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="event"
                    >
                      event
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- KPI 2 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex flex-col relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <span className="text-label text-[10px] font-bold tracking-widest uppercase text-outline mb-2">
                  Active Events
                </span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-on-surface">
                    {event?.numberOfActiveEvent ?? 0}
                  </span>
                  <div className="p-2 bg-primary-fixed-dim/20 rounded-lg text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="rocket_launch"
                    >
                      rocket_launch
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- KPI 3 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex flex-col relative overflow-hidden lg:col-span-1">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <span className="text-label text-[10px] font-bold tracking-widest uppercase text-outline mb-2">
                  Total Transactions
                </span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-on-surface">
                    {event?.numberTransaction ?? 0}
                  </span>
                  <div className="p-2 bg-primary-fixed-dim/20 rounded-lg text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="receipt_long"
                    >
                      receipt_long
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- KPI 4 (Wide) --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex flex-col relative overflow-hidden lg:col-span-2">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="flex justify-between items-start">
                  <span className="text-label text-[10px] font-bold tracking-widest uppercase text-outline mb-2">
                    Total Revenue
                  </span>
                  <span className="text-xs font-bold text-success text-green-600 flex items-center gap-1">
                    {/* <span
                      className="material-symbols-outlined text-xs"
                      data-icon="trending_up"
                    >
                      trending_up
                    </span> */}
                    {/* +12.5% */}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-on-surface">
                    IDR {event?.sumRevenue._sum.totalAmount ?? 0}
                  </span>
                  <div className="p-2 bg-primary-fixed-dim/20 rounded-lg text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="payments"
                    >
                      payments
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Main Section: Asymmetric Layout --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* <!-- Recent Events Table (2/3 Column) --> */}
              <section className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-bold tracking-tight text-on-surface">
                    Recent Events
                  </h3>
                  <a
                    className="text-sm font-bold text-primary hover:underline"
                    href="#"
                  >
                    View All
                  </a>
                </div>
                <div className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-label text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                        <tr>
                          <th className="px-6 py-4">Event name</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Sold</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        {event?.eventSummary ? (
                          event?.eventSummary.map((event) => (
                            <OrganizerDashboardTable
                              event={event}
                              key={event.title}
                            />
                          ))
                        ) : (
                          <tr></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              {/* <!-- Sidebar Content (1/3 Column) --> */}
              <section className="space-y-8">
                {/* <!-- Stats Preview --> */}
                <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold tracking-tight uppercase text-on-surface">
                      Weekly Ticket Sales
                    </h3>
                    <span
                      className="material-symbols-outlined text-primary"
                      data-icon="equalizer"
                    >
                      equalizer
                    </span>
                  </div>
                  <WeeklyTicketSalesChart weeklySales={weeklySales} />
                  <div className="pt-4 border-t border-surface-container flex justify-between items-center">
                    <span className="text-xs font-semibold text-on-surface-variant">
                      Total Weekly Sales
                    </span>
                    <span className="text-sm font-black text-on-surface">
                      {formatCurrency(totalWeeklySales)}
                    </span>
                  </div>
                </div>
                {/* <!-- Attendee Snapshot --> */}
                <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow">
                  <h3 className="text-sm font-bold tracking-tight uppercase text-on-surface mb-4">
                    Total Attendees
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black text-primary">
                      {event?.numberAttendees}
                    </div>
                    <div className="flex -space-x-3">
                      <img
                        alt="User 1"
                        className="h-10 w-10 rounded-full border-4 border-white object-cover"
                        data-alt="close up of diverse person smiling in natural light"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1CqRDEpqGlKjGK1XenvWQ1ssPefiEua5i_QAAwi2g0TWtvqs19nG2ZFMkwFKh5DTCCGFc2F5bjaOcyh9Yf10t4LIE3JVH2f7WrflAoZs-0lxoefJcPl5e-I1ZltuCm42CCo5wC68YZk24FEQoKLtReS5C_xR5C6a7G8_9c9D9d-FcDxKOXjDQ6z2sxRLtes78hXj9cTF4ydh5sD_2k0T99RUHsJ17GoV5wdHe_9xIMGS4XMZ8z4KlC_6ILBMsPdvZESlTo9OiQPnU"
                      />
                      <img
                        alt="User 2"
                        className="h-10 w-10 rounded-full border-4 border-white object-cover"
                        data-alt="professional woman in corporate attire smiling outdoors"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_M9-Bp56a5OkBnW9OjJNgaOR9noMdjIOGlWajzG6-6h11Q0xj89HU8RSaIP4UwEX7sS2nmuEiokdK0ms0duwPzM3nKYsbzGGmdYIg87VdaJc87_Y_rjT5tIaKEmgCR-PdfOtl38pgtjIYzkkm4EjfJUnvMFo_UFFOWAd2YXdwR9iksEnz--M3obVYigCtPe3u17P79CtBH_rUx_4iJdUEIiuU8ugvaIeneKYOLT3hhwY4Bb7UBl9H1QU3a-Ctz6rvxJBLVeOcT0D"
                      />
                      <img
                        alt="User 3"
                        className="h-10 w-10 rounded-full border-4 border-white object-cover"
                        data-alt="man in stylish glasses looking at camera in creative workspace"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRX8RTW04aM2c4DjRrQgayyf-gcRID4JpEfirnMjWofDrhuA63qpTFW-t3yLlFJkG6KKGZlosOYsjfPNwBVQ3I3bcZr7tNDci-rOaRDFUbhpihCWovpLq8tKllb2-gkgp34H-egDe3fhou2SAxi4TCX7A4npj4s7qMm81dUPNgcZr5jmPDI4QsbsoGg9GzeNKWA-gvfiECFSRLYJzvz1T-yO8i4nDUQUBd-kx-jm6sJzBAZ_pzI9EJG9Ic2xYBJKWl9qRPXgoRtCz1"
                      />
                      <div className="h-10 w-10 rounded-full border-4 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-outline">
                        +{event?.numberAttendees}
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-surface-container-low text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                    Manage Guest List
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
