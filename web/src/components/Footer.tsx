import {
  FOOTER_LINK_GROUPS,
  FOOTER_SHORTCUTS,
  getOrganizerEntryPath,
} from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router";

function Footer() {
  const user = useAuthStore((state) => state.user);

  return (
    <footer className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="material-icons text-xl text-white">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </div>
            <p className="mb-8 max-w-xs leading-relaxed text-neutral-muted">
              Discover events, manage purchases, and operate organizer workflows
              from one focused marketplace.
            </p>
            <div className="flex gap-4">
              {FOOTER_SHORTCUTS.map((shortcut) => (
                <Link
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-400"
                  key={shortcut.label}
                  to={shortcut.to}
                >
                  <span className="material-icons text-base">
                    {shortcut.label === "About"
                      ? "info"
                      : shortcut.label === "Host"
                        ? "campaign"
                        : "help"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-6 font-bold">{group.title}</h4>
              <ul className="space-y-4 text-sm text-neutral-muted">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="transition-colors hover:text-primary"
                      to={
                        link.to === "/host"
                          ? getOrganizerEntryPath(user)
                          : link.to
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 md:flex-row">
          <p className="text-sm text-neutral-muted">
            Copyright 2026 EventHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center text-sm text-neutral-muted">
              <span className="material-icons mr-1 text-sm">language</span>
              <span>English (US)</span>
            </div>
            <div className="flex items-center text-sm text-neutral-muted">
              <span className="material-icons mr-1 text-sm">payments</span>
              <span>IDR (Rp)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
