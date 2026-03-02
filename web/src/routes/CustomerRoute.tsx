import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export default function AuthRoutes() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/" />;
  return;
  <>
    <Toaster />
    <Outlet />
  </>;
}
