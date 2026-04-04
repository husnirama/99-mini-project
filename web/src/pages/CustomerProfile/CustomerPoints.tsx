import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";

export default function CustomerPoints() {
  return (
    <>
      <TopNavigation />
      <div className="max-w-9xl flex gap-8 p-6 lg:p-5 mx-auto">
        {/* side navigation */}
        <SideNavigation />
        {/* main content */}
        <main className="flex-1 p-8 bg-surface">
          {/* <!-- Hero Summary Section --> */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
              Rewards Dashboard
            </h1>
            <p className="text-on-surface-variant mb-8">
              Redeem points for premium upgrades and track your loyalty status.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <!-- Total Points Card --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary transition-transform hover:scale-[1.02] duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-outline uppercase">
                    Total Points
                  </span>
                  <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed-variant">
                    <span
                      className="material-symbols-outlined"
                      data-icon="stars"
                    >
                      stars
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-on-surface tracking-tighter">
                  12,450
                </h3>
                <p className="text-xs font-medium text-on-surface-variant mt-2 flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="event"
                  >
                    event
                  </span>
                  Valid until March 28, 2026
                </p>
              </div>
              {/* <!-- Active Coupons Card --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary transition-transform hover:scale-[1.02] duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-outline uppercase">
                    Active Coupons
                  </span>
                  <div className="p-2 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed-variant">
                    <span
                      className="material-symbols-outlined"
                      data-icon="confirmation_number"
                    >
                      confirmation_number
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-on-surface tracking-tighter">
                  3
                </h3>
                <p className="text-xs font-medium text-error mt-2 flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="alarm"
                  >
                    alarm
                  </span>
                  Earliest expires in 14 days
                </p>
              </div>
              {/* <!-- Tier Progress (Contextual Bonus) --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm col-span-1 md:col-span-2 relative overflow-hidden group">
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-outline uppercase">
                      Membership Tier
                    </span>
                    <h3 className="text-xl font-bold text-primary mt-1">
                      Silver Voyager
                    </h3>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>2,550 pts to Gold</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000 w-[80%]"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span
                    className="material-symbols-outlined text-9xl"
                    data-icon="military_tech"
                  >
                    military_tech
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Referral & Coupon Section (Asymmetric Bento) --> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* <!-- Referral Program --> */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="bg-primary p-8 rounded-xl text-on-primary flex flex-col justify-between h-full shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl font-extrabold mb-2">
                    Referral Program
                  </h2>
                  <p className="text-on-primary-container/80 text-sm mb-6">
                    Earn 10,000 points for every friend who joins using your
                    unique code.
                  </p>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 flex flex-col gap-1 items-center justify-center mb-6">
                    <span className="text-[10px] font-bold tracking-widest opacity-70">
                      YOUR REFERRAL CODE
                    </span>
                    <span className="text-2xl font-black tracking-widest">
                      ALEX-REF-2024
                    </span>
                    <button className="mt-2 text-xs bg-white text-primary px-4 py-1.5 rounded-full font-bold active:scale-95 transition-transform">
                      Copy Code
                    </button>
                  </div>
                  <div className="flex items-center gap-4 py-4 border-t border-white/10">
                    <div className="text-center flex-1">
                      <p className="text-2xl font-black">5</p>
                      <p className="text-[10px] uppercase font-bold opacity-70">
                        Users Joined
                      </p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/20"></div>
                    <div className="text-center flex-1">
                      <p className="text-2xl font-black">50k</p>
                      <p className="text-[10px] uppercase font-bold opacity-70">
                        Points Earned
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- Background Pattern --> */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              </div>
            </div>
            {/* <!-- Coupons Grid --> */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold tracking-tight">
                  Active Coupons
                </h2>
                <a
                  className="text-primary text-sm font-semibold hover:underline"
                  href="#"
                >
                  View Archived
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <!-- Coupon Card 1 --> */}
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 flex items-start gap-4 relative overflow-hidden">
                  <div className="bg-primary-fixed w-16 h-16 rounded-lg flex flex-col items-center justify-center text-on-primary-fixed-variant flex-shrink-0">
                    <span className="text-lg font-black">20%</span>
                    <span className="text-[8px] font-bold uppercase">OFF</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">
                      First-className Upgrade
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-mono text-outline">
                        UPGRADE2024
                      </span>
                      <button
                        className="material-symbols-outlined text-sm text-primary"
                        data-icon="content_copy"
                      >
                        content_copy
                      </button>
                    </div>
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="history"
                      >
                        history
                      </span>
                      Expires Apr 12, 2024
                    </p>
                  </div>
                </div>
                {/* <!-- Coupon Card 2 --> */}
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 flex items-start gap-4 relative overflow-hidden">
                  <div className="bg-tertiary-fixed w-16 h-16 rounded-lg flex flex-col items-center justify-center text-on-tertiary-fixed-variant flex-shrink-0">
                    <span className="text-lg font-black">$50</span>
                    <span className="text-[8px] font-bold uppercase">OFF</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">Booking Discount</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-mono text-outline">
                        SAVE50HUB
                      </span>
                      <button
                        className="material-symbols-outlined text-sm text-primary"
                        data-icon="content_copy"
                      >
                        content_copy
                      </button>
                    </div>
                    <p className="text-[10px] text-error flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="alarm"
                      >
                        alarm
                      </span>
                      Expires in 14 days
                    </p>
                  </div>
                </div>
                {/* <!-- Coupon Card 3 --> */}
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 flex items-start gap-4 relative overflow-hidden">
                  <div className="bg-secondary-fixed w-16 h-16 rounded-lg flex flex-col items-center justify-center text-on-secondary-fixed-variant flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-2xl"
                      data-icon="local_parking"
                    >
                      local_parking
                    </span>
                    <span className="text-[8px] font-bold uppercase">FREE</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">VIP Parking Pass</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-mono text-outline">
                        PARKFREE24
                      </span>
                      <button
                        className="material-symbols-outlined text-sm text-primary"
                        data-icon="content_copy"
                      >
                        content_copy
                      </button>
                    </div>
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        data-icon="history"
                      >
                        history
                      </span>
                      Expires Jun 30, 2024
                    </p>
                  </div>
                </div>
                {/* <!-- Redeem More CTA --> */}
                <div className="bg-surface-container-low p-5 rounded-xl border-2 border-dashed border-outline-variant flex items-center justify-center gap-3 cursor-pointer hover:bg-surface-variant/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="add"
                    >
                      add
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    Redeem More Points
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Transaction Activity Table --> */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Points Activity</h2>
                <p className="text-xs text-on-surface-variant">
                  Recent transactions and point accruals
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs font-bold px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
                  Export CSV
                </button>
                <button className="text-xs font-bold px-4 py-2 bg-primary text-on-primary rounded-lg shadow-md">
                  Filter List
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Date
                    </th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Description
                    </th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-center">
                      Type
                    </th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right">
                      Amount
                    </th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {/* <!-- Row 1 --> */}
                  <tr className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium text-on-surface-variant">
                      Mar 15, 2024
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold">Referral Bonus</p>
                      <p className="text-[10px] text-outline">
                        New user signup (ID: #4920)
                      </p>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                        Earned
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-sm font-black text-green-600">
                        +10,000
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant uppercase">
                        Completed
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 2 --> */}
                  <tr className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium text-on-surface-variant">
                      Mar 10, 2024
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold">
                        Ticket Purchase Discount
                      </p>
                      <p className="text-[10px] text-outline">
                        Redeemed for Booking #7712
                      </p>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                        Spent
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-sm font-black text-on-surface">
                        -2,500
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant uppercase">
                        Applied
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 3 --> */}
                  <tr className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium text-on-surface-variant">
                      Mar 01, 2024
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold">
                        Monthly Loyalty Reward
                      </p>
                      <p className="text-[10px] text-outline">
                        Silver Tier Bonus
                      </p>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                        Earned
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-sm font-black text-green-600">
                        +500
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant uppercase">
                        Completed
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 4 --> */}
                  <tr className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium text-on-surface-variant">
                      Feb 28, 2024
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold">Points Expired</p>
                      <p className="text-[10px] text-outline">
                        Balance cleanup (Legacy system)
                      </p>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container uppercase">
                        Expired
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-sm font-black text-error">
                        -120
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container uppercase">
                        Finalized
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-surface-container-low/30 text-center">
              <button className="text-sm font-bold text-primary hover:text-primary-container transition-colors">
                Load More History
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
