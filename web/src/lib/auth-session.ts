import type { User } from "@/api/types";

export const AUTH_STORAGE_KEY = "auth-store";
export const AUTH_SESSION_UPDATED_EVENT = "auth-session-updated";
export const AUTH_SESSION_CLEARED_EVENT = "auth-session-cleared";

type PersistedAuthState = {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: User | null;
  isAuthenticated?: boolean;
  isReady?: boolean;
};

type PersistedAuthStore = {
  state?: PersistedAuthState;
  version?: number;
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function dispatchSessionEvent(eventName: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(eventName));
}

function readPersistedStore(): PersistedAuthStore {
  if (!canUseStorage()) {
    return {};
  }

  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue) as PersistedAuthStore;
    return parsedValue ?? {};
  } catch {
    return {};
  }
}

export function readPersistedAuthState(): PersistedAuthState {
  return readPersistedStore().state ?? {};
}

export function patchPersistedAuthState(nextState: PersistedAuthState) {
  if (!canUseStorage()) {
    return;
  }

  const persistedStore = readPersistedStore();
  const mergedState = {
    ...persistedStore.state,
    ...nextState,
  };

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      state: mergedState,
      version: persistedStore.version ?? 0,
    }),
  );

  dispatchSessionEvent(AUTH_SESSION_UPDATED_EVENT);
}

export function clearPersistedAuthState() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  dispatchSessionEvent(AUTH_SESSION_CLEARED_EVENT);
}

export function getPersistedAccessToken() {
  return readPersistedAuthState().accessToken ?? null;
}

export function getPersistedRefreshToken() {
  return readPersistedAuthState().refreshToken ?? null;
}
