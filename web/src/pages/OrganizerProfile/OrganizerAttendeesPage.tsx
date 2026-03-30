export default function OrganizerAttendeesPage() {
  return (
    <>
      <div className="bg-background text-on-background antialiased flex">
        <aside className="hidden md:flex flex-col h-screen sticky top-0 left-0 w-64 p-4 bg-slate-100 dark:bg-slate-900 font-inter antialiased tracking-tight text-slate-900 dark:text-slate-100 shrink-0">
          <div className="mb-8 px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-1">
              Event Management
            </p>
          </div>
          <nav className="flex-1 space-y-1">
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="dashboard">
                dashboard
              </span>
              <span>Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="bar_chart">
                bar_chart
              </span>
              <span>Statistics</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="payments">
                payments
              </span>
              <span>Transactions</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold active:scale-95 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="groups">
                groups
              </span>
              <span>Attendees</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
              <span>Settings</span>
            </a>
          </nav>
          <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800 space-y-1">
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="help">
                help
              </span>
              <span>Help Center</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
              <span>Logout</span>
            </a>
          </div>
        </aside>
        <main className="flex-1 min-w-0 bg-surface flex flex-col">
          {/* <!-- TopNavBar --> */}
          <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center h-16 px-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Event Portal
              </h1>
              <nav className="hidden lg:flex items-center gap-6 font-inter text-sm font-medium">
                <a
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all"
                  href="#"
                >
                  Overview
                </a>
                <a
                  className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1"
                  href="#"
                >
                  Analytics
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full">
                <span
                  className="material-symbols-outlined text-outline text-sm"
                  data-icon="search"
                >
                  search
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm w-40"
                  placeholder="Global search..."
                  type="text"
                />
              </div>
              <button
                className="material-symbols-outlined p-2 text-slate-500 hover:bg-surface-container-low rounded-full transition-colors"
                data-icon="notifications"
              >
                notifications
              </button>
              <button
                className="material-symbols-outlined p-2 text-slate-500 hover:bg-surface-container-low rounded-full transition-colors"
                data-icon="settings"
              >
                settings
              </button>
              <img
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                data-alt="close-up portrait of a professional man in his 30s with a clean haircut and neutral expression"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMnn-9T0VgwDO1iEH4ALQ0aTeaLqkZsX_stzwjlbEDNRsf0zf0xir-vmenddyNMv1wS4kFTzXN9habrJfCzm9r_kzMJRrfyQjFDooFDTAZrgGv3lgQh3ewfVZaz_PdlGe7PEoZHU2HkwySI4EUl2GG3RwcFDlGv6krY2IrtraCKQvqcGmisr_aOMOs6YNLSkGhmqOEjYTW8vqrlX4CKOmMgKDckOEJdmKJlUj_Ab0npzdarfrtxk1BJfM-PC9jTSMvdKZ9sDNCqR1i"
              />
            </div>
          </header>
          {/* <!-- Scrollable Canvas --> */}
          <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
            {/* <!-- Event Selector Banner (Asymmetric Layout) --> */}
            <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm group">
              <div className="flex flex-col lg:flex-row min-h-[300px]">
                {/* <!-- Content Side --> */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      Now Inspecting
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-on-surface">
                      Global Tech Summit 2024
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-primary"
                        data-icon="calendar_today"
                      >
                        calendar_today
                      </span>
                      <span className="font-semibold">Oct 24-26, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-primary"
                        data-icon="location_on"
                      >
                        location_on
                      </span>
                      <span className="font-semibold">
                        Grand Orchestrator Hall, SG
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-primary"
                        data-icon="confirmation_number"
                      >
                        confirmation_number
                      </span>
                      <span className="font-semibold">1,240 Registered</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
                      Switch Event
                    </button>
                    <button className="px-6 py-2.5 text-primary font-bold hover:bg-surface-container-low rounded-lg transition-all flex items-center gap-2">
                      <span
                        className="material-symbols-outlined"
                        data-icon="visibility"
                      >
                        visibility
                      </span>
                      View Live Landing
                    </button>
                  </div>
                </div>
                {/* <!-- Image Side (Asymmetric) --> */}
                <div className="lg:w-2/5 relative overflow-hidden clip-path-asymmetric min-h-[200px]">
                  <img
                    alt="Event Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                    data-alt="wide shot of a futuristic tech conference hall with blue neon lights and a large screen displaying abstract data patterns"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClB33OKR3KFn-V_IMwRi8DBGrBdSXESzOPkQuwYZ9sg3NgwFjFCSk1h8ChOkTHL5EOnt4JgQe05sGnomuoHKaJ7G03GduixoeisZ0MUV4Y9szJvZh-r2_663KnVuoEfbdhW7ztRr22W3sE_Ub7Vnp_FnJ26MCJ6nLzy1yPTpgZQJIYZDsBoIMcjhEJF9WNldK5hwGwNKuFpt6fr1BojXeqs-D6GfWXHuv-5D2z9PoNyZtMHWCkoSuJ1bUC_vr36pCxKdCJRygtdJFK"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent hidden lg:block"></div>
                </div>
              </div>
            </div>
            {/* <!-- Summary Cards (Tonal Layering) --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-outline">
                      Total Attendees
                    </p>
                    <h3 className="text-3xl font-black text-on-surface">
                      1,248
                    </h3>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="group"
                    >
                      group
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs font-medium text-secondary flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    data-icon="trending_up"
                  >
                    trending_up
                  </span>
                  <span>+12% from last week</span>
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-outline">
                      Tickets Sold
                    </p>
                    <h3 className="text-3xl font-black text-on-surface">
                      854 / 1000
                    </h3>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="local_activity"
                    >
                      local_activity
                    </span>
                  </div>
                </div>
                <div className="mt-4 w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full w-[85.4%]"></div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-outline">
                      Total Revenue
                    </p>
                    <h3 className="text-3xl font-black text-on-surface">
                      IDR 450.2M
                    </h3>
                  </div>
                  <div className="p-3 bg-tertiary/10 rounded-lg text-tertiary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="account_balance_wallet"
                    >
                      account_balance_wallet
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs font-medium text-tertiary flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    data-icon="payments"
                  >
                    payments
                  </span>
                  <span>Pacing ahead of target</span>
                </p>
              </div>
            </div>
            {/* <!-- Attendee Section Controls --> */}
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline"
                    data-icon="search"
                  >
                    search
                  </span>
                  <input
                    className="pl-10 pr-4 py-2.5 w-full md:w-80 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="Search attendee name or email..."
                    type="text"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="bg-surface-container-lowest border-none rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 font-medium">
                    <option>All Ticket Types</option>
                    <option>VIP Platinum</option>
                    <option>Standard</option>
                    <option>Early Bird</option>
                  </select>
                  <button className="p-2.5 bg-surface-container-lowest rounded-lg text-outline hover:text-primary transition-colors">
                    <span
                      className="material-symbols-outlined"
                      data-icon="filter_list"
                    >
                      filter_list
                    </span>
                  </button>
                </div>
              </div>
              <button className="w-full md:w-auto px-6 py-2.5 bg-surface-container-highest text-on-surface-variant font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-outline-variant/30 transition-all active:scale-95">
                <span
                  className="material-symbols-outlined text-[20px]"
                  data-icon="download"
                >
                  download
                </span>
                <span>Export Attendee List</span>
              </button>
            </div>
            {/* <!-- Attendee Table (Modern UI) --> */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">
                        Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">
                        Ticket Type
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline text-center">
                        Qty
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">
                        Total Paid
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline">
                        Purchase Date
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-outline text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {/* <!-- Row 1 --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            SM
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">
                              Sarah Mitchell
                            </p>
                            <p className="text-xs text-outline">
                              sarah.m@designcloud.io
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-tighter uppercase bg-primary-fixed text-on-primary-fixed-variant">
                          VIP Platinum
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">1</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-surface">
                          IDR 4,500,000
                        </p>
                        <p className="text-[10px] text-outline">via Stripe</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-outline">
                        May 12, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="material-symbols-outlined text-outline hover:text-primary p-1.5 rounded-full transition-colors"
                          data-icon="more_vert"
                        >
                          more_vert
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 2 --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                            JR
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">
                              James Rahman
                            </p>
                            <p className="text-xs text-outline">
                              j.rahman@techcorp.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-tighter uppercase bg-surface-container-highest text-on-surface-variant">
                          Standard
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">2</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-surface">
                          IDR 3,200,000
                        </p>
                        <p className="text-[10px] text-outline">
                          via BCA Transfer
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-outline">
                        May 14, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="material-symbols-outlined text-outline hover:text-primary p-1.5 rounded-full transition-colors"
                          data-icon="more_vert"
                        >
                          more_vert
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 3 --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-xs">
                            AL
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">
                              Aria Liora
                            </p>
                            <p className="text-xs text-outline">
                              aria.liora@startup.id
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-tighter uppercase bg-tertiary-fixed text-on-tertiary-fixed-variant">
                          Early Bird
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">1</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-surface">
                          IDR 1,200,000
                        </p>
                        <p className="text-[10px] text-outline">via E-Wallet</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-outline">
                        May 15, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="material-symbols-outlined text-outline hover:text-primary p-1.5 rounded-full transition-colors"
                          data-icon="more_vert"
                        >
                          more_vert
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 4 --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            BW
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">
                              Ben Wright
                            </p>
                            <p className="text-xs text-outline">
                              bwright@agency.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-tighter uppercase bg-primary-fixed text-on-primary-fixed-variant">
                          VIP Platinum
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">1</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-surface">
                          IDR 4,500,000
                        </p>
                        <p className="text-[10px] text-outline">
                          via Credit Card
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-outline">
                        May 18, 2024
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="material-symbols-outlined text-outline hover:text-primary p-1.5 rounded-full transition-colors"
                          data-icon="more_vert"
                        >
                          more_vert
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <!-- Pagination --> */}
              <div className="p-6 bg-surface-container-low/20 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant/10">
                <p className="text-xs font-medium text-outline">
                  Showing 1 to 4 of 1,248 entries
                </p>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-outline hover:text-primary disabled:opacity-30">
                    <span
                      className="material-symbols-outlined"
                      data-icon="chevron_left"
                    >
                      chevron_left
                    </span>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold">
                    3
                  </button>
                  <span className="px-2 text-outline">...</span>
                  <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-xs font-bold">
                    125
                  </button>
                  <button className="p-2 text-outline hover:text-primary">
                    <span
                      className="material-symbols-outlined"
                      data-icon="chevron_right"
                    >
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
