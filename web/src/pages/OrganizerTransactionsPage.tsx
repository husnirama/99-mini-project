import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import TransactionStatusBadge from "@/components/TransactionStatusBadge";
import { Button } from "@/components/ui/button";
import type {
  TransactionLifecycleRecord,
  TransactionStatus,
} from "@/types/orderTransactionTypes";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import { getPositiveIntegerSearchParam } from "@/utils/search-params.utils";
import {
  canCancelTransaction,
  canReviewTransaction,
  formatCurrency,
  formatPaymentMethod,
} from "@/utils/orderTransaction.utils";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
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

export default function OrganizerTransactionsPage() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<"ALL" | TransactionStatus>(
    "WAITING_FOR_ADMIN_CONFIRMATION",
  );
  const [records, setRecords] = useState<TransactionLifecycleRecord[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    transactionId: number;
    action: "approve" | "reject" | "cancel";
  } | null>(null);
  const eventIdFilter = getPositiveIntegerSearchParam(searchParams, "eventId");
  const hasEventFilter = eventIdFilter !== null;

  async function fetchTransactions(
    filter: "ALL" | TransactionStatus = activeFilter,
  ) {
    setIsLoading(true);

    try {
      const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.LIST, {
        params: {
          ...(filter === "ALL" ? {} : { status: filter }),
          ...(hasEventFilter ? { eventId: eventIdFilter } : {}),
        },
      });

      const nextRecords = (
        response.data.data as TransactionLifecycleRecord[]
      ).map(stampRecord);

      setRecords(nextRecords);
      setSelectedTransactionId((current) => {
        if (
          current &&
          nextRecords.some((record) => record.transaction.id === current)
        ) {
          return current;
        }

        return nextRecords[0]?.transaction.id ?? null;
      });

      return nextRecords;
    } catch (error) {
      console.error("Failed to fetch organizer transactions", error);
      toast.error("Failed to fetch organizer transactions");
      setRecords([]);
      setSelectedTransactionId(null);
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions(activeFilter);
  }, [activeFilter, eventIdFilter, hasEventFilter]);

  async function handleAction(
    transactionId: number,
    action: "approve" | "reject" | "cancel",
  ) {
    setPendingAction({ transactionId, action });

    try {
      const endpoint =
        action === "approve"
          ? API_ENDPOINTS.TRANSACTIONS.APPROVE(transactionId)
          : action === "reject"
            ? API_ENDPOINTS.TRANSACTIONS.REJECT(transactionId)
            : API_ENDPOINTS.TRANSACTIONS.CANCEL(transactionId);

      await apiClient.patch(endpoint, {});
      await fetchTransactions();

      toast.success(
        action === "approve"
          ? "Transaction approved."
          : action === "reject"
            ? "Transaction rejected."
            : "Transaction canceled.",
      );
    } catch (error) {
      console.error(`Failed to ${action} transaction`, error);
      toast.error(`Failed to ${action} transaction`);
    } finally {
      setPendingAction(null);
    }
  }

  const selectedRecord =
    records.find((record) => record.transaction.id === selectedTransactionId) ??
    records[0] ??
    null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Organizer Review
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transaction Review Queue
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Incoming transactions are loaded from the backend and grouped by the
            current status filter.
          </p>
          {hasEventFilter ? (
            <div className="mt-3">
              <Link
                className="text-sm font-semibold text-primary hover:underline"
                to="/organizer/transactions"
              >
                Clear event filter
              </Link>
            </div>
          ) : null}
        </div>
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Incoming Transactions
            </h2>
            <span className="text-sm font-semibold text-primary">
              {records.length} item{records.length === 1 ? "" : "s"}
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/20">
              Loading transactions...
            </div>
          ) : records.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/20">
              No transactions match the current review filter.
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const isActive =
                  selectedRecord?.transaction.id === record.transaction.id;

                return (
                  <button
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-slate-200 bg-white hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900/40"
                    }`}
                    key={record.transaction.id}
                    onClick={() =>
                      setSelectedTransactionId(record.transaction.id)
                    }
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {record.event.title}
                          </h3>
                          <TransactionStatusBadge
                            className="px-2.5"
                            status={record.transaction.status}
                          />
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {record.order.buyerName} · {record.ticket.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {formatDateTime(
                            record.transaction.updatedAt ||
                              record.transaction.createdAt,
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">
                          {formatCurrency(record.order.totalAmount)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {formatPaymentMethod(
                            record.transaction.paymentMethod,
                          )}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          {!selectedRecord ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/20">
              Select a transaction from the queue to review the buyer, amount,
              and uploaded payment proof.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedRecord.event.title}
                  </h2>
                  <TransactionStatusBadge
                    status={selectedRecord.transaction.status}
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Transaction #{selectedRecord.transaction.id} · Order #
                  {selectedRecord.order.id}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Buyer info
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedRecord.order.buyerName}
                      </p>
                      <p>{selectedRecord.order.buyerEmail}</p>
                      <p>{selectedRecord.order.buyerPhone}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Event info
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedRecord.ticket.name}
                      </p>
                      <p>{selectedRecord.event.locationLabel}</p>
                      <p>
                        {formatDateTime(selectedRecord.event.eventDateStart)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Amount details
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between gap-4">
                        <span>Unit price</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatCurrency(selectedRecord.order.unitPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Quantity</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {selectedRecord.order.quantity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Subtotal</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatCurrency(selectedRecord.order.subTotalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Discount</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatCurrency(selectedRecord.order.discountAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-dashed border-slate-200 pt-3 dark:border-slate-700">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Total
                        </span>
                        <span className="font-bold text-primary">
                          {formatCurrency(selectedRecord.order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Review metadata
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between gap-4">
                        <span>Created</span>
                        <span className="text-right font-medium text-slate-900 dark:text-white">
                          {formatDateTime(
                            selectedRecord.transaction.createdAt ||
                              selectedRecord.order.createdAt,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Updated</span>
                        <span className="text-right font-medium text-slate-900 dark:text-white">
                          {formatDateTime(selectedRecord.transaction.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Verified at</span>
                        <span className="text-right font-medium text-slate-900 dark:text-white">
                          {formatDateTime(
                            selectedRecord.transaction.verifiedAt,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Paid at</span>
                        <span className="text-right font-medium text-slate-900 dark:text-white">
                          {formatDateTime(selectedRecord.transaction.paidAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Canceled at</span>
                        <span className="text-right font-medium text-slate-900 dark:text-white">
                          {formatDateTime(
                            selectedRecord.transaction.canceledAt,
                          )}
                        </span>
                      </div>
                      {selectedRecord.transaction.rejectedReason ? (
                        <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                          Rejection note:{" "}
                          {selectedRecord.transaction.rejectedReason}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Payment proof
                    </p>
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/20">
                      {selectedRecord.transaction.paymentProof ? (
                        <img
                          alt="Uploaded payment proof"
                          className="h-full max-h-[420px] w-full object-cover"
                          src={selectedRecord.transaction.paymentProof}
                        />
                      ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 px-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-4xl text-primary">
                            image
                          </span>
                          <p>
                            No payment proof uploaded for this transaction yet.
                          </p>
                        </div>
                      )}
                    </div>
                    {selectedRecord.transaction.paymentProof ? (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                          href={selectedRecord.transaction.paymentProof}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open proof
                        </a>
                        <a
                          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                          download
                          href={selectedRecord.transaction.paymentProof}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Download proof
                        </a>
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Payment method
                    </p>
                    <p className="mt-2">
                      {formatPaymentMethod(
                        selectedRecord.transaction.paymentMethod,
                      )}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {canReviewTransaction(selectedRecord.transaction.status) ? (
                      <>
                        <Button
                          className="h-11 rounded-lg px-5 text-sm font-semibold shadow-lg shadow-primary/20"
                          disabled={Boolean(pendingAction)}
                          onClick={() =>
                            handleAction(
                              selectedRecord.transaction.id,
                              "approve",
                            )
                          }
                          type="button"
                        >
                          {pendingAction?.transactionId ===
                            selectedRecord.transaction.id &&
                          pendingAction.action === "approve"
                            ? "Approving..."
                            : "Approve"}
                        </Button>
                        <Button
                          className="h-11 rounded-lg px-5 text-sm font-semibold"
                          disabled={Boolean(pendingAction)}
                          onClick={() =>
                            handleAction(
                              selectedRecord.transaction.id,
                              "reject",
                            )
                          }
                          type="button"
                          variant="destructive"
                        >
                          {pendingAction?.transactionId ===
                            selectedRecord.transaction.id &&
                          pendingAction.action === "reject"
                            ? "Rejecting..."
                            : "Reject"}
                        </Button>
                      </>
                    ) : null}

                    {canCancelTransaction(selectedRecord.transaction.status) ? (
                      <Button
                        className="h-11 rounded-lg px-5 text-sm font-semibold"
                        disabled={Boolean(pendingAction)}
                        onClick={() =>
                          handleAction(selectedRecord.transaction.id, "cancel")
                        }
                        type="button"
                        variant="outline"
                      >
                        {pendingAction?.transactionId ===
                          selectedRecord.transaction.id &&
                        pendingAction.action === "cancel"
                          ? "Canceling..."
                          : "Cancel"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
