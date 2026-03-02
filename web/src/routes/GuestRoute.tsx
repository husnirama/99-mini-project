import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { Toaster } from "@/components/ui/sonner";

export default function GuestRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
