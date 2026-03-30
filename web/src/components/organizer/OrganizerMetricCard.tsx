import type { ReactNode } from "react";

type OrganizerMetricCardProps = {
  label: string;
  value: ReactNode;
  icon: string;
  tone?: "primary" | "emerald" | "amber";
  helperText?: string;
};

const toneClassMap = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
};

export default function OrganizerMetricCard({
  label,
  value,
  icon,
  tone = "primary",
  helperText,
}: OrganizerMetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClassMap[tone]}`}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>

      {helperText ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </article>
  );
}
