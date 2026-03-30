export default function OrganizerTransactionViewPage() {
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
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold active:scale-95 transition-all"
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
        <main className="flex-1 flex flex-col min-w-0 bg-surface">
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
          {/* <!-- Transaction Content Area --> */}
          <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
            {/* <!-- Page Header & Filters --> */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-on-surface">
                  Transaction Management
                </h2>
                <p className="text-on-surface-variant mt-1">
                  Review and validate incoming ticket payments
                </p>
              </div>
              {/* <!-- Filter Cluster --> */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest pl-1">
                    Event
                  </label>
                  <select className="bg-surface-container-low border-none rounded-lg text-sm py-2 pl-3 pr-10 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>All Events</option>
                    <option>Global Tech Summit 2024</option>
                    <option>Jazz by the Bay</option>
                    <option>Creative UI Masterclass</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest pl-1">
                    Date Range
                  </label>
                  <div className="flex items-center bg-surface-container-low rounded-lg px-3 py-2 gap-2">
                    <span className="material-symbols-outlined text-xs text-outline">
                      calendar_today
                    </span>
                    <span className="text-sm">Oct 12 - Oct 19, 2023</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest pl-1">
                    Status
                  </label>
                  <div className="flex p-1 bg-surface-container-low rounded-lg">
                    <button className="px-3 py-1 text-xs font-bold rounded-md bg-white text-primary shadow-sm">
                      All
                    </button>
                    <button className="px-3 py-1 text-xs font-bold rounded-md text-outline hover:text-on-surface transition-all">
                      Pending
                    </button>
                    <button className="px-3 py-1 text-xs font-bold rounded-md text-outline hover:text-on-surface transition-all">
                      Accepted
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Bento Stats Grid (Minimal) --> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  Awaiting Validation
                </p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-black">24</span>
                  <span className="text-xs text-primary font-bold bg-primary-fixed/30 px-2 py-0.5 rounded-full">
                    +12%
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  Total Validated Today
                </p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-black">156</span>
                  <span className="text-xs text-success font-bold bg-green-100 px-2 py-0.5 rounded-full">
                    Optimal
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  Rejection Rate
                </p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-black">2.4%</span>
                  <span className="text-xs text-error font-bold bg-error-container px-2 py-0.5 rounded-full">
                    -0.8%
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm bg-gradient-to-br from-blue-600 to-primary-container text-white">
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                  Revenue (MTD)
                </p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-black">Rp 1.2B</span>
                  <span className="material-symbols-outlined opacity-50">
                    trending_up
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- Transaction Table Container --> */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Date
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Event
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-center">
                        Qty
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Total (IDR)
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-center">
                        Payment Proof
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {/* <!-- Row 1: Pending --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-primary">
                          #TRX-88291
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-on-surface">
                          Oct 19, 2023
                        </p>
                        <p className="text-[10px] text-outline">14:22</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                            <img
                              alt="User"
                              className="w-full h-full object-cover"
                              data-alt="vibrant portrait of a young woman with curly hair smiling warmly, soft studio lighting"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWigVCCGxROQz4FhHXK9kGyoU0u-qyDReNhGoSTM3gNcBflWeBgcrwt-iZi-SsUY2XPuTwrSw7BCb85jUTjQqlMJPqXHiMyCLaVNuU5Nt5aKMZJ2b62WKO0fx95B4cvn8Kd-eV4xSTrmUoD0WRTs-JTeCPEnI97I_ixaxvc8f6-5Fv6idPDo9bZ5oYvZPadBDYOKviGcqsbRzRPTzaeg5JFY9O0GfWTbrqxMXVcJH-GYIwby5Xz2bpdKg7qCI4iBPBxgR-k9HoFMK-"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Sarah Jenkins</p>
                            <p className="text-[10px] text-outline">
                              sarah.j@example.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium truncate max-w-[150px]">
                          Global Tech Summit 2024
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold">2</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black">5.500.000</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-block p-0.5 border border-outline-variant rounded bg-white shadow-sm cursor-zoom-in">
                          <img
                            alt="Proof"
                            className="w-10 h-10 object-cover rounded-sm"
                            data-alt="close up of a digital payment confirmation receipt on a smartphone screen, crisp typography and soft reflections"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtza5OChrnWboMYz55Zi8njLi48YzcenBynrGgW03mMFonthb9HKgc1pNbpJw4dt2SdaAzw4xJtDf8pKUrxyNuceXHUcB2sR0XTx5_3UweLCUqdpDlGqIvgbxrOUAnKN6tWJUcVL0KHcsPh1YGE2ZX_KLRe108qT9-GkqmavknkL0E7WQbUtA1-IYfIKWgHE2tDzpBZ9aGsBlVPJ2vhhbGLBzGxh1MEKlc3rkoBHjTWKzabKt3VCut5Jd1vOFjF4PGcfkntHfbOHt_"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-all"
                            title="Reject"
                          >
                            <span className="material-symbols-outlined text-sm">
                              block
                            </span>
                          </button>
                          <button
                            className="p-2 text-success hover:bg-green-100 rounded-lg transition-all"
                            title="Accept"
                          >
                            <span className="material-symbols-outlined text-sm">
                              check_circle
                            </span>
                          </button>
                          <button className="text-primary text-xs font-bold hover:underline">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* <!-- Row 2: Accepted --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-primary">
                          #TRX-88285
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-on-surface">
                          Oct 19, 2023
                        </p>
                        <p className="text-[10px] text-outline">12:05</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                            <img
                              alt="User"
                              className="w-full h-full object-cover"
                              data-alt="portrait of a focused professional man with a short beard against a neutral grey background"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKBxIME3e5cAxgqy-bA2iOkw0jT3iKvh6i8K-0fMuIhJeAR_w1ur5TRnZB9u7fqCLKyRL8leFLQ4-BAfHAAsTh5brsklpNci3FVsq2UEQkEQTkTkZgXVL05GK_3OyIyCM7v9ua7DHbY0OIvwj3sioPtJjRkuS-d141lFm3gisd-oVDmUSf1pIJqY4o4GH2_vN1mN7PIBKpFkI4hepjR5XvNrw-D974db4QeG8i7IfUIbPiPtBW-HgWQIXGmfFpy0kRWrXAtwAsHqJo"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Marcus Thorne</p>
                            <p className="text-[10px] text-outline">
                              m.thorne@corp.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium truncate max-w-[150px]">
                          Jazz by the Bay
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold">4</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black">2.400.000</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-block p-0.5 border border-outline-variant rounded bg-white shadow-sm cursor-zoom-in">
                          <img
                            alt="Proof"
                            className="w-10 h-10 object-cover rounded-sm"
                            data-alt="top view of a bank transfer confirmation slip on a wooden desk with a pen next to it"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE5yL06RcXc49H9Yoh5P4yfuOR-d3DAK5lWOdZRvhMo0ulOrmF4unStbXTcq-QFYhz6qpOBjRO_QQtAUYBWZx1X8vKOA3HzZW06hMhMbZSDyeix8qTD0aeu-IuLOfb70xQbyu-A8_vi0siLFweawbksVoG5IRllbT3VOWtSfugsACsMfT_qze54wKo3jVDZJ_5JQJl8hgoWvyfz-me8QBLfA9UuFlkLdf7elVr4psaNB5T7AhWza4Vltr0GrA86EssYfKQHXHrVu3F"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-green-100 text-success">
                          Accepted
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary text-xs font-bold hover:underline">
                          Details
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 3: Rejected --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-primary">
                          #TRX-88270
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-on-surface">
                          Oct 18, 2023
                        </p>
                        <p className="text-[10px] text-outline">09:15</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                            <img
                              alt="User"
                              className="w-full h-full object-cover"
                              data-alt="smiling woman with glasses and an orange shirt, colorful artistic workspace in the background"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ki6q8RIauheqqaLff5who2bNpXviqpOYH9QICSJxP7Tf3L6G-CNsn9IWiykIjf058d8NzFjTcc5viGtIGoSL8htTwtoPE8RAm2nXwq7P0jPbCLFezOa7-jRKZkeL7sP0K28Xw7XB7Ri-wk1GZunbar0_3qK8DSX-UawJyrqatls0LrbISRGAbbvDK9yjo7wO9tyrNRihZXBy7TewHAhbXBPNwKTVtgOp1jWaArCZtk3Y_ilmpopJN_7SjMMFv4KzLb6VDdGB6NLQ"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Elena Rodriguez</p>
                            <p className="text-[10px] text-outline">
                              elena.rod@webmail.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium truncate max-w-[150px]">
                          Creative UI Masterclass
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold">1</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black">750.000</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-block p-0.5 border border-outline-variant rounded bg-white shadow-sm cursor-zoom-in">
                          <img
                            alt="Proof"
                            className="w-10 h-10 object-cover rounded-sm"
                            data-alt="blurred image of a generic paper receipt with unreadable text"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK3rdlChfnwPa2Egs_kx24j_Xak4iUr8gow57M-i3eXuiUCWyWqwZtjyTuXIzHMoguNzXnAfFR9QZIDOT03dqjSVdtP2uSdpQnbB-fEiPWdKwAU15oSNGluFPh4i8wFHHLYrGe6VWwWcFfPWvefvGnYlRE3vukMuQ0nE48kaqi2LaMi1BzAOtB8EvojldumTB3Uypk3y-bsidQwKyld8hlT66lJCNDep8QyK8K1Cllj4u5F_w7lU1zpjE7XFthe2Bvj1JZr5tMsfrW"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-error-container text-on-error-container">
                          Rejected
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary text-xs font-bold hover:underline">
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <!-- Pagination --> */}
              <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-low/20">
                <p className="text-xs text-outline font-medium">
                  Showing 1-10 of 42 transactions
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-surface-container-low transition-all disabled:opacity-30"
                    // disabled=""
                  >
                    <span className="material-symbols-outlined text-sm">
                      chevron_left
                    </span>
                  </button>
                  <button className="w-8 h-8 rounded bg-primary text-white text-xs font-bold">
                    1
                  </button>
                  <button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-low text-xs font-bold">
                    2
                  </button>
                  <button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-low text-xs font-bold">
                    3
                  </button>
                  <button className="p-1 rounded hover:bg-surface-container-low transition-all">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Audit Log Section --> */}
            <div className="bg-surface-container-low rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">
                  System Audit Log
                </h3>
                <button className="text-[10px] font-bold text-primary uppercase">
                  View Full Logs
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-xs">
                  <div className="mt-1 w-2 h-2 rounded-full bg-success ring-4 ring-green-100 shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">
                      Transaction #TRX-88285 Accepted
                    </p>
                    <p className="text-on-surface-variant">
                      Validated by Admin: Alex Orchestrator • 12:45 PM
                    </p>
                  </div>
                  <span className="text-outline">2h ago</span>
                </div>
                <div className="flex items-start gap-4 text-xs">
                  <div className="mt-1 w-2 h-2 rounded-full bg-error ring-4 ring-red-100 shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">
                      Transaction #TRX-88270 Rejected
                    </p>
                    <p className="text-on-surface-variant">
                      Reason: Payment proof unreadable • 09:30 AM
                    </p>
                  </div>
                  <span className="text-outline">5h ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
