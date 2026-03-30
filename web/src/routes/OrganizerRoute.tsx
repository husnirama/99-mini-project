import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export default function OrganizerRoute() {
  const { isReady, user } = useAuthStore();

  if (!isReady) {
    return null;
  }

  if (!user || !user.role) return <Navigate replace to="/auth/login" />;

  if (user.role !== "EVENT_ORGANIZER") return <Navigate replace to="/" />;

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
