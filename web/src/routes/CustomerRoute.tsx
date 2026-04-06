import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export default function AuthRoutes() {
  const { isReady, user } = useAuthStore();

  if (!isReady) {
    return null;
  }
  if (!user || !user.role) return <Navigate replace to="/auth/login" />;
  if (user.role !== "CUSTOMER") return <Navigate replace to="/auth/login" />;
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
