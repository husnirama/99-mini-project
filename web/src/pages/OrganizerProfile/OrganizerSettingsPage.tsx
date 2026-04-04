import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { OrganizerProfile } from "@/api/types";
import OrganizerMetricCard from "@/components/organizer/OrganizerMetricCard";
import OrganizerShell from "@/components/organizer/OrganizerShell";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type ProfileFormState = {
  name: string;
  email: string;
  address: string;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const emptyProfileForm: ProfileFormState = {
  name: "",
  email: "",
  address: "",
};

const emptyPasswordForm: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function formatMembershipDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function OrganizerSettingPage() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(emptyProfileForm);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>(emptyPasswordForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.ORGANIZER.PROFILE);
        const nextProfile = response.data.data as OrganizerProfile;

        if (!isMounted) {
          return;
        }

        setProfile(nextProfile);
        setProfileForm({
          name: nextProfile.name,
          email: nextProfile.email,
          address: nextProfile.address ?? "",
        });
      } catch (error) {
        console.error(error);
        toast.error("We couldn't load your organizer profile.");
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

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    try {
      const response = await apiClient.patch(API_ENDPOINTS.ORGANIZER.PROFILE, {
        name: profileForm.name,
        email: profileForm.email,
        address: profileForm.address,
      });

      const nextProfile = response.data.data as OrganizerProfile;

      setProfile(nextProfile);
      setProfileForm({
        name: nextProfile.name,
        email: nextProfile.email,
        address: nextProfile.address ?? "",
      });

      useAuthStore.setState((state) => ({
        ...state,
        user: state.user
          ? {
              ...state.user,
              name: nextProfile.name,
              email: nextProfile.email,
              address: nextProfile.address ?? null,
            }
          : state.user,
      }));

      toast.success("Organizer profile updated.");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "We couldn't update your organizer profile.",
      );
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleSavePassword() {
    setIsSavingPassword(true);

    try {
      await apiClient.patch(API_ENDPOINTS.ORGANIZER.PASSWORD, passwordForm);
      setPasswordForm(emptyPasswordForm);
      toast.success("Password updated successfully.");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "We couldn't update your password.",
      );
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <OrganizerShell
      title="Organizer Settings"
      description="Manage the organizer identity your attendees see and keep your account credentials secure."
      actions={
        <Link
          className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
          to="/organizer/dashboard"
        >
          Back to Dashboard
        </Link>
      }
    >
      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          Loading organizer profile...
        </div>
      ) : (
        <div className="space-y-8">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OrganizerMetricCard
              icon="event"
              label="Events"
              value={profile?.stats.totalEvents ?? 0}
            />
            <OrganizerMetricCard
              icon="receipt_long"
              label="Transactions"
              tone="amber"
              value={profile?.stats.totalTransactions ?? 0}
            />
            <OrganizerMetricCard
              icon="groups"
              label="Attendees"
              tone="emerald"
              value={profile?.stats.totalAttendees ?? 0}
            />
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Organizer Profile
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {profile?.name || "Organizer"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Member since {formatMembershipDate(profile?.createdAt)}
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {profile?.role === "EVENT_ORGANIZER"
                    ? "Organizer"
                    : profile?.role}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Full Name
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    type="text"
                    value={profileForm.name}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Email Address
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    type="email"
                    value={profileForm.email}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Address
                  </span>
                  <textarea
                    className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                    value={profileForm.address}
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/30">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Referral Code
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {profile?.referralCode || "-"}
                    </p>
                  </div>
                  <button
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                    onClick={() => {
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
                    }}
                    type="button"
                  >
                    Copy Code
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSavingProfile}
                    onClick={handleSaveProfile}
                    type="button"
                  >
                    {isSavingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </article>

            <article className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Security
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Update Password
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Current Password
                    </span>
                    <div className="relative">
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        onChange={(event) =>
                          setPasswordForm((current) => ({
                            ...current,
                            currentPassword: event.target.value,
                          }))
                        }
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                      />
                      <button
                        className="absolute inset-y-0 right-3 text-sm font-semibold text-slate-500 hover:text-primary"
                        onClick={() => setShowCurrentPassword((value) => !value)}
                        type="button"
                      >
                        {showCurrentPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      New Password
                    </span>
                    <div className="relative">
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        onChange={(event) =>
                          setPasswordForm((current) => ({
                            ...current,
                            newPassword: event.target.value,
                          }))
                        }
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                      />
                      <button
                        className="absolute inset-y-0 right-3 text-sm font-semibold text-slate-500 hover:text-primary"
                        onClick={() => setShowNewPassword((value) => !value)}
                        type="button"
                      >
                        {showNewPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Confirm Password
                    </span>
                    <div className="relative">
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        onChange={(event) =>
                          setPasswordForm((current) => ({
                            ...current,
                            confirmNewPassword: event.target.value,
                          }))
                        }
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmNewPassword}
                      />
                      <button
                        className="absolute inset-y-0 right-3 text-sm font-semibold text-slate-500 hover:text-primary"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        type="button"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  <button
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSavingPassword}
                    onClick={handleSavePassword}
                    type="button"
                  >
                    {isSavingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Need Help?
                </p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Visit the help center for organizer guidance, policy details,
                  and support contact information.
                </p>
                <Link
                  className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
                  to="/help"
                >
                  Open Help Center
                </Link>
              </section>
            </article>
          </section>
        </div>
      )}
    </OrganizerShell>
  );
}
