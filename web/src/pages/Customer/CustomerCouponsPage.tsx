import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { CustomerCoupon } from "@/api/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type CouponSummary = {
  referralCode?: string;
  referredBy?: string | null;
  activeCouponCount: number;
};

function getCouponTone(status: "ACTIVE" | "USED" | "EXPIRED") {
  if (status === "ACTIVE") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "USED") {
    return "border-slate-200 bg-slate-100 text-slate-600";
  }

  return "border-rose-200 bg-rose-50 text-rose-700";
}

function formatDiscount(coupon: CustomerCoupon) {
  if (coupon.discountType === "PERCENTAGE") {
    return `${coupon.discountAmount}%`;
  }

  return `Rp ${coupon.discountAmount.toLocaleString("id-ID")}`;
}

function getExpiryLabel(value: string) {
  const expiresAt = new Date(value);
  const remainingMs = expiresAt.getTime() - Date.now();

  if (remainingMs <= 0) {
    return "Expired";
  }

  const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
  return `${remainingDays} day${remainingDays === 1 ? "" : "s"} left`;
}

export default function CustomerCouponsPage() {
  const [coupons, setCoupons] = useState<CustomerCoupon[]>([]);
  const [summary, setSummary] = useState<CouponSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCoupons() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.COUPONS);
        const nextSummary = response.data.data.summary as CouponSummary;
        const nextCoupons = response.data.data.coupons as CustomerCoupon[];

        if (!isMounted) {
          return;
        }

        setSummary(nextSummary);
        setCoupons(nextCoupons);
      } catch (error: any) {
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "We couldn't load your coupons.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCoupons();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Customer Coupons
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Your reward coupons
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                This page reads your active user-owned reward coupons and shows
                their discount value and expiry window.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/customer/profile">Back to Profile</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Referral Code
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {summary?.referralCode || "-"}
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Referred By
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {summary?.referredBy || "No referral linked"}
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active Coupons
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {summary?.activeCouponCount ?? 0}
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:col-span-2 xl:col-span-3">
              Loading coupons...
            </div>
          ) : null}

          {!isLoading && coupons.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:col-span-2 xl:col-span-3">
              No coupons are available for this customer account right now.
            </div>
          ) : null}

          {coupons.map((coupon) => (
            <article
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              key={coupon.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {coupon.name || "Promotion Code"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {coupon.description}
                  </p>
                  {coupon.eventTitle ? (
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                      Event: {coupon.eventTitle}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${getCouponTone(
                    coupon.status,
                  )}`}
                >
                  {coupon.status}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Coupon Code
                </p>
                <p className="mt-3 text-xl font-bold tracking-[0.18em]">
                  {coupon.code}
                </p>
              </div>

                <div className="mt-5 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div>
                  <p>Discount</p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {formatDiscount(coupon)}
                  </p>
                </div>
                {coupon.maxDiscount ? (
                  <div>
                    <p>Max Discount</p>
                    <p className="mt-1 font-medium text-slate-900 dark:text-white">
                      Rp {coupon.maxDiscount.toLocaleString("id-ID")}
                    </p>
                  </div>
                ) : null}
                {coupon.minPurchase ? (
                  <div>
                    <p>Min Purchase</p>
                    <p className="mt-1 font-medium text-slate-900 dark:text-white">
                      Rp {coupon.minPurchase.toLocaleString("id-ID")}
                    </p>
                  </div>
                ) : null}
                <div>
                  <p>Expires</p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {new Date(coupon.expiresAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {getExpiryLabel(coupon.expiresAt)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
