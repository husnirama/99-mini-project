import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import TransactionStatusBadge from "@/components/TransactionStatusBadge";
import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";
import type {
  TransactionLifecycleRecord,
  TransactionStatus,
} from "@/types/orderTransactionTypes";
import { formatDate } from "@/utils/eventList.utils";
import {
  canCancelTransaction,
  canUploadPaymentProof,
  formatCurrency,
  formatTransactionStatusLabel,
} from "@/utils/orderTransaction.utils";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type DashboardStatusFilter = "ALL" | TransactionStatus;

type CustomerTicketsSummary = {
  totalTickets: {
    _count: {
      id: number;
    };
  };
  upcomingEvents: {
    _count: {
      id: number;
    };
  };
};

const STATUS_OPTIONS: DashboardStatusFilter[] = [
  "ALL",
  "WAITING_FOR_PAYMENT",
  "WAITING_FOR_ADMIN_CONFIRMATION",
  "DONE",
  "REJECTED",
  "EXPIRED",
  "CANCELED",
];

function stampRecord(
  record: TransactionLifecycleRecord,
): TransactionLifecycleRecord {
  return {
    ...record,
    lastSyncedAt: new Date().toISOString(),
  };
}

function formatDashboardStatus(status: DashboardStatusFilter) {
  if (status === "ALL") {
    return "All Status";
  }

  return formatTransactionStatusLabel(status);
}

function getRecordTimestamp(record: TransactionLifecycleRecord) {
  return new Date(
    record.transaction.createdAt || record.order.createdAt || record.lastSyncedAt,
  ).getTime();
}

export default function CustomerTickets() {
  const [summary, setSummary] = useState<CustomerTicketsSummary | null>(null);
  const [records, setRecords] = useState<TransactionLifecycleRecord[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<DashboardStatusFilter>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingTransactionId, setPendingTransactionId] = useState<number | null>(
    null,
  );

  async function fetchDashboard() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [summaryResponse, transactionsResponse] = await Promise.all([
        apiClient.get(API_ENDPOINTS.CUSTOMERS.TICKETS),
        apiClient.get(API_ENDPOINTS.TRANSACTIONS.LIST),
      ]);

      setSummary(summaryResponse.data.data as CustomerTicketsSummary);
      setRecords(
        (transactionsResponse.data.data as TransactionLifecycleRecord[]).map(
          stampRecord,
        ),
      );
    } catch (error: any) {
      console.error("Failed to fetch customer dashboard", error);
      setSummary(null);
      setRecords([]);
      setErrorMessage(
        error?.response?.data?.message || "We couldn't load your tickets right now.",
      );
      toast.error("We couldn't load your ticket dashboard.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function handleCancelTransaction(transactionId: number) {
    setPendingTransactionId(transactionId);

    try {
      await apiClient.patch(API_ENDPOINTS.TRANSACTIONS.CANCEL(transactionId), {});
      toast.success("Transaction canceled.");
      await fetchDashboard();
    } catch (error: any) {
      console.error("Failed to cancel transaction", error);
      toast.error(
        error?.response?.data?.message || "We couldn't cancel this transaction.",
      );
    } finally {
      setPendingTransactionId(null);
    }
  }

  const sortedRecords = useMemo(
    () =>
      [...records].sort(
        (left, right) => getRecordTimestamp(right) - getRecordTimestamp(left),
      ),
    [records],
  );
  const filteredRecords = useMemo(
    () =>
      activeFilter === "ALL"
        ? sortedRecords
        : sortedRecords.filter(
            (record) => record.transaction.status === activeFilter,
          ),
    [activeFilter, sortedRecords],
  );
  const totalTicketUnits = useMemo(
    () =>
      records.reduce((sum, record) => sum + (record.order.quantity ?? 0), 0),
    [records],
  );
  const nextUpcomingRecord = useMemo(
    () =>
      [...records]
        .filter(
          (record) =>
            new Date(record.event.eventDateStart).getTime() > Date.now() &&
            record.transaction.status !== "CANCELED" &&
            record.transaction.status !== "EXPIRED" &&
            record.transaction.status !== "REJECTED",
        )
        .sort(
          (left, right) =>
            new Date(left.event.eventDateStart).getTime() -
            new Date(right.event.eventDateStart).getTime(),
        )[0] ?? null,
    [records],
  );

  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:flex-row lg:p-5">
        <SideNavigation />
        <main className="min-h-screen min-w-0 flex-1">
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              Loading your ticket dashboard...
            </div>
          ) : errorMessage ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {errorMessage}
            </div>
          ) : (
              <div className="space-y-8 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
                    My Tickets
                  </h2>
                  <p className="mt-1 text-on-surface-variant">
                    Manage your event bookings and view transaction history.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary-container px-4 py-2 text-sm font-semibold text-on-secondary-container transition-opacity hover:opacity-90"
                  to="/transactions/history"
                >
                  <span className="material-symbols-outlined text-sm">
                    receipt_long
                  </span>
                  Open Full History
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-xl border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm">
                  <div className="absolute right-0 top-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl">
                      confirmation_number
                    </span>
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                    Total Tickets
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-on-surface">
                      {totalTicketUnits}
                    </span>
                    <span className="text-xs font-medium text-on-surface-variant">
                      {summary?.totalTickets._count.id ?? 0} order
                      {(summary?.totalTickets._count.id ?? 0) === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border-l-4 border-tertiary bg-surface-container-lowest p-6 shadow-sm">
                  <div className="absolute right-0 top-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl">
                      calendar_today
                    </span>
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                    Upcoming Events
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-on-surface">
                      {summary?.upcomingEvents._count.id ?? 0}
                    </span>
                    <span className="text-xs font-medium text-primary">
                      {nextUpcomingRecord
                        ? `Next: ${formatDate(nextUpcomingRecord.event.eventDateStart)}`
                        : "No upcoming bookings"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                  <div className="flex flex-col gap-3 border-b border-outline-variant/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <h3 className="text-lg font-bold">Transaction History</h3>
                  <select
                    className="rounded-lg bg-surface-container-low px-3 py-1.5 text-xs font-medium focus:ring-primary/20"
                    onChange={(event) =>
                      setActiveFilter(event.target.value as DashboardStatusFilter)
                    }
                    value={activeFilter}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {formatDashboardStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-surface-container-low/50 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <th className="px-4 py-4 sm:px-6">Order ID</th>
                        <th className="px-4 py-4 sm:px-6">Event Name</th>
                        <th className="px-4 py-4 sm:px-6">Date</th>
                        <th className="px-4 py-4 sm:px-6">Qty</th>
                        <th className="px-4 py-4 sm:px-6">Total Paid</th>
                        <th className="px-4 py-4 sm:px-6">Status</th>
                        <th className="px-4 py-4 text-right sm:px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {filteredRecords.length ? (
                        filteredRecords.map((record) => (
                          <tr
                            className="transition-colors hover:bg-surface-container-low/30"
                            key={record.transaction.id}
                          >
                              <td className="px-4 py-4 font-mono font-medium text-primary sm:px-6">
                              #{record.order.id}
                            </td>
                              <td className="px-4 py-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                                  <img
                                    alt={record.event.title}
                                    className="h-full w-full object-cover"
                                    src={
                                      record.event.image ||
                                      "https://via.placeholder.com/160x160?text=Event"
                                    }
                                  />
                                </div>
                                <span className="font-bold">{record.event.title}</span>
                              </div>
                            </td>
                              <td className="px-4 py-4 text-on-surface-variant sm:px-6">
                              {formatDate(record.event.eventDateStart)}
                            </td>
                              <td className="px-4 py-4 sm:px-6">{record.order.quantity}</td>
                              <td className="px-4 py-4 font-semibold text-on-surface sm:px-6">
                              {formatCurrency(record.order.totalAmount)}
                            </td>
                              <td className="px-4 py-4 sm:px-6">
                              <TransactionStatusBadge
                                className="whitespace-nowrap"
                                status={record.transaction.status}
                              />
                            </td>
                              <td className="px-4 py-4 sm:px-6">
                              <div className="flex flex-wrap justify-end gap-3">
                                <Link
                                  className="font-semibold text-primary hover:underline"
                                  to={`/transactions/${record.transaction.id}`}
                                >
                                  View detail
                                </Link>
                                {canUploadPaymentProof(record.transaction.status) ? (
                                  <Link
                                    className="font-semibold text-primary hover:underline"
                                    to={`/transactions/${record.transaction.id}`}
                                  >
                                    Upload proof
                                  </Link>
                                ) : null}
                                {canCancelTransaction(record.transaction.status) ? (
                                  <button
                                    className="font-semibold text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={
                                      pendingTransactionId === record.transaction.id
                                    }
                                    onClick={() =>
                                      handleCancelTransaction(record.transaction.id)
                                    }
                                    type="button"
                                  >
                                    {pendingTransactionId === record.transaction.id
                                      ? "Canceling..."
                                      : "Cancel"}
                                  </button>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="px-4 py-8 text-sm text-on-surface-variant sm:px-6"
                            colSpan={7}
                          >
                            No transactions match the current status filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                  <div className="flex flex-col gap-3 border-t border-outline-variant/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs text-on-surface-variant">
                    Showing {filteredRecords.length} of {records.length} transactions
                  </p>
                  <Link
                    className="text-xs font-semibold text-primary hover:underline"
                    to="/transactions/history"
                  >
                    Open the full customer history page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
