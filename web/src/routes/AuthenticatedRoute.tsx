import { Toaster } from "@/components/ui/sonner";
import { buildAuthRedirectPath } from "@/lib/auth-redirect";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthenticatedRoute() {
  const { isAuthenticated, isReady } = useAuthStore();
  const location = useLocation();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    const redirectPath = `${location.pathname}${location.search}${location.hash}`;

    return <Navigate replace to={buildAuthRedirectPath(redirectPath)} />;
  }

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
