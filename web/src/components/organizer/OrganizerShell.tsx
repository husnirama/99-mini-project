import { useAuthStore } from "@/store/auth-store";
import { Link, NavLink, useNavigate } from "react-router";
import type { ReactNode } from "react";

type OrganizerShellProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

type OrganizerNavItem = {
  label: string;
  to: string;
  icon: string;
};

function getNavLinkClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-primary text-white shadow-lg shadow-primary/20"
      : "text-slate-600 hover:bg-slate-200 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
  }`;
}

export default function OrganizerShell({
  title,
  description,
  actions,
  children,
}: OrganizerShellProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const organizerId = user?.id;

  const navItems: OrganizerNavItem[] = [
    {
      label: "Dashboard",
      to: "/organizer/dashboard",
      icon: "dashboard",
    },
    {
      label: "Statistics",
      to: organizerId ? `/organizer/${organizerId}/statistics` : "/organizer/dashboard",
      icon: "bar_chart",
    },
    {
      label: "Transactions",
      to: "/organizer/transactions",
      icon: "payments",
    },
    {
      label: "Attendees",
      to: organizerId ? `/organizer/${organizerId}/attendees` : "/organizer/dashboard",
      icon: "groups",
    },
    {
      label: "Settings",
      to: organizerId ? `/organizer/${organizerId}/settings` : "/organizer/dashboard",
      icon: "settings",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white/90 p-5 backdrop-blur md:flex md:flex-col dark:border-slate-800 dark:bg-slate-950/80">
          <Link className="flex items-center gap-3 px-3 py-2" to="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-icons text-xl">event</span>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-primary">
                EventHub
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Organizer Portal
              </p>
            </div>
          </Link>

          <nav className="mt-8 flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => getNavLinkClass(isActive)}
                key={item.label}
                to={item.to}
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Link
              className={getNavLinkClass(false)}
              to="/help"
            >
              <span className="material-symbols-outlined text-lg">help</span>
              <span>Help Center</span>
            </Link>
            <button
              className={`${getNavLinkClass(false)} w-full`}
              onClick={handleLogout}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur md:px-2 dark:border-slate-800 dark:bg-slate-950/85">
            <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Organizer Workspace
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                  {title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {actions}
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                  to="/organizer/create-event"
                >
                  Create Event
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
