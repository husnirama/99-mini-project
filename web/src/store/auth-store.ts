import { apiClient } from "@/api/clients";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { LoginCredentials, RegisterCredentials, User } from "@/api/types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (data: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      return {
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,

        login: async ({
          email,
          password,
        }: {
          email: string;
          password: string;
        }) => {
          const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
            email,
            password,
          });
          // console.log(data);

          set({
            accessToken: data.token,
            refreshToken: data.refreshToken,
            user: data.userInfo,
            isAuthenticated: true,
          });
        },
        register: async ({
          name,
          email,
          password,
          role,
          referralCode,
        }: {
          name: string;
          email: string;
          password: string;
          role: string;
          referralCode?: string;
        }) => {
          const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
            name,
            email,
            password,
            role,
            ...(referralCode && { referralCode }),
          });
          console.log("Registered user:", data);
        },
        logout: async () => {
          const { refreshToken } = useAuthStore.getState();
          if (refreshToken) {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
              refreshToken,
            });
          }
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });
        },
      };
    },
    { name: "auth-store" },
  ),
);
