import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { OrganizerProfile } from "@/api/types";
import OrganizerMetricCard from "@/components/organizer/OrganizerMetricCard";
import OrganizerShell from "@/components/organizer/OrganizerShell";
import { getOrganizerSettingsPath } from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatMembershipDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function OrganizerProfilePage() {
  const organizerId = useAuthStore((state) => state.user?.id);
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.ORGANIZER.PROFILE);

        if (!isMounted) {
          return;
        }

        setProfile(response.data.data as OrganizerProfile);
      } catch (error: any) {
        if (isMounted) {
          setProfile(null);
          toast.error(
            error?.response?.data?.message || "We couldn't load your organizer profile.",
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
    <OrganizerShell
      title="Organizer Profile"
      description="Review the organizer account details currently connected to your events and public organizer identity."
      actions={
        organizerId ? (
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            to={getOrganizerSettingsPath(organizerId)}
          >
            Edit Settings
          </Link>
        ) : null
      }
    >
      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          Loading organizer profile...
        </div>
      ) : !profile ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          We couldn't load your organizer profile right now.
        </div>
      ) : (
        <div className="space-y-8">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OrganizerMetricCard
              icon="event"
              label="Events"
              value={profile.stats.totalEvents}
            />
            <OrganizerMetricCard
              icon="receipt_long"
              label="Transactions"
              tone="amber"
              value={profile.stats.totalTransactions}
            />
            <OrganizerMetricCard
              icon="groups"
              label="Attendees"
              tone="emerald"
              value={profile.stats.totalAttendees}
            />
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Organizer Details
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Member since {formatMembershipDate(profile.createdAt)}
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Organizer
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Email Address
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {profile.email}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Referral Code
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {profile.referralCode}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/30 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Address
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {profile.address || "No address saved yet."}
                  </p>
                </div>
              </div>
            </article>

            <article className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Quick Actions
                </p>
                <div className="mt-5 space-y-3">
                  <button
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                    onClick={handleCopyReferralCode}
                    type="button"
                  >
                    Copy Referral Code
                  </button>
                  <Link
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                    to={getOrganizerSettingsPath(organizerId)}
                  >
                    Open Settings
                  </Link>
                  <Link
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                    to="/organizer/dashboard"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Organizer Summary
                </p>
                <div className="mt-5 space-y-4 text-sm">
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/30">
                    <p className="text-slate-500 dark:text-slate-400">Referral Source</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {profile.referredBy || "No referral linked"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/30">
                    <p className="text-slate-500 dark:text-slate-400">Published Identity</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {profile.name}
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </section>
        </div>
      )}
    </OrganizerShell>
  );
}
