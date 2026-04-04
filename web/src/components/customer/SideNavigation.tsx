export default function SideNavigation() {
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="flex flex-col gap-1">
        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all"
          href="#"
        >
          <span className="material-icons-outlined">confirmation_number</span>
          <span className="font-medium">My Tickets</span>
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white shadow-lg shadow-primary/20"
          href="#"
        >
          <span className="material-icons-outlined">rate_review</span>
          <span className="font-medium">Reviews</span>
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all"
          href="#"
        >
          <span className="material-icons-outlined">card_giftcard</span>
          <span className="font-medium">Points &amp; Coupons</span>
        </a>
        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all"
          href="#"
        >
          <span className="material-icons-outlined">person_outline</span>
          <span className="font-medium">Profile Settings</span>
        </a>
        <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
        <a
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          href="#"
        >
          <span className="material-icons-outlined">logout</span>
          <span className="font-medium">Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
