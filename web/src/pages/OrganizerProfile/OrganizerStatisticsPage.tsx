export default function OrganizerStatisticsPage() {
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
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold active:scale-95 transition-all"
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
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
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
          {/* <!-- TopNavBar Component --> */}
          <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl flex justify-between items-center h-16 px-6 font-inter text-sm font-medium">
            <div className="flex items-center gap-8">
              <h2 className="text-xl font-black text-slate-900">
                Event Portal
              </h2>
              <div className="hidden lg:flex items-center gap-6">
                <a
                  className="text-slate-500 hover:text-blue-700 transition-all"
                  href="#"
                >
                  Overview
                </a>
                <a
                  className="text-blue-600 border-b-2 border-blue-600 pb-1"
                  href="#"
                >
                  Analytics
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 cursor-pointer active:opacity-70 transition-all">
                <span className="material-symbols-outlined text-sm">add</span>
                New Event
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </button>
                <button className="p-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden ml-2 bg-surface-container-high">
                  <img
                    alt="Organizer Profile Picture"
                    className="w-full h-full object-cover"
                    data-alt="professional portrait of a confident event manager with a soft office background in daylight"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6jnF_S3ueiJlDlFETuuDXDjeuNn6vuqWk5pvsaKc03G87Tnedq60wsO076RCZgfA07wxdGGkTvdkX45w9PT4BJKInDnHWSLWEioHtDUQ8p-LbXAUIlTjwSgx9rw0EsfAKvtXmeuu76OsXTrReTJwvDo60KqaxWbLZs22RzyRIqsveS1P6keH3rtkr7MmnfrxsN75imi6Gq66JYFfAsMANkIPSuxmKanywLiLBCLK9rwK9AVM2S3Zpr15wOW2BZD_4MFOoKu3-CxnV"
                  />
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Page Body --> */}
          <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
            {/* <!-- Header & Filters --> */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
                  Event Performance
                </h3>
                <p className="text-on-surface-variant max-w-lg">
                  Comprehensive analytics and tracking for your orchestrated
                  experiences across all venues.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex bg-surface-container-low p-1 rounded-lg">
                  <select className="bg-transparent border-none text-xs font-semibold focus:ring-0 cursor-pointer px-3 py-1">
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                  <select className="bg-transparent border-none text-xs font-semibold focus:ring-0 cursor-pointer px-3 py-1">
                    <option>October</option>
                    <option>September</option>
                  </select>
                </div>
                <select className="bg-surface-container-low border-none rounded-lg text-xs font-semibold focus:ring-0 cursor-pointer px-4 py-2 min-w-[160px]">
                  <option>All Events</option>
                  <option>Global Tech Summit</option>
                  <option>Jazz by the Pier</option>
                  <option>Marketing Expo '24</option>
                </select>
                <button className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined text-sm">
                    file_download
                  </span>
                  EXPORT REPORT
                </button>
              </div>
            </div>
            {/* <!-- KPI Bento Grid --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <!-- Gross Revenue --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                    Gross Revenue
                  </span>
                  <span className="text-xs font-bold text-success flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    +12.4%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-on-surface">
                    $248,390.00
                  </span>
                  <p className="text-[10px] text-outline mt-1 font-medium italic">
                    vs. $220,950 last month
                  </p>
                </div>
              </div>
              {/* <!-- Net Paid Orders --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary-container"></div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                    Net Paid Orders
                  </span>
                  <span className="text-xs font-bold text-success flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    +8.2%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-on-surface">
                    1,842
                  </span>
                  <p className="text-[10px] text-outline mt-1 font-medium italic">
                    Average ticket: $134.80
                  </p>
                </div>
              </div>
              {/* <!-- Rejected Transactions --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                <div className="absolute left-0 top-0 w-1 h-full bg-error"></div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                    Rejected Trans.
                  </span>
                  <span className="text-xs font-bold text-error flex items-center bg-error-container/20 px-2 py-0.5 rounded-full">
                    -2.1%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-on-surface">
                    43
                  </span>
                  <p className="text-[10px] text-outline mt-1 font-medium italic">
                    0.2% of total volume
                  </p>
                </div>
              </div>
              {/* <!-- Seat Occupancy Rate --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                <div className="absolute left-0 top-0 w-1 h-full bg-secondary"></div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                    Seat Occupancy
                  </span>
                  <span className="text-xs font-bold text-success flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    +5.5%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-on-surface">
                    88.4%
                  </span>
                  <p className="text-[10px] text-outline mt-1 font-medium italic">
                    8,420 total capacity
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Charts Section --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* <!-- Revenue over time (Line Chart Mockup) --> */}
              <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold tracking-tight text-on-surface">
                    Revenue Performance
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant">
                        CURRENT PERIOD
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                      <span className="text-[10px] font-bold text-on-surface-variant">
                        PREVIOUS
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 w-full mt-4">
                  {/* <!-- SVG Mockup of Line Chart --> */}
                  <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 240"
                  >
                    {/* <!-- Grid Lines --> */}
                    <line
                      stroke="#c3c6d7"
                      stroke-opacity="0.1"
                      x1="0"
                      x2="800"
                      y1="40"
                      y2="40"
                    ></line>
                    <line
                      stroke="#c3c6d7"
                      stroke-opacity="0.1"
                      x1="0"
                      x2="800"
                      y1="90"
                      y2="90"
                    ></line>
                    <line
                      stroke="#c3c6d7"
                      stroke-opacity="0.1"
                      x1="0"
                      x2="800"
                      y1="140"
                      y2="140"
                    ></line>
                    <line
                      stroke="#c3c6d7"
                      stroke-opacity="0.1"
                      x1="0"
                      x2="800"
                      y1="190"
                      y2="190"
                    ></line>
                    {/* <!-- Previous Year Line (Dashed) --> */}
                    <path
                      d="M0 160 Q 100 140, 200 155 T 400 170 T 600 145 T 800 150"
                      fill="none"
                      stroke="#c3c6d7"
                      stroke-dasharray="4"
                      stroke-width="2"
                    ></path>
                    {/* <!-- Current Year Line (Smooth) --> */}
                    <path
                      d="M0 190 Q 100 140, 200 160 T 400 90 T 600 110 T 800 40"
                      fill="none"
                      stroke="#004ac6"
                      stroke-width="3"
                    ></path>
                    {/* <!-- Active Data Point --> */}
                    <circle
                      cx="400"
                      cy="90"
                      fill="#004ac6"
                      r="4"
                      stroke="white"
                      stroke-width="2"
                    ></circle>
                  </svg>
                  {/* <!-- X Axis Labels --> */}
                  <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>
              {/* <!-- Transactions by Status (Pie/Donut Mockup) --> */}
              <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col h-full">
                <h4 className="text-sm font-bold tracking-tight text-on-surface mb-8">
                  Transaction Integrity
                </h4>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        r="40"
                        stroke="#edeeef"
                        stroke-width="12"
                      ></circle>
                      {/* <!-- Successful --> */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        r="40"
                        stroke="#004ac6"
                        stroke-dasharray="188 251"
                        stroke-linecap="round"
                        stroke-width="12"
                        transform="rotate(-90 50 50)"
                      ></circle>
                      {/* <!-- Pending --> */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        r="40"
                        stroke="#495c95"
                        stroke-dasharray="40 251"
                        stroke-dashoffset="-188"
                        stroke-linecap="round"
                        stroke-width="12"
                        transform="rotate(-90 50 50)"
                      ></circle>
                      {/* <!-- Rejected --> */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        r="40"
                        stroke="#ba1a1a"
                        stroke-dasharray="23 251"
                        stroke-dashoffset="-228"
                        stroke-linecap="round"
                        stroke-width="12"
                        transform="rotate(-90 50 50)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-on-surface leading-none">
                        1,842
                      </span>
                      <span className="text-[9px] font-bold text-outline uppercase mt-1">
                        TOTAL
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full mt-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface">
                          Successful
                        </span>
                        <span className="text-xs font-black">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface">
                          Pending
                        </span>
                        <span className="text-xs font-black">14%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-error"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-on-surface">
                          Rejected
                        </span>
                        <span className="text-xs font-black">8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Tickets sold over time (Area Chart Mockup) --> */}
              <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold tracking-tight text-on-surface">
                    Ticket Volume Dynamics
                  </h4>
                  <span className="text-xs bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full font-bold">
                    Volume Trends
                  </span>
                </div>
                <div className="relative h-64 w-full mt-4">
                  <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 240"
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop
                          offset="0%"
                          stop-color="#004ac6"
                          stop-opacity="0.2"
                        ></stop>
                        <stop
                          offset="100%"
                          stop-color="#004ac6"
                          stop-opacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 240 L0 180 Q 200 200, 400 120 T 800 40 L 800 240 Z"
                      fill="url(#areaGrad)"
                    ></path>
                    <path
                      d="M0 180 Q 200 200, 400 120 T 800 40"
                      fill="none"
                      stroke="#004ac6"
                      stroke-width="3"
                    ></path>
                  </svg>
                  <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>
              </div>
              {/* <!-- Top Events (Horizontal Bar Chart Mockup) --> */}
              <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col">
                <h4 className="text-sm font-bold tracking-tight text-on-surface mb-6">
                  Top Performing Series
                </h4>
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase text-on-surface-variant">
                        Global Tech Summit
                      </span>
                      <span className="text-xs font-black">$84.2k</span>
                    </div>
                    <div className="h-2 bg-surface-container w-full rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[90%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase text-on-surface-variant">
                        Jazz by the Pier
                      </span>
                      <span className="text-xs font-black">$62.1k</span>
                    </div>
                    <div className="h-2 bg-surface-container w-full rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full w-[72%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase text-on-surface-variant">
                        Marketing Expo '24
                      </span>
                      <span className="text-xs font-black">$45.8k</span>
                    </div>
                    <div className="h-2 bg-surface-container w-full rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full w-[54%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase text-on-surface-variant">
                        Product Unveil
                      </span>
                      <span className="text-xs font-black">$28.4k</span>
                    </div>
                    <div className="h-2 bg-surface-container w-full rounded-full overflow-hidden">
                      <div className="h-full bg-outline-variant rounded-full w-[35%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Comparison Widgets / Detail Table --> */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>
                <h4 className="text-sm font-bold tracking-tight text-on-surface uppercase tracking-widest">
                  Venue Utilization Comparison
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-outline uppercase tracking-wider">
                      <th className="pb-4">Venue Name</th>
                      <th className="pb-4">Total Capacity</th>
                      <th className="pb-4">Avg. Occupancy</th>
                      <th className="pb-4">Revenue/Seat</th>
                      <th className="pb-4">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium text-on-surface divide-y divide-outline-variant/10">
                    <tr>
                      <td className="py-4">Grand Ballroom A</td>
                      <td className="py-4 text-on-surface-variant">2,500</td>
                      <td className="py-4">92%</td>
                      <td className="py-4 font-bold">$124</td>
                      <td className="py-4">
                        <span className="text-green-600">+15.2%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">Skyline Terrace</td>
                      <td className="py-4 text-on-surface-variant">800</td>
                      <td className="py-4">78%</td>
                      <td className="py-4 font-bold">$210</td>
                      <td className="py-4">
                        <span className="text-green-600">+4.8%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">North Conference Hall</td>
                      <td className="py-4 text-on-surface-variant">4,200</td>
                      <td className="py-4">84%</td>
                      <td className="py-4 font-bold">$89</td>
                      <td className="py-4">
                        <span className="text-error">-1.2%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <!-- Footer for Mobile/Small Screens --> */}
          <footer className="md:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md flex justify-around items-center h-16 border-t border-surface-container-high">
            <button className="flex flex-col items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-[9px] font-bold">HOME</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined">bar_chart</span>
              <span className="text-[9px] font-bold">STATS</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined">payments</span>
              <span className="text-[9px] font-bold">MONEY</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[9px] font-bold">CONFIG</span>
            </button>
          </footer>
        </main>
      </div>
    </>
  );
}
