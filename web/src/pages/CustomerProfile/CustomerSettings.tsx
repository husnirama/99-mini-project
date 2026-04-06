import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { CustomerProfile } from "@/api/types";
import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";
import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
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

export default function CustomerSettings() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(emptyProfileForm);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>(emptyPasswordForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  function syncCustomerProfile(nextProfile: CustomerProfile) {
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
            profilePicture: nextProfile.profilePicture ?? null,
            referralCode: nextProfile.referralCode,
            referredBy: nextProfile.referredBy ?? null,
            createdAt: nextProfile.createdAt,
            updatedAt: nextProfile.updatedAt,
          }
        : state.user,
    }));
  }

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

        syncCustomerProfile(nextProfile);
      } catch (error: any) {
        if (isMounted) {
          setProfile(null);
          toast.error(
            error?.response?.data?.message || "We couldn't load your customer settings.",
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
      syncCustomerProfile(nextProfile);

      toast.success("Customer profile updated.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "We couldn't update your customer profile.",
      );
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleSavePassword() {
    setIsSavingPassword(true);

    try {
      await apiClient.patch(API_ENDPOINTS.CUSTOMERS.PASSWORD, passwordForm);
      setPasswordForm(emptyPasswordForm);
      toast.success("Password updated successfully.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "We couldn't update your password.",
      );
    } finally {
      setIsSavingPassword(false);
    }
  }

  async function handleUploadProfileImage(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      event.target.value = "";
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await apiClient.patch(
        API_ENDPOINTS.CUSTOMERS.PROFILE_IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const nextProfile = response.data.data as CustomerProfile;
      syncCustomerProfile(nextProfile);
      toast.success("Profile photo updated.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "We couldn't update your profile photo.",
      );
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  }

  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:flex-row lg:p-5">
        <SideNavigation />
        <main className="min-w-0 flex-1">
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              Loading customer settings...
            </div>
          ) : !profile ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              We couldn't load your settings right now.
            </div>
          ) : (
            <div className="space-y-6">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Customer Settings
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Manage your account
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Update the customer details used across your orders, profile, and account security.
                    </p>
                  </div>

                  <Link
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary sm:w-auto dark:border-slate-700 dark:text-slate-200"
                    to="/customer/profile"
                  >
                    Back to Profile
                  </Link>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        Account Details
                      </p>
                      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Profile Information
                      </h2>
                    </div>
                    <button
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      disabled={isSavingProfile}
                      onClick={handleSaveProfile}
                      type="button"
                    >
                      {isSavingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/30 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                        {profile.profilePicture ? (
                          <img
                            alt={profile.name}
                            className="h-full w-full object-cover"
                            src={profile.profilePicture}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-4xl text-slate-400">
                            account_circle
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Profile Photo
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Upload a square image for your customer account.
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto">
                      <input
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadProfileImage}
                        ref={imageInputRef}
                        type="file"
                      />
                      <button
                        className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:border-slate-700 dark:text-slate-200"
                        disabled={isUploadingImage}
                        onClick={() => imageInputRef.current?.click()}
                        type="button"
                      >
                        {isUploadingImage ? "Uploading..." : "Upload Photo"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Full Name
                      </span>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        disabled={isSavingProfile}
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
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Email Address
                      </span>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        disabled={isSavingProfile}
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
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Address
                      </span>
                      <textarea
                        className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        disabled={isSavingProfile}
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
                  <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      Account Summary
                    </p>
                    <div className="mt-5 space-y-4">
                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Referral Code
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                          {profile.referralCode}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Active Coupons
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                          {profile.stats.activeCoupons}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Available Points
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                          {profile.stats.availablePoints}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        Security
                      </p>
                      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Update Password
                      </h2>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary dark:border-slate-700 dark:bg-slate-950/40"
                        disabled={isSavingPassword}
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
                        disabled={isSavingPassword}
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
                        disabled={isSavingPassword}
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
                      <button
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
                        disabled={isSavingPassword}
                        onClick={handleSavePassword}
                        type="button"
                      >
                        {isSavingPassword ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </section>
                </article>
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
