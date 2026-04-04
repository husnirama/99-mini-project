import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { Toaster } from "@/components/ui/sonner";

export default function GuestRoute() {
  const { isAuthenticated, isReady } = useAuthStore();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) return <Navigate replace to="/" />;

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
