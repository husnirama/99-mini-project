import { Link } from "react-router";
import { getOrganizerEntryPath } from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";

export default function TopNavigation() {
  const user = useAuthStore((state) => state.user);
  const organizerEntryPath = getOrganizerEntryPath(user);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-2" to="/">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons text-white text-xl">event</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            EventHub
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            className="text-slate-600 hover:text-primary transition-colors"
            to="/"
          >
            Explore Events
          </Link>
          <Link
            className="text-slate-600 hover:text-primary transition-colors"
            to={organizerEntryPath}
          >
            Host an Event
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600">
          <span className="material-icons-outlined">notifications</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold">{user?.name}</p>
          </div>
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-primary/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGaXvEZ9moqTPWL-sfT9S8bW6EvTQ-6Bj1Qb8JDo_-nlT5m4rOPmkjNfPDq7-DFannDqsT0V3dFEvqpwp0ScKCxzs2gBeWRqzpacH42bNyd-7pH7n_PyraFKEY_Yuc0lhpWRMF9dS61tOX8byTCPuRoozWQbFb4liXF_VwnK-7HEHs1ALhSCQXhhT4JxpNtRou-v4mZb_LQFa_1_4GCgWf6isX5ep63s3ekVUdwcVsjJcC7GOD6pbLkYQXBo3Fz6OOoJLfdyuwzIkb"
          />
        </div>
      </div>
    </nav>
  );
}
