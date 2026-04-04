import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import OrganizerShell from "@/components/organizer/OrganizerShell";
import type { TransactionLifecycleRecord } from "@/types/orderTransactionTypes";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import { formatCurrency } from "@/utils/orderTransaction.utils";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

function formatDateTime(value?: string | null) {
  if (!value) {
    return "-";
  }

  return `${formatDate(value)} - ${formatTime(value)} WIB`;
}

function exportAttendees(records: TransactionLifecycleRecord[]) {
  const rows = [
    [
      "Buyer Name",
      "Buyer Email",
      "Buyer Phone",
      "Event",
      "Ticket",
      "Quantity",
      "Total Paid",
      "Purchase Date",
    ],
    ...records.map((record) => [
      record.order.buyerName,
      record.order.buyerEmail,
      record.order.buyerPhone,
      record.event.title,
      record.ticket.name,
      String(record.order.quantity),
      String(record.order.totalAmount),
      record.transaction.paidAt || record.transaction.createdAt || "",
    ]),
  ];

  const csvContent = rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");

  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(csvBlob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "organizer-attendees.csv";
  link.click();

  URL.revokeObjectURL(downloadUrl);
}

export default function OrganizerAttendeesPage() {
  const [records, setRecords] = useState<TransactionLifecycleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("ALL");

  useEffect(() => {
    let isMounted = true;

    async function fetchAttendees() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.LIST, {
          params: {
            status: "DONE",
          },
        });

        if (!isMounted) {
          return;
        }

        setRecords(response.data.data as TransactionLifecycleRecord[]);
      } catch (error) {
        console.error(error);
        toast.error("We couldn't load attendees.");

        if (isMounted) {
          setRecords([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAttendees();

    return () => {
      isMounted = false;
    };
  }, []);

  const ticketOptions = useMemo(() => {
    const uniqueTickets = new Set(records.map((record) => record.ticket.name));
    return ["ALL", ...Array.from(uniqueTickets).sort((left, right) => left.localeCompare(right))];
  }, [records]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return records.filter((record) => {
      const matchesQuery =
        normalizedQuery === "" ||
        [
          record.order.buyerName,
          record.order.buyerEmail,
          record.event.title,
          record.ticket.name,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesTicket =
        selectedTicket === "ALL" || record.ticket.name === selectedTicket;

      return matchesQuery && matchesTicket;
    });
  }, [records, searchQuery, selectedTicket]);

  return (
    <OrganizerShell
      title="Attendees"
      description="Search completed buyers, review ticket mix, and export attendee data for on-site operations."
      actions={
        <button
          className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
          onClick={() => exportAttendees(filteredRecords)}
          type="button"
        >
          Export CSV
        </button>
      }
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Search
              </span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search buyer, email, event, or ticket..."
                type="text"
                value={searchQuery}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Ticket Type
              </span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                onChange={(event) => setSelectedTicket(event.target.value)}
                value={selectedTicket}
              >
                {ticketOptions.map((ticketOption) => (
                  <option key={ticketOption} value={ticketOption}>
                    {ticketOption === "ALL" ? "All tickets" : ticketOption}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          {isLoading ? (
            <div className="p-8 text-sm text-slate-500 dark:text-slate-400">
              Loading attendees...
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="p-8 text-sm text-slate-500 dark:text-slate-400">
              No attendee records match the current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4">Buyer</th>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Total Paid</th>
                    <th className="px-6 py-4">Paid At</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr
                      className="border-t border-slate-100 dark:border-slate-800"
                      key={record.transaction.id}
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {record.order.buyerName}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {record.order.buyerEmail}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {record.order.buyerPhone}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {record.event.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {record.event.locationLabel}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {record.ticket.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {record.order.quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(record.order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {formatDateTime(
                          record.transaction.paidAt || record.transaction.createdAt,
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-3 text-xs font-semibold">
                          <Link
                            className="text-primary hover:underline"
                            to={`/transactions/${record.transaction.id}`}
                          >
                            View payment
                          </Link>
                          <Link
                            className="text-slate-500 hover:text-primary hover:underline"
                            to={`/events/${record.event.id}`}
                          >
                            Open event
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {!isLoading && filteredRecords.length > 0 ? (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Matched Attendees
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {filteredRecords.length}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Revenue in View
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {formatCurrency(
                  filteredRecords.reduce(
                    (sum, record) => sum + record.order.totalAmount,
                    0,
                  ),
                )}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Ticket Volume
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {filteredRecords.reduce(
                  (sum, record) => sum + record.order.quantity,
                  0,
                )}
              </p>
            </article>
          </section>
        ) : null}
      </div>
    </OrganizerShell>
  );
}
