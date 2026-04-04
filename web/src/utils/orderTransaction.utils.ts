import type { EventDetail } from "@/types/eventDetailTypes";
import type { TicketType } from "@/types/eventListTypes";
import type {
  NormalizedOrderStatus,
  OrderStatus,
  PaymentMethod,
  TransactionLifecycleRecord,
  TransactionStatus,
} from "@/types/orderTransactionTypes";
import { formatPrice } from "./eventList.utils";

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

export function formatCurrency(amount: number) {
  return `IDR ${formatPrice(amount)}`;
}

export function formatPaymentMethod(paymentMethod: PaymentMethod) {
  if (paymentMethod === "BANK_TRANSFER") {
    return "Bank Transfer";
  }

  return "Card";
}

export function normalizeOrderStatus(status: OrderStatus): NormalizedOrderStatus {
  if (status === "COMPLETED" || status === "DONE") {
    return "DONE";
  }

  return status;
}

export function formatOrderStatusLabel(status: OrderStatus) {
  return normalizeOrderStatus(status)
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function formatTransactionStatusLabel(status: TransactionStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function getTransactionStatusTone(status: TransactionStatus) {
  if (status === "WAITING_FOR_PAYMENT") {
    return {
      badgeClass:
        "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300",
      panelClass:
        "border border-blue-200 bg-blue-50/80 text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-100",
      description: "Upload your payment proof before the deadline to keep this order active.",
    };
  }

  if (status === "WAITING_FOR_ADMIN_CONFIRMATION") {
    return {
      badgeClass:
        "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300",
      panelClass:
        "border border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100",
      description: "Your payment proof has been uploaded and is waiting for organizer review.",
    };
  }

  if (status === "DONE") {
    return {
      badgeClass:
        "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300",
      panelClass:
        "border border-emerald-200 bg-emerald-50/80 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100",
      description: "Payment has been approved and the transaction is complete.",
    };
  }

  if (status === "REJECTED") {
    return {
      badgeClass:
        "border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300",
      panelClass:
        "border border-rose-200 bg-rose-50/80 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-100",
      description: "The uploaded payment proof was rejected.",
    };
  }

  if (status === "CANCELED") {
    return {
      badgeClass:
        "border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300",
      panelClass:
        "border border-slate-200 bg-slate-100/80 text-slate-900 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-100",
      description: "This transaction was canceled and can no longer be changed.",
    };
  }

  return {
    badgeClass:
      "border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300",
    panelClass:
      "border border-slate-200 bg-slate-100/80 text-slate-900 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-100",
    description: "The payment window is over and this transaction has expired.",
  };
}

export function canUploadPaymentProof(status: TransactionStatus) {
  return status === "WAITING_FOR_PAYMENT";
}

export function canCancelTransaction(status: TransactionStatus) {
  return (
    status === "WAITING_FOR_PAYMENT" ||
    status === "WAITING_FOR_ADMIN_CONFIRMATION"
  );
}

export function canReviewTransaction(status: TransactionStatus) {
  return status === "WAITING_FOR_ADMIN_CONFIRMATION";
}

export function isFinalTransactionStatus(status: TransactionStatus) {
  return (
    status === "DONE" ||
    status === "REJECTED" ||
    status === "EXPIRED" ||
    status === "CANCELED"
  );
}

export function getTicketPrice(ticket: TicketType) {
  if (typeof ticket.price === "number") {
    return ticket.price;
  }

  const normalized = Number(String(ticket.price).replace(/[^\d.-]/g, ""));
  return Number.isFinite(normalized) ? normalized : 0;
}

export function getEventLocationLabel(event: EventDetail) {
  const venue = event.venue?.[0];
  if (!venue) {
    return "Venue TBA";
  }

  return [venue.name, venue.city, venue.region, venue.country]
    .filter(Boolean)
    .join(", ");
}

export function getEventImageUrl(event: EventDetail) {
  return (
    event.eventImage?.[0]?.imageURL ??
    event.image ??
    "https://via.placeholder.com/1200x700?text=Event"
  );
}

export function getPaymentExpiry(record: TransactionLifecycleRecord) {
  return record.order.expiresAt ?? null;
}

export function getAdminReviewExpiry(record: TransactionLifecycleRecord) {
  if (record.transaction.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
    return null;
  }

  const anchor = record.transaction.updatedAt ?? record.transaction.createdAt;

  if (!anchor) {
    return null;
  }

  return new Date(new Date(anchor).getTime() + THREE_DAYS_IN_MS).toISOString();
}

export function getActiveExpiry(record: TransactionLifecycleRecord) {
  if (record.transaction.status === "WAITING_FOR_PAYMENT") {
    return getPaymentExpiry(record);
  }

  if (record.transaction.status === "WAITING_FOR_ADMIN_CONFIRMATION") {
    return getAdminReviewExpiry(record);
  }

  return null;
}

export function getEffectiveTransactionStatus(
  record: TransactionLifecycleRecord,
  now: number = Date.now(),
): TransactionStatus {
  const expiry = getActiveExpiry(record);
  if (
    expiry &&
    (record.transaction.status === "WAITING_FOR_PAYMENT" ||
      record.transaction.status === "WAITING_FOR_ADMIN_CONFIRMATION") &&
    new Date(expiry).getTime() <= now
  ) {
    return "EXPIRED";
  }

  return record.transaction.status;
}

export function getEffectiveOrderStatus(
  record: TransactionLifecycleRecord,
  now: number = Date.now(),
): NormalizedOrderStatus {
  const normalized = normalizeOrderStatus(record.order.status);
  const effectiveTransactionStatus = getEffectiveTransactionStatus(record, now);

  if (normalized === "PENDING") {
    if (effectiveTransactionStatus === "DONE") return "DONE";
    if (effectiveTransactionStatus === "REJECTED") return "REJECTED";
    if (effectiveTransactionStatus === "EXPIRED") return "EXPIRED";
    if (effectiveTransactionStatus === "CANCELED") return "CANCELED";
  }

  return normalized;
}

export function getCountdownParts(targetDate?: string | null, now: number = Date.now()) {
  if (!targetDate) {
    return null;
  }

  const diff = new Date(targetDate).getTime() - now;
  const safeDiff = Math.max(0, diff);
  const totalSeconds = Math.floor(safeDiff / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs: safeDiff,
    isExpired: diff <= 0,
    days,
    hours,
    minutes,
    seconds,
  };
}
