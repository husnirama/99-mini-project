import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import type { EventDashboard } from "@/types/eventSummaryTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useOrganizerDashboard() {
  const [dashboard, setDashboard] = useState<EventDashboard>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboard() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(API_ENDPOINTS.ORGANIZER.DASHBOARD);

        if (!isMounted) {
          return;
        }

        setDashboard(response.data.data as EventDashboard);
      } catch (error) {
        console.error(error);
        toast.error("We couldn't load your organizer dashboard.");

        if (isMounted) {
          setDashboard(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    dashboard,
    isLoading,
  };
}
