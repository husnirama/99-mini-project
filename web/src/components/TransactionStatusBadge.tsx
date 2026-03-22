import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types/orderTransactionTypes";
import {
  formatTransactionStatusLabel,
  getTransactionStatusTone,
} from "@/utils/orderTransaction.utils";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export default function TransactionStatusBadge({
  status,
  className,
}: TransactionStatusBadgeProps) {
  const tone = getTransactionStatusTone(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
        tone.badgeClass,
        className,
      )}
    >
      {formatTransactionStatusLabel(status)}
    </span>
  );
}
