import {
  getCustomerProfilePath,
  getCustomerSettingsPath,
  getOrganizerEntryPath,
  getOrganizerProfilePath,
  getOrganizerSettingsPath,
} from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const SEARCH_DEBOUNCE_MS = 500;

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarQuery, setNavbarQuery] = useState("");
  const [isTypingQuery, setIsTypingQuery] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryFromUrl = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("q") ?? "";
  }, [location.search]);
  const organizerSettingsPath = getOrganizerSettingsPath(user?.id);
  const organizerProfilePath = getOrganizerProfilePath(user?.id);
  const organizerEntryPath = getOrganizerEntryPath(user);
  const customerProfilePath = getCustomerProfilePath();
  const customerSettingsPath = getCustomerSettingsPath();
  const showHostLink = !user || user.role === "EVENT_ORGANIZER";
  const visibleQuery = isTypingQuery ? navbarQuery : queryFromUrl;

  const handleLogout = async () => {
    setOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate("/", { replace: true });
  };

  const clearDebounce = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  };

  const applySearch = (rawQuery: string, replace: boolean) => {
    const query = rawQuery.trim();

    if (!query) {
      navigate("/", { replace });
      return;
    }

    navigate(`/?q=${encodeURIComponent(query)}`, { replace });
  };

  const scheduleDebouncedSearch = (rawQuery: string) => {
    clearDebounce();
    debounceTimerRef.current = setTimeout(() => {
      applySearch(rawQuery, true);
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleNavbarSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearDebounce();
    applySearch(visibleQuery, location.pathname === "/");
    setMobileMenuOpen(false);
  };

  useEffect(() => () => clearDebounce(), []);
  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
    setIsTypingQuery(false);
    setNavbarQuery(queryFromUrl);
  }, [location.pathname, location.search, queryFromUrl]);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link className="flex items-center gap-2" to="/">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="material-icons text-xl text-white">event</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-primary">
                  EventHub
                </span>
              </Link>

              <form
                className="relative hidden w-full max-w-md md:flex"
                onSubmit={handleNavbarSearch}
              >
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-16 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  onBlur={() => setIsTypingQuery(false)}
                  onChange={(event) => {
                    const nextQuery = event.target.value;
                    setNavbarQuery(nextQuery);
                    if (!isTypingQuery) {
                      setIsTypingQuery(true);
                    }
                    scheduleDebouncedSearch(nextQuery);
                  }}
                  onFocus={() => {
                    setNavbarQuery(queryFromUrl);
                    setIsTypingQuery(true);
                  }}
                  placeholder="Search events, artists, or venues..."
                  type="text"
                  value={visibleQuery}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary/90"
                  type="submit"
                >
                  Go
                </button>
              </form>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-primary hover:text-primary md:hidden dark:border-slate-800 dark:text-slate-200"
              onClick={() => setMobileMenuOpen((current) => !current)}
              type="button"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {showHostLink ? (
              <Link
                className="hidden text-sm font-medium transition-colors hover:text-primary lg:block"
                to={organizerEntryPath}
              >
                Host an Event
              </Link>
            ) : null}
            <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            {!isAuthenticated ? (
              <>
                <Link
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  to="/auth/login"
                >
                  Log In
                </Link>
                <Link
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-700"
                  to="/auth/register"
                >
                  Sign Up
                </Link>
              </>
            ) : (
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
            )}
          </div>

          {mobileMenuOpen ? (
            <div className="space-y-3 border-t border-slate-200 pt-3 md:hidden dark:border-slate-800">
              <form className="relative" onSubmit={handleNavbarSearch}>
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-16 text-sm outline-none transition-colors focus:border-primary dark:border-slate-800 dark:bg-slate-900"
                  onBlur={() => setIsTypingQuery(false)}
                  onChange={(event) => {
                    const nextQuery = event.target.value;
                    setNavbarQuery(nextQuery);
                    if (!isTypingQuery) {
                      setIsTypingQuery(true);
                    }
                    scheduleDebouncedSearch(nextQuery);
                  }}
                  onFocus={() => {
                    setNavbarQuery(queryFromUrl);
                    setIsTypingQuery(true);
                  }}
                  placeholder="Search events, artists, or venues..."
                  type="text"
                  value={visibleQuery}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary/90"
                  type="submit"
                >
                  Go
                </button>
              </form>

              <div className="flex flex-col gap-2">
                {showHostLink ? (
                  <Link
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    onClick={() => setMobileMenuOpen(false)}
                    to={organizerEntryPath}
                  >
                    Host an Event
                  </Link>
                ) : null}

                {!isAuthenticated ? (
                  <>
                    <Link
                      className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => setMobileMenuOpen(false)}
                      to="/auth/login"
                    >
                      Log In
                    </Link>
                    <Link
                      className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                      onClick={() => setMobileMenuOpen(false)}
                      to="/auth/register"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : user?.role === "EVENT_ORGANIZER" ? (
                  <>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/organizer/dashboard");
                      }}
                      type="button"
                    >
                      Dashboard
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(organizerProfilePath);
                      }}
                      type="button"
                    >
                      Profile
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/organizer/transactions");
                      }}
                      type="button"
                    >
                      Review Payments
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(organizerEntryPath);
                      }}
                      type="button"
                    >
                      Create Event
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(organizerSettingsPath);
                      }}
                      type="button"
                    >
                      Settings
                    </button>
                    <button
                      className="rounded-lg border border-red-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/40"
                      onClick={handleLogout}
                      type="button"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/customer/dashboard");
                      }}
                      type="button"
                    >
                      My Tickets
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(customerProfilePath);
                      }}
                      type="button"
                    >
                      Profile
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(customerSettingsPath);
                      }}
                      type="button"
                    >
                      Settings
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/transactions/history");
                      }}
                      type="button"
                    >
                      My Orders
                    </button>
                    <button
                      className="rounded-lg border border-red-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/40"
                      onClick={handleLogout}
                      type="button"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
