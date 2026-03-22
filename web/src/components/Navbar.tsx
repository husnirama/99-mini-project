import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useLocation } from "react-router";

const SEARCH_DEBOUNCE_MS = 500;

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [navbarQuery, setNavbarQuery] = useState("");
  const [isTypingQuery, setIsTypingQuery] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logout = useAuthStore((state) => state.logout);

  const queryFromUrl = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("q") ?? "";
  }, [location.search]);

  const visibleQuery = isTypingQuery ? navbarQuery : queryFromUrl;

  const handleLogout = async () => {
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
  };

  useEffect(() => () => clearDebounce(), []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </div>
            <form className="hidden md:flex relative w-96" onSubmit={handleNavbarSearch}>
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-16 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold rounded-md bg-primary text-white hover:bg-primary/90"
                type="submit"
              >
                Go
              </button>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={"/organizer/create-event"}
              className="hidden lg:block text-sm font-medium hover:text-primary transition-colors"
            >
              Host an Event
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  className="navbar-login"
                  onClick={() => setOpen((v) => !v)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg">
                    {user?.role === "EVENT_ORGANIZER" ? (
                      <>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/organizer/transactions");
                          }}
                        >
                          Review Payments
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOpen(false);
                            navigate("/organizer/create-event");
                          }}
                        >
                          Create Event
                        </button>
                      </>
                    ) : (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                        onClick={() => {
                          setOpen(false);
                          navigate("/transactions/history");
                        }}
                      >
                        My Orders
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
