import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import TransactionStatusBadge from "@/components/TransactionStatusBadge";
import { Button } from "@/components/ui/button";
import { useTransactionStore } from "@/store/transaction-store";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import {
  canCancelTransaction,
  canUploadPaymentProof,
  formatCurrency,
  formatPaymentMethod,
  getEffectiveTransactionStatus,
} from "@/utils/orderTransaction.utils";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

function formatDateTime(value?: string | null) {
  if (!value) {
    return "-";
  }

  return `${formatDate(value)} · ${formatTime(value)} WIB`;
}

export default function CustomerTransactionsPage() {
  const records = useTransactionStore((state) => Object.values(state.records));
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const [activeFilter, setActiveFilter] = useState<
    | "ALL"
    | "WAITING_FOR_PAYMENT"
    | "WAITING_FOR_ADMIN_CONFIRMATION"
    | "DONE"
    | "REJECTED"
    | "EXPIRED"
    | "CANCELED"
  >("ALL");
  const [pendingTransactionId, setPendingTransactionId] = useState<number | null>(
    null,
  );
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const sortedRecords = useMemo(
    () =>
      [...records].sort((left, right) => {
        const leftTime = new Date(
          left.transaction.createdAt || left.order.createdAt || left.lastSyncedAt,
        ).getTime();
        const rightTime = new Date(
          right.transaction.createdAt || right.order.createdAt || right.lastSyncedAt,
        ).getTime();

        return rightTime - leftTime;
      }),
    [records],
  );

  const filteredRecords = useMemo(
    () =>
      sortedRecords.filter((record) => {
        const status = getEffectiveTransactionStatus(record, now);
        return activeFilter === "ALL" ? true : status === activeFilter;
      }),
    [activeFilter, now, sortedRecords],
  );

  async function handleCancelTransaction(transactionId: number, guestToken?: string | null) {
    setPendingTransactionId(transactionId);

    try {
      const response = await apiClient.patch(
        API_ENDPOINTS.TRANSACTIONS.CANCEL(transactionId),
        {},
        {
          headers: guestToken ? { "x-guest-token": guestToken } : undefined,
        },
      );

      updateTransaction(transactionId, response.data.data);
      toast.success("Transaction canceled.");
    } catch (error: any) {
      console.error("Failed to cancel transaction", error);
      toast.error(
        error?.response?.data?.message || "We couldn't cancel this transaction.",
      );
    } finally {
      setPendingTransactionId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Customer History
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Saved Transactions
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Transactions are kept in the current browser so guest checkout and signed-in
            flow stay connected to the payment detail page.
          </p>
        </div>

        <Link
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
          to="/"
        >
          Browse events
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {[
          "ALL",
          "WAITING_FOR_PAYMENT",
          "WAITING_FOR_ADMIN_CONFIRMATION",
          "DONE",
          "REJECTED",
          "EXPIRED",
          "CANCELED",
        ].map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
              key={filter}
              onClick={() =>
                setActiveFilter(
                  filter as
                    | "ALL"
                    | "WAITING_FOR_PAYMENT"
                    | "WAITING_FOR_ADMIN_CONFIRMATION"
                    | "DONE"
                    | "REJECTED"
                    | "EXPIRED"
                    | "CANCELED",
                )
              }
              type="button"
            >
              {filter === "ALL"
                ? "All statuses"
                : filter
                    .toLowerCase()
                    .split("_")
                    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
                    .join(" ")}
            </button>
          );
        })}
      </div>

      {filteredRecords.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          No saved transactions match the current filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const status = getEffectiveTransactionStatus(record, now);

            return (
              <article
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900/50"
                key={record.transaction.id}
              >
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 lg:w-48">
                    <img
                      alt={record.event.title}
                      className="h-full w-full object-cover"
                      src={
                        record.event.image ||
                        "https://via.placeholder.com/640x420?text=Event"
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {record.event.title}
                          </h2>
                          <TransactionStatusBadge status={status} />
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {record.ticket.name} · {record.order.quantity} ticket
                          {record.order.quantity > 1 ? "s" : ""} ·{" "}
                          {formatPaymentMethod(record.transaction.paymentMethod)}
                        </p>
                      </div>

                      <div className="text-left lg:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Total
                        </p>
                        <p className="mt-1 text-xl font-bold text-primary">
                          {formatCurrency(record.order.totalAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Buyer
                        </p>
                        <p className="mt-1 font-medium text-slate-900 dark:text-white">
                          {record.order.buyerName}
                        </p>
                        <p className="mt-1 text-xs">{record.order.buyerEmail}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Created
                        </p>
                        <p className="mt-1 font-medium text-slate-900 dark:text-white">
                          {formatDateTime(record.transaction.createdAt || record.order.createdAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Expires
                        </p>
                        <p className="mt-1 font-medium text-slate-900 dark:text-white">
                          {record.order.expiresAt ? formatDateTime(record.order.expiresAt) : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button asChild className="h-10 rounded-lg px-4 text-sm font-semibold">
                        <Link to={`/transactions/${record.transaction.id}`}>
                          View detail
                        </Link>
                      </Button>

                      {canUploadPaymentProof(status) ? (
                        <Link
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                          to={`/transactions/${record.transaction.id}`}
                        >
                          Upload proof
                        </Link>
                      ) : null}

                      {canCancelTransaction(status) ? (
                        <Button
                          className="h-10 rounded-lg px-4 text-sm font-semibold"
                          disabled={pendingTransactionId === record.transaction.id}
                          onClick={() =>
                            handleCancelTransaction(
                              record.transaction.id,
                              record.guestToken,
                            )
                          }
                          type="button"
                          variant="outline"
                        >
                          {pendingTransactionId === record.transaction.id
                            ? "Canceling..."
                            : "Cancel"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
