import {
  getCustomerProfilePath,
  getCustomerSettingsPath,
  getOrganizerEntryPath,
  getOrganizerProfilePath,
  getOrganizerSettingsPath,
} from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function TopNavigation() {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const customerProfilePath = getCustomerProfilePath();
  const organizerSettingsPath = getOrganizerSettingsPath(user?.id);
  const organizerEntryPath = getOrganizerEntryPath(user);
  const organizerProfilePath = getOrganizerProfilePath(user?.id);
  const customerSettingsPath = getCustomerSettingsPath();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <Link className="flex items-center gap-2" to="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="material-icons text-xl text-white">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <Link
                className="text-slate-600 transition-colors hover:text-primary"
                to="/"
              >
                Explore Events
              </Link>
              <Link
                className="text-slate-600 transition-colors hover:text-primary"
                to={organizerEntryPath}
              >
                Host an Event
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
            <button className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="material-icons-outlined">notifications</span>
            </button>
            <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold">{user?.name}</p>
              </div>
              <div className="relative">
                <button
                  className="navbar-login"
                  onClick={() => setOpen((current) => !current)}
                  type="button"
                >
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                    {user?.profilePicture ? (
                      <img
                        alt={user.name}
                        className="h-full w-full object-cover"
                        src={user.profilePicture}
                      />
                    ) : (
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                    )}
                  </div>
                </button>

                {open ? (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg">
                    {user?.role === "EVENT_ORGANIZER" ? (
                      <>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/organizer/dashboard");
                          }}
                          type="button"
                        >
                          Dashboard
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate(organizerProfilePath);
                          }}
                          type="button"
                        >
                          Profile
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/organizer/transactions");
                          }}
                          type="button"
                        >
                          Review Payments
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate(organizerEntryPath);
                          }}
                          type="button"
                        >
                          Create Event
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate(organizerSettingsPath);
                          }}
                          type="button"
                        >
                          Settings
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/customer/dashboard");
                          }}
                          type="button"
                        >
                          My Tickets
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate(customerProfilePath);
                          }}
                          type="button"
                        >
                          Profile
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate(customerSettingsPath);
                          }}
                          type="button"
                        >
                          Settings
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/transactions/history");
                          }}
                          type="button"
                        >
                          My Orders
                        </button>
                      </>
                    )}
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100"
                      onClick={handleLogout}
                      type="button"
                    >
                      Log Out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
