import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import TransactionStatusBadge from "@/components/TransactionStatusBadge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useTransactionStore } from "@/store/transaction-store";
import type {
  TransactionLifecycleRecord,
  TransactionRecord,
  TransactionStatus,
} from "@/types/orderTransactionTypes";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import {
  canCancelTransaction,
  canUploadPaymentProof,
  formatCurrency,
  formatPaymentMethod,
} from "@/utils/orderTransaction.utils";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const STATUS_FILTERS: Array<"ALL" | TransactionStatus> = [
  "ALL",
  "WAITING_FOR_PAYMENT",
  "WAITING_FOR_ADMIN_CONFIRMATION",
  "DONE",
  "REJECTED",
  "EXPIRED",
  "CANCELED",
];

function formatDateTime(value?: string | null) {
  if (!value) {
    return "-";
  }

  return `${formatDate(value)} · ${formatTime(value)} WIB`;
}

function formatStatusLabel(status: "ALL" | TransactionStatus) {
  if (status === "ALL") {
    return "All statuses";
  }

  return status
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function stampRecord(
  record: TransactionLifecycleRecord,
): TransactionLifecycleRecord {
  return {
    ...record,
    lastSyncedAt: new Date().toISOString(),
  };
}

export default function CustomerTransactionsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const guestRecords = useTransactionStore((state) =>
    Object.values(state.records).filter((record) => Boolean(record.guestToken)),
  );
  const saveRecords = useTransactionStore((state) => state.saveRecords);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  const [activeFilter, setActiveFilter] = useState<"ALL" | TransactionStatus>(
    "ALL",
  );
  const [records, setRecords] = useState<TransactionLifecycleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTransactionId, setPendingTransactionId] = useState<
    number | null
  >(null);

  async function fetchTransactions() {
    if (!isAuthenticated) {
      setRecords([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.LIST, {
        params: activeFilter === "ALL" ? undefined : { status: activeFilter },
      });

      const nextRecords = (
        response.data.data as TransactionLifecycleRecord[]
      ).map(stampRecord);

      setRecords(nextRecords);
      saveRecords(nextRecords);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      toast.error("We couldn't load your transactions.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [activeFilter, isAuthenticated]);

  async function handleCancelTransaction(
    transactionId: number,
    guestToken?: string | null,
  ) {
    setPendingTransactionId(transactionId);

    try {
      const response = await apiClient.patch(
        API_ENDPOINTS.TRANSACTIONS.CANCEL(transactionId),
        {},
        {
          headers: guestToken ? { "x-guest-token": guestToken } : undefined,
        },
      );

      updateTransaction(transactionId, response.data.data as TransactionRecord);

      if (isAuthenticated) {
        await fetchTransactions();
      }

      toast.success("Transaction canceled.");
    } catch (error) {
      console.error("Failed to cancel transaction", error);
      toast.error("We couldn't cancel this transaction.");
    } finally {
      setPendingTransactionId(null);
    }
  }

  const sourceRecords = isAuthenticated ? records : guestRecords;
  const filteredRecords =
    activeFilter === "ALL"
      ? sourceRecords
      : sourceRecords.filter(
          (record) => record.transaction.status === activeFilter,
        );
  const sortedRecords = [...filteredRecords].sort((left, right) => {
    const leftTime = new Date(
      left.transaction.createdAt || left.order.createdAt || left.lastSyncedAt,
    ).getTime();
    const rightTime = new Date(
      right.transaction.createdAt ||
        right.order.createdAt ||
        right.lastSyncedAt,
    ).getTime();

    return rightTime - leftTime;
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Customer History
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transactions
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            {isAuthenticated
              ? "Your transaction list is loaded from the backend."
              : "You're viewing guest transactions saved in this browser."}
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
        {STATUS_FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {formatStatusLabel(filter)}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          Loading transactions...
        </div>
      ) : sortedRecords.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          No transactions match the current filter.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRecords.map((record) => {
            const status = record.transaction.status;

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
                          {formatPaymentMethod(
                            record.transaction.paymentMethod,
                          )}
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
                        <p className="mt-1 text-xs">
                          {record.order.buyerEmail}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Created
                        </p>
                        <p className="mt-1 font-medium text-slate-900 dark:text-white">
                          {formatDateTime(
                            record.transaction.createdAt ||
                              record.order.createdAt,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Expires
                        </p>
                        <p className="mt-1 font-medium text-slate-900 dark:text-white">
                          {record.order.expiresAt
                            ? formatDateTime(record.order.expiresAt)
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        asChild
                        className="h-10 rounded-lg px-4 text-sm font-semibold"
                      >
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
                          disabled={
                            pendingTransactionId === record.transaction.id
                          }
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
