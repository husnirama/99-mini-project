import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { Toaster } from "@/components/ui/sonner";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { useSearchParams } from "react-router";

export default function GuestRoute() {
  const { isAuthenticated, isReady, user } = useAuthStore();
  const [searchParams] = useSearchParams();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    const fallbackPath =
      user?.role === "EVENT_ORGANIZER" ? "/organizer/dashboard" : "/";

    return (
      <Navigate
        replace
        to={getSafeRedirectPath(searchParams.get("redirect"), fallbackPath)}
      />
    );
  }

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
