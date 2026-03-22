import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import TransactionStatusBadge from "@/components/TransactionStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransactionStore } from "@/store/transaction-store";
import type { TransactionRecord } from "@/types/orderTransactionTypes";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import {
  canCancelTransaction,
  canUploadPaymentProof,
  formatCurrency,
  formatOrderStatusLabel,
  formatPaymentMethod,
  getActiveExpiry,
  getAdminReviewExpiry,
  getCountdownParts,
  getEffectiveOrderStatus,
  getEffectiveTransactionStatus,
  getPaymentExpiry,
  getTransactionStatusTone,
} from "@/utils/orderTransaction.utils";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function formatDateTime(value?: string | null) {
  if (!value) {
    return "-";
  }

  return `${formatDate(value)} · ${formatTime(value)} WIB`;
}

export default function PaymentDetailPage() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const parsedTransactionId = Number(transactionId);
  const record = useTransactionStore(
    (state) =>
      (Number.isFinite(parsedTransactionId)
        ? state.records[parsedTransactionId]
        : null) ?? null,
  );
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const updateRecord = useTransactionStore((state) => state.updateRecord);

  const [now, setNow] = useState(Date.now());
  const [selectedProofFile, setSelectedProofFile] = useState<File | null>(null);
  const [selectedProofPreview, setSelectedProofPreview] = useState<string | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!record) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [record]);

  useEffect(() => {
    if (!selectedProofFile) {
      setSelectedProofPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedProofFile);
    setSelectedProofPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedProofFile]);

  useEffect(() => {
    if (!record) {
      return;
    }

    const effectiveStatus = getEffectiveTransactionStatus(record, now);

    if (effectiveStatus === "EXPIRED" && record.transaction.status !== "EXPIRED") {
      updateRecord(record.transaction.id, (current) => ({
        ...current,
        order: {
          ...current.order,
          status: "EXPIRED",
        },
        transaction: {
          ...current.transaction,
          status: "EXPIRED",
        },
      }));
    }
  }, [now, record, updateRecord]);

  const effectiveTransactionStatus = useMemo(() => {
    if (!record) {
      return null;
    }

    return getEffectiveTransactionStatus(record, now);
  }, [now, record]);

  const effectiveOrderStatus = useMemo(() => {
    if (!record) {
      return null;
    }

    return getEffectiveOrderStatus(record, now);
  }, [now, record]);

  const activeExpiry = useMemo(() => {
    if (!record) {
      return null;
    }

    return getActiveExpiry(record);
  }, [record]);

  const paymentExpiry = useMemo(() => {
    if (!record) {
      return null;
    }

    return getPaymentExpiry(record);
  }, [record]);

  const adminReviewExpiry = useMemo(() => {
    if (!record) {
      return null;
    }

    return getAdminReviewExpiry(record);
  }, [record]);

  const countdown = useMemo(
    () => getCountdownParts(activeExpiry, now),
    [activeExpiry, now],
  );

  const tone = effectiveTransactionStatus
    ? getTransactionStatusTone(effectiveTransactionStatus)
    : null;

  const proofPreviewUrl =
    selectedProofPreview || record?.transaction.paymentProof || null;

  async function handleUploadPaymentProof() {
    if (!record || !selectedProofFile) {
      toast.error("Please choose an image before uploading.");
      return;
    }

    if (!canUploadPaymentProof(effectiveTransactionStatus!)) {
      toast.error("This transaction is no longer accepting payment proof.");
      return;
    }

    const formData = new FormData();
    formData.append("paymentProof", selectedProofFile);

    setIsUploading(true);

    try {
      const response = await apiClient.patch(
        API_ENDPOINTS.TRANSACTIONS.UPLOAD_PAYMENT_PROOF(record.transaction.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(record.guestToken ? { "x-guest-token": record.guestToken } : {}),
          },
        },
      );

      updateTransaction(record.transaction.id, response.data.data as TransactionRecord);
      setSelectedProofFile(null);
      toast.success("Payment proof uploaded successfully.");
    } catch (error: any) {
      console.error("Failed to upload payment proof", error);
      toast.error(
        error?.response?.data?.message || "We couldn't upload your payment proof.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleCancelTransaction() {
    if (!record || !canCancelTransaction(effectiveTransactionStatus!)) {
      toast.error("This transaction can no longer be canceled.");
      return;
    }

    setIsCancelling(true);

    try {
      const response = await apiClient.patch(
        API_ENDPOINTS.TRANSACTIONS.CANCEL(record.transaction.id),
        {},
        {
          headers: record.guestToken
            ? { "x-guest-token": record.guestToken }
            : undefined,
        },
      );

      updateTransaction(record.transaction.id, response.data.data as TransactionRecord);
      toast.success("Transaction canceled.");
    } catch (error: any) {
      console.error("Failed to cancel transaction", error);
      toast.error(
        error?.response?.data?.message || "We couldn't cancel this transaction.",
      );
    } finally {
      setIsCancelling(false);
    }
  }

  if (!record || !effectiveTransactionStatus || !effectiveOrderStatus || !tone) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          We couldn't find this transaction in the current browser session.
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="font-semibold text-primary hover:underline" to="/transactions/history">
              Open saved transactions
            </Link>
            <button
              className="font-semibold text-slate-700 hover:underline dark:text-slate-300"
              onClick={() => navigate("/")}
              type="button"
            >
              Back to events
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Payment Detail
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transaction #{record.transaction.id}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Order #{record.order.id} for {record.event.title}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
            to="/transactions/history"
          >
            Saved transactions
          </Link>
          <TransactionStatusBadge status={effectiveTransactionStatus} />
        </div>
      </div>

      <div className={`mb-8 rounded-2xl p-6 shadow-sm ${tone.panelClass}`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">
              {effectiveTransactionStatus === "WAITING_FOR_PAYMENT"
                ? "Upload your payment proof"
                : effectiveTransactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION"
                  ? "Payment proof received"
                  : effectiveTransactionStatus === "DONE"
                    ? "Payment completed"
                    : effectiveTransactionStatus === "REJECTED"
                      ? "Payment proof rejected"
                      : effectiveTransactionStatus === "CANCELED"
                        ? "Transaction canceled"
                        : "Payment window expired"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed">{tone.description}</p>
            {effectiveTransactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION" &&
            adminReviewExpiry ? (
              <p className="mt-3 text-sm font-medium">
                Admin review expires on {formatDateTime(adminReviewExpiry)}.
              </p>
            ) : null}
            {effectiveTransactionStatus === "WAITING_FOR_PAYMENT" && paymentExpiry ? (
              <p className="mt-3 text-sm font-medium">
                Payment proof must be uploaded by {formatDateTime(paymentExpiry)}.
              </p>
            ) : null}
          </div>

          {countdown &&
          (effectiveTransactionStatus === "WAITING_FOR_PAYMENT" ||
            effectiveTransactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION") ? (
            <div className="grid grid-cols-4 gap-3 self-start">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((item) => (
                <div
                  className="min-w-20 rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-center shadow-sm dark:border-white/10 dark:bg-slate-950/20"
                  key={item.label}
                >
                  <p className="text-2xl font-bold">{String(item.value).padStart(2, "0")}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row">
              <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 sm:w-56">
                <img
                  alt={record.event.title}
                  className="h-full w-full object-cover"
                  src={record.event.image || "https://via.placeholder.com/800x500?text=Event"}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {record.event.title}
                </h3>
                <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-primary">
                      confirmation_number
                    </span>
                    <span>
                      {record.ticket.name} · {record.order.quantity} ticket
                      {record.order.quantity > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-primary">
                      calendar_month
                    </span>
                    <span>
                      {formatDate(record.event.eventDateStart)} · {formatTime(record.event.eventDateStart)} -{" "}
                      {formatTime(record.event.eventDateEnd)} WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-primary">
                      location_on
                    </span>
                    <span>{record.event.locationLabel}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {record.event.category ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {record.event.category}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    {formatOrderStatusLabel(record.order.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold text-center">Qty</th>
                    <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {record.ticket.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Unit price {formatCurrency(record.order.unitPrice)}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-medium">
                      {record.order.quantity}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(record.order.subTotalAmount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">
                      Discount
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500">-</td>
                    <td className="px-4 py-4 text-right font-medium text-slate-900 dark:text-white">
                      {formatCurrency(record.order.discountAmount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">
                      Total
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500">-</td>
                    <td className="px-4 py-4 text-right font-bold text-primary">
                      {formatCurrency(record.order.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Payment Proof
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Only image uploads are supported for this transaction.
                </p>
              </div>

              {record.transaction.paymentProof ? (
                <div className="flex flex-wrap gap-3">
                  <a
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    href={record.transaction.paymentProof}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open proof
                  </a>
                  <a
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    download
                    href={record.transaction.paymentProof}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Download proof
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/20">
                {proofPreviewUrl ? (
                  <img
                    alt="Payment proof preview"
                    className="h-full max-h-[420px] w-full object-cover"
                    src={proofPreviewUrl}
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 px-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      image
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        No payment proof uploaded yet
                      </p>
                      <p className="mt-1">
                        Select an image when the transaction is still waiting for
                        payment.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {canUploadPaymentProof(effectiveTransactionStatus) ? (
                  <>
                    <label
                      className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-900/30"
                      htmlFor="payment-proof"
                    >
                      <span className="material-symbols-outlined text-4xl text-primary">
                        upload
                      </span>
                      <span className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                        Choose payment proof image
                      </span>
                      <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        JPG, PNG, or WEBP
                      </span>
                    </label>
                    <Input
                      accept="image/*"
                      className="hidden"
                      id="payment-proof"
                      onChange={(event) =>
                        setSelectedProofFile(event.target.files?.[0] ?? null)
                      }
                      type="file"
                    />

                    <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-xs text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Payment method
                      </p>
                      <p className="mt-1">{formatPaymentMethod(record.transaction.paymentMethod)}</p>
                      <p className="mt-3">
                        The transaction will move to waiting for admin confirmation as
                        soon as the proof upload succeeds.
                      </p>
                    </div>

                    <Button
                      className="h-11 w-full rounded-lg text-sm font-bold shadow-lg shadow-primary/20"
                      disabled={!selectedProofFile || isUploading}
                      onClick={handleUploadPaymentProof}
                      type="button"
                    >
                      {isUploading ? "Uploading..." : "Upload payment proof"}
                    </Button>
                  </>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Upload is locked
                    </p>
                    <p className="mt-2">
                      {effectiveTransactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION"
                        ? "The payment proof has already been uploaded and is waiting for organizer review."
                        : effectiveTransactionStatus === "DONE"
                          ? "This transaction is complete."
                          : effectiveTransactionStatus === "REJECTED"
                            ? "This proof was rejected. Retry is not enabled by the current backend flow."
                            : effectiveTransactionStatus === "CANCELED"
                              ? "Canceled transactions cannot receive new payment proof."
                              : "Expired transactions cannot receive new payment proof."}
                    </p>
                    {record.transaction.rejectedReason ? (
                      <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                        Rejection note: {record.transaction.rejectedReason}
                      </p>
                    ) : null}
                  </div>
                )}

                {canCancelTransaction(effectiveTransactionStatus) ? (
                  <Button
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-200"
                    disabled={isCancelling}
                    onClick={handleCancelTransaction}
                    type="button"
                    variant="outline"
                  >
                    {isCancelling ? "Canceling..." : "Cancel transaction"}
                  </Button>
                ) : null}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Transaction Summary
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Order status</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {formatOrderStatusLabel(effectiveOrderStatus)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Payment method</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {formatPaymentMethod(record.transaction.paymentMethod)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Created</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {formatDateTime(record.transaction.createdAt || record.order.createdAt)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Payment expires</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {paymentExpiry ? formatDateTime(paymentExpiry) : "-"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Admin review expires</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {adminReviewExpiry ? formatDateTime(adminReviewExpiry) : "-"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Buyer</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {record.order.buyerName}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Buyer email</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {record.order.buyerEmail}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Buyer phone</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {record.order.buyerPhone}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">Voucher</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {record.order.voucherCode || "-"}
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-dashed border-slate-200 pt-5 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  Total payment
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(record.order.totalAmount)}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Status guide
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Waiting for payment means you can still upload proof. Waiting for
                  admin confirmation means the proof is already submitted and under
                  review. Final states lock the next actions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
