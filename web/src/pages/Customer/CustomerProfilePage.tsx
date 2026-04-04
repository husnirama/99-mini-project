import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { CustomerProfile } from "@/api/types";
import { Button } from "@/components/ui/button";
import { patchPersistedAuthState, readPersistedAuthState } from "@/lib/auth-session";
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
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    name: "",
    email: "",
    address: "",
  });
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.PROFILE);
        const nextProfile = response.data.data as CustomerProfile;

        if (!isMounted) {
          return;
        }

        setProfile(nextProfile);
        setProfileForm({
          name: nextProfile.name,
          email: nextProfile.email,
          address: nextProfile.address ?? "",
        });
      } catch (error: any) {
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "We couldn't load your profile.",
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

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    try {
      const response = await apiClient.patch(API_ENDPOINTS.CUSTOMERS.PROFILE, {
        name: profileForm.name,
        email: profileForm.email,
        address: profileForm.address,
      });
      const nextProfile = response.data.data as CustomerProfile;

      setProfile(nextProfile);

      if (user) {
        const nextUser = {
          ...user,
          name: nextProfile.name,
          email: nextProfile.email,
          address: nextProfile.address ?? null,
          referralCode: nextProfile.referralCode,
          referredBy: nextProfile.referredBy ?? null,
        };

        useAuthStore.setState((state) => ({
          ...state,
          user: nextUser,
        }));

        patchPersistedAuthState({
          ...readPersistedAuthState(),
          user: nextUser,
        });
      }

      toast.success("Customer profile updated.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "We couldn't update your profile.",
      );
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleSavePassword() {
    setIsSavingPassword(true);

    try {
      await apiClient.patch(API_ENDPOINTS.CUSTOMERS.PASSWORD, passwordForm);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success("Password updated successfully.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "We couldn't update your password.",
      );
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-5xl">
                  account_circle
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Customer Profile
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {profile?.name || user?.name || "Customer"}
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Member since{" "}
                  {formatMembershipDate(profile?.createdAt ?? user?.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/customer/coupons">Open Coupons</Link>
              </Button>
              <Button disabled={isSavingProfile || isLoading} onClick={handleSaveProfile}>
                {isSavingProfile ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Account Details
            </p>

            <div className="mt-6 grid gap-5">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Full Name
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  value={profileForm.address}
                />
              </label>
            </div>
          </article>

          <article className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Referral
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-slate-500 dark:text-slate-400">Referral Code</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {profile?.referralCode || "-"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-slate-500 dark:text-slate-400">Referred By</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {profile?.referredBy || "No referral linked"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-slate-500 dark:text-slate-400">Referrer Account</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {profile?.referrer?.name || "Not available"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/30">
                  <p className="text-slate-500 dark:text-slate-400">Active Coupons</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {profile?.stats.activeCoupons ?? 0}
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/customer/coupons">View Coupon Page</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Change Password
              </p>
              <div className="mt-5 grid gap-4">
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      currentPassword: event.target.value,
                    }))
                  }
                  placeholder="Current password"
                  type="password"
                  value={passwordForm.currentPassword}
                />
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }))
                  }
                  placeholder="New password"
                  type="password"
                  value={passwordForm.newPassword}
                />
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      confirmNewPassword: event.target.value,
                    }))
                  }
                  placeholder="Confirm new password"
                  type="password"
                  value={passwordForm.confirmNewPassword}
                />
                <Button
                  disabled={isSavingPassword}
                  onClick={handleSavePassword}
                  type="button"
                >
                  {isSavingPassword ? "Saving..." : "Update Password"}
                </Button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
