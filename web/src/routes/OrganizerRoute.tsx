import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export default function OrganizerRoute() {
  const { user } = useAuthStore();

  if (!user || !user.role) return <Navigate to="/auth/login" />;

  if (user.role !== "EVENT_ORGANIZER")
    return <Navigate to="/organizer/create-event" />;

  return;
  <>
    <Toaster />
    <Outlet />
  </>;
}
