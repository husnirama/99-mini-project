import { API_ENDPOINTS } from "@/api/endpoint";
import { authClient, apiClient } from "@/api/clients";
import type { LoginCredentials, RegisterCredentials, User } from "@/api/types";
import {
  clearPersistedAuthState,
  getPersistedRefreshToken,
  readPersistedAuthState,
} from "@/lib/auth-session";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthSnapshot = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

const REGISTER_REFERRAL_POINTS = 10000;

interface AuthState extends AuthSnapshot {
  isReady: boolean;
  login: (data: LoginCredentials) => Promise<User>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hydrateAuth: () => Promise<void>;
  syncFromStorage: () => void;
}

const emptyAuthState: AuthSnapshot = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...emptyAuthState,
      isReady: false,

      login: async ({ email, password }) => {
        const response = await authClient.post(API_ENDPOINTS.AUTH.LOGIN, {
          email,
          password,
        });

        const nextUser = response.data.userInfo as User;
        const nextAccessToken = response.data.token as string;
        const nextRefreshToken = response.data.refreshToken as string;

        set({
          accessToken: nextAccessToken,
          refreshToken: nextRefreshToken,
          user: nextUser,
          isAuthenticated: true,
          isReady: true,
        });

        return nextUser;
      },

      register: async ({
        name,
        email,
        password,
        role,
        referralCode,
      }: RegisterCredentials) => {
        const normalizedReferralCode = referralCode?.trim();
        const response = await authClient.post(API_ENDPOINTS.AUTH.REGISTER, {
          name,
          email,
          password,
          role,
          ...(normalizedReferralCode
            ? { referralCode: normalizedReferralCode }
            : {}),
        });

        const createdUser = response.data.data as User | undefined;

        if (normalizedReferralCode && createdUser?.id) {
          await authClient.post(API_ENDPOINTS.POINTS.REGISTER, {
            userId: createdUser.id,
            points: REGISTER_REFERRAL_POINTS,
            source: "REFERRAL",
            referralCode: normalizedReferralCode,
          });
        }
      },

      logout: async () => {
        const refreshToken = getPersistedRefreshToken();

        try {
          if (refreshToken) {
            await authClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
          }
        } finally {
          clearPersistedAuthState();
          set({
            ...emptyAuthState,
            isReady: true,
          });
        }
      },

      hydrateAuth: async () => {
        const persistedState = readPersistedAuthState();

        if (!persistedState.accessToken && !persistedState.refreshToken) {
          set({
            ...emptyAuthState,
            isReady: true,
          });
          return;
        }

        try {
          const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
          const nextUser = response.data.user as User;
          const latestState = readPersistedAuthState();

          set({
            accessToken: latestState.accessToken ?? null,
            refreshToken: latestState.refreshToken ?? null,
            user: nextUser,
            isAuthenticated: true,
            isReady: true,
          });
        } catch {
          clearPersistedAuthState();
          set({
            ...emptyAuthState,
            isReady: true,
          });
        }
      },

      syncFromStorage: () => {
        const persistedState = readPersistedAuthState();

        set({
          accessToken: persistedState.accessToken ?? null,
          refreshToken: persistedState.refreshToken ?? null,
          user: persistedState.user ?? null,
          isAuthenticated: Boolean(
            persistedState.isAuthenticated && persistedState.refreshToken,
          ),
          isReady: true,
        });
      },
    }),
    { name: "auth-store" },
  ),
);
