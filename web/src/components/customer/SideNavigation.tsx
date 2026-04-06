import { getCustomerProfilePath, getCustomerSettingsPath } from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import { NavLink, useNavigate } from "react-router";

function getNavLinkClass(isActive: boolean) {
  return `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 whitespace-nowrap transition-all ${
    isActive
      ? "bg-primary text-white shadow-lg shadow-primary/20"
      : "text-slate-600 hover:bg-white hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800"
  }`;
}

export default function SideNavigation() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const navItems = [
    {
      icon: "confirmation_number",
      label: "My Tickets",
      to: "/customer/dashboard",
    },
    {
      icon: "rate_review",
      label: "Reviews",
      to: "/customer/reviews",
    },
    {
      icon: "card_giftcard",
      label: "Points & Coupons",
      to: "/customer/points",
    },
    {
      icon: "person",
      label: "Profile",
      to: getCustomerProfilePath(),
    },
    {
      icon: "person_outline",
      label: "Profile Settings",
      to: getCustomerSettingsPath(),
    },
  ];

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      <div className="md:hidden">
        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => getNavLinkClass(isActive)}
                key={item.to}
                to={item.to}
              >
                <span className="material-icons-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
            <button
              className="flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 whitespace-nowrap text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={handleLogout}
              type="button"
            >
              <span className="material-icons-outlined">logout</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <aside className="hidden w-64 shrink-0 md:block">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => getNavLinkClass(isActive)}
              key={item.to}
              to={item.to}
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
          <button
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={handleLogout}
            type="button"
          >
            <span className="material-icons-outlined">logout</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
