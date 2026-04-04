import {
  AUTH_SESSION_CLEARED_EVENT,
  AUTH_SESSION_UPDATED_EVENT,
} from "@/lib/auth-session";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import type { ReactNode } from "react";

type AuthBootstrapProps = {
  children: ReactNode;
};

export default function AuthBootstrap({ children }: AuthBootstrapProps) {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const syncFromStorage = useAuthStore((state) => state.syncFromStorage);
  const isReady = useAuthStore((state) => state.isReady);

  useEffect(() => {
    hydrateAuth();

    const handleSessionSync = () => {
      syncFromStorage();
    };

    window.addEventListener(AUTH_SESSION_UPDATED_EVENT, handleSessionSync);
    window.addEventListener(AUTH_SESSION_CLEARED_EVENT, handleSessionSync);

    return () => {
      window.removeEventListener(
        AUTH_SESSION_UPDATED_EVENT,
        handleSessionSync,
      );
      window.removeEventListener(
        AUTH_SESSION_CLEARED_EVENT,
        handleSessionSync,
      );
    };
  }, [hydrateAuth, syncFromStorage]);

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 text-sm font-medium text-slate-500 dark:bg-slate-950 dark:text-slate-300">
        Restoring your session...
      </main>
    );
  }

  return <>{children}</>;
}
