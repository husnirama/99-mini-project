import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { CustomerProfile } from "@/api/types";
import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatMembershipDate(value?: string) {
  if (!value) {
    return "Recently joined";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.PROFILE);

        if (!isMounted) {
          return;
        }

        setProfile(response.data.data as CustomerProfile);
      } catch (error: any) {
        if (isMounted) {
          setProfile(null);
          toast.error(
            error?.response?.data?.message || "We couldn't load your customer profile.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleCopyReferralCode() {
    if (!profile?.referralCode) {
      return;
    }

    if (!navigator.clipboard) {
      toast.error("Clipboard access is not available here.");
      return;
    }

    navigator.clipboard
      .writeText(profile.referralCode)
      .then(() => toast.success("Referral code copied."));
  }

  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:flex-row lg:p-5">
        <SideNavigation />
        <main className="min-w-0 flex-1">
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              Loading customer profile...
            </div>
          ) : !profile ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              We couldn't load your profile right now.
            </div>
          ) : (
            <div className="space-y-6">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-5xl">
                        account_circle
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Customer Profile
                      </p>
                      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {profile.name}
                      </h1>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Member since {formatMembershipDate(profile.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary sm:w-auto dark:border-slate-700 dark:text-slate-200"
                      to="/customer/dashboard"
                    >
                      View Tickets
                    </Link>
                    <Link
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 sm:w-auto"
                      to="/customer/settings"
                    >
                      Open Settings
                    </Link>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Total Orders
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile.stats.totalOrders}
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Completed Orders
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile.stats.completedOrders}
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Available Points
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile.stats.availablePoints}
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Active Coupons
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile.stats.activeCoupons}
                  </p>
                </article>
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Account Details
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Full Name
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                        {profile.name}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Email Address
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                        {profile.email}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Address
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                        {profile.address || "No address saved yet."}
                      </p>
                    </div>
                  </div>
                </article>

                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Referral & Rewards
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Referral Code
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                        {profile.referralCode}
                      </p>
                      <button
                        className="mt-4 text-sm font-semibold text-primary hover:underline"
                        onClick={handleCopyReferralCode}
                        type="button"
                      >
                        Copy Code
                      </button>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Referred By
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                        {profile.referrer?.name || profile.referredBy || "No referral linked"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary sm:flex-1 dark:border-slate-700 dark:text-slate-200"
                        to="/customer/points"
                      >
                        Open Rewards
                      </Link>
                      <Link
                        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-black sm:flex-1 dark:bg-white dark:text-slate-950"
                        to="/customer/settings"
                      >
                        Manage Account
                      </Link>
                    </div>
                  </div>
                </article>
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
