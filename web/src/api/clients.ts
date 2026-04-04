import axios from "axios";
import { API_ENDPOINTS } from "@/api/endpoint";
import {
  clearPersistedAuthState,
  getPersistedAccessToken,
  getPersistedRefreshToken,
  patchPersistedAuthState,
} from "@/lib/auth-session";

const API_BASE_URL = "http://localhost:8081/api";

type RetriableRequestConfig = {
  _retry?: boolean;
};

export const authClient = axios.create({
  baseURL: API_BASE_URL,
});

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getPersistedRefreshToken();

  if (!refreshToken) {
    return null;
  }

  refreshPromise = (async () => {
    try {
      const response = await authClient.post(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      });

      const nextAccessToken = response.data.token as string | undefined;
      const nextRefreshToken = response.data.refreshToken as string | undefined;

      if (!nextAccessToken || !nextRefreshToken) {
        clearPersistedAuthState();
        return null;
      }

      patchPersistedAuthState({
        accessToken: nextAccessToken,
        refreshToken: nextRefreshToken,
        isAuthenticated: true,
      });

      return nextAccessToken;
    } catch {
      clearPersistedAuthState();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
  const accessToken = getPersistedAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (typeof error.config & RetriableRequestConfig)
      | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (
      originalRequest._retry ||
      typeof originalRequest.url !== "string" ||
      originalRequest.url.includes(API_ENDPOINTS.AUTH.REFRESH)
    ) {
      return Promise.reject(error);
    }

    const nextAccessToken = await refreshAccessToken();

    if (!nextAccessToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

    return apiClient(originalRequest);
  },
);
