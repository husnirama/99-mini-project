import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PointsHistoryItem = {
  id: number;
  userId: number;
  points: number;
  discount: number | null;
  source: string;
  createdAt: string;
  updatedAt: string | null;
  expiresAt: string;
  deletedAt: string | null;
};

type PointsData = {
  totalPoints: {
    _sum: {
      points: number | null;
    };
    _max: {
      expiresAt: string | null;
    };
  } | null;
  pointsHistory: PointsHistoryItem[];
  referralCode: string | null;
};

function formatDateLabel(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getPointsStatus(item: PointsHistoryItem) {
  if (item.source === "PURCHASE" && item.points < 0) {
    return item.deletedAt ? "Restored" : "Used";
  }

  if (item.deletedAt) {
    return "Expired";
  }

  if (new Date(item.expiresAt).getTime() < Date.now()) {
    return "Expired";
  }

  return "Active";
}

function getPointsStatusClass(status: string) {
  if (status === "Expired") {
    return "bg-rose-100 text-rose-700";
  }

  if (status === "Used") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Restored") {
    return "bg-sky-100 text-sky-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function formatPointsSource(source: string) {
  return source
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatPointsAmount(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

export default function CustomerPoints() {
  const [points, setPoints] = useState<PointsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPoints() {
      setIsLoading(true);
      // setErrorMessage(null);

      try {
        const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.POINTS);

        if (!isMounted) {
          return;
        }

        setPoints(response.data.data as PointsData);
      } catch (error) {
        console.error("Failed to fetch points:", error);
        if (isMounted) {
          setPoints(null);
          setErrorMessage("We couldn't load your points right now.");
        }
        toast.error("Failed to load your points. Please try again later.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPoints();

    return () => {
      isMounted = false;
    };
  }, []);

  const expiresAt = points?.totalPoints?._max.expiresAt;
  const totalPoints = points?.totalPoints?._sum.points ?? 0;
  const pointsHistory = points?.pointsHistory ?? [];
  const referralHistory = pointsHistory.filter(
    (item) => item.source === "REFERRAL",
  );
  const referralPoints = referralHistory.reduce(
    (sum, item) => sum + (item.deletedAt ? 0 : item.points),
    0,
  );

  function handleCopyCode() {
    if (!points?.referralCode) {
      return;
    }

    if (!navigator.clipboard) {
      toast.error("Clipboard access is not available here.");
      return;
    }

    navigator.clipboard
      .writeText(points.referralCode)
      .then(() => toast.success("Referral code copied."));
  }

  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:flex-row lg:p-5">
        <SideNavigation />
        <main className="min-w-0 flex-1 bg-surface">
          {isLoading ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              Loading your rewards...
            </div>
          ) : errorMessage ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {errorMessage}
            </div>
          ) : (
            <div className="space-y-10 p-4 sm:p-6 md:p-8">
              <div className="mb-10">
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-on-surface">
                  Rewards Dashboard
                </h1>
                <p className="mb-8 text-on-surface-variant">
                  Track your current point balance and recent rewards activity.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  <div className="rounded-xl border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm transition-transform duration-200 hover:scale-[1.02]">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                        Total Points
                      </span>
                      <div className="rounded-lg bg-primary-fixed p-2 text-on-primary-fixed-variant">
                        <span className="material-symbols-outlined">stars</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-on-surface">
                      {totalPoints}
                    </h3>
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        event
                      </span>
                      {expiresAt
                        ? `Latest expiry on ${formatDateLabel(expiresAt)}`
                        : "No points expiring soon"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-10 grid grid-cols-1 gap-8">
                <div className="flex w-full flex-col">
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-primary p-8 text-on-primary shadow-lg">
                    <div className="relative z-10">
                      <h2 className="mb-2 text-xl font-extrabold">
                        Referral Program
                      </h2>
                      <p className="mb-6 text-sm text-on-primary-container/80">
                        Share your active referral code and track earned reward
                        entries from the current backend data.
                      </p>
                      <div className="mb-6 flex flex-col items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                        <span className="text-[10px] font-bold tracking-widest opacity-70">
                          YOUR REFERRAL CODE
                        </span>
                        <span className="text-2xl font-black tracking-widest">
                          {points?.referralCode || "N/A"}
                        </span>
                        <button
                          className="mt-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary transition-transform active:scale-95"
                          onClick={handleCopyCode}
                          type="button"
                        >
                          Copy Code
                        </button>
                      </div>
                      <div className="flex flex-col gap-4 border-t border-white/10 py-4 sm:flex-row sm:items-center">
                        <div className="flex-1 text-center">
                          <p className="text-2xl font-black">
                            {referralHistory.length}
                          </p>
                          <p className="text-[10px] font-bold uppercase opacity-70">
                            Referral Entries
                          </p>
                        </div>
                        <div className="hidden h-8 w-[1px] bg-white/20 sm:block" />
                        <div className="flex-1 text-center">
                          <p className="text-2xl font-black">
                            {referralPoints}
                          </p>
                          <p className="text-[10px] font-bold uppercase opacity-70">
                            Referral Points
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 h-32 w-32 -mr-16 -mt-16 rounded-full bg-white/5" />
                    <div className="absolute bottom-0 left-0 h-24 w-24 -mb-12 -ml-12 rounded-full bg-white/5" />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="border-b border-outline-variant/10 px-4 py-6 sm:px-8">
                  <div>
                    <h2 className="text-lg font-bold">Points Activity</h2>
                    <p className="text-xs text-on-surface-variant">
                      Recent reward entries from your account history.
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="bg-surface-container-low/50">
                        <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-outline sm:px-8">
                          Date
                        </th>
                        <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-outline sm:px-8">
                          Source
                        </th>
                        <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right sm:px-8">
                          Amount
                        </th>
                        <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right sm:px-8">
                          Expires
                        </th>
                        <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right sm:px-8">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {pointsHistory.length ? (
                        pointsHistory.map((item) => {
                          const status = getPointsStatus(item);

                          return (
                            <tr
                              className="group transition-colors hover:bg-surface-container-low/30"
                              key={item.id}
                            >
                              <td className="px-4 py-4 text-sm font-medium text-on-surface-variant sm:px-8">
                                {formatDateLabel(item.createdAt)}
                              </td>
                              <td className="px-4 py-4 sm:px-8">
                                <p className="text-sm font-bold">
                                  {formatPointsSource(item.source)}
                                </p>
                                <p className="text-[10px] text-outline">
                                  Record #{item.id}
                                </p>
                              </td>
                              <td className="px-4 py-4 text-right sm:px-8">
                                <span
                                  className={`text-sm font-black ${
                                    item.points < 0
                                      ? "text-amber-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {formatPointsAmount(item.points)}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right text-sm text-on-surface-variant sm:px-8">
                                {formatDateLabel(item.expiresAt)}
                              </td>
                              <td className="px-4 py-4 text-right sm:px-8">
                                <span
                                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${getPointsStatusClass(status)}`}
                                >
                                  {status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            className="px-4 py-8 text-sm text-on-surface-variant sm:px-8"
                            colSpan={5}
                          >
                            No points activity is available yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
