export default function OrganizerSettingPage() {
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
              className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="groups">
                groups
              </span>
              <span>Attendees</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold active:scale-95 transition-all"
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
        <main className="ml-64 pt-16 min-h-screen bg-surface-container-low">
          <div className="max-w-5xl mx-auto px-8 py-10">
            {/* <!-- Header Section --> */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">
                Account Settings
              </h1>
              <p className="text-on-surface-variant max-w-2xl">
                Manage your professional profile, security preferences, and
                account configurations for the Precision Orchestrator platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {/* <!-- Updated Section 1: Branding & Profile Information --> */}
              <section className="bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow">
                {/* <!-- Background Branding Area --> */}
                <div className="relative h-64 w-full bg-slate-200">
                  <img
                    alt="Account Background"
                    className="w-full h-full object-cover"
                    data-alt="minimalist architectural abstract background with soft blue and grey tones"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoP-4XsBL-PGBKPrCcpkykigwQI1-k_XzTBeQZZ0wtJzfoog__2jWS6YiTfTvgXrmsgWmVsqQJP5BK0AjiuGHZo0MQlsPFtilLEUrW854KkyhXaw_bHZqCk5I-iC0RNLYgrxXPNfSd882S8--zGwuo1RT5Pdgak7fJ02zEhH_NDuS9M5Po4jRmPvE-q1mdcrPbdYhFgquXiqJ_YT-sPJ0wGOc-49aVUCtII1IIK9AV-qfdfuVwAkwi7u8w7LcvnqLiXB2vTRqRKS3H"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-on-surface px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-white active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-lg">
                      image
                    </span>
                    Change Background
                  </button>
                </div>
                <div className="px-8 pb-8 flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-1/3 -mt-16 relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-surface-container-lowest bg-surface-container-lowest shadow-xl mb-4">
                          <img
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                            data-alt="high-quality portrait of a male professional with dark hair and a friendly expression, studio lighting, neutral background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqzNI96-9h8zQcywn6rGlZRfZMSf9mZ7F8DBuwBtPRuq2787tiMSovgi_n6ztcXESaKKNXk6MJMtXXY0ukL93rj1UtkXu3Tn6vd4pvZD7RVmsexJhtvgt18LYXO9rceU5u-fAb65sgeTzvnNt7dmuIxOoiaGtCE-y_qVUElHdtQHlAns9kRWCe49ODzYzVNSqg66CgQUMGar79upHOO6FnCwK80pkA0g9_kVT4Q_AXSZj1dOGj8Ru9GFt8uP4wrEGgMP12Evymo7w_"
                          />
                        </div>
                        <button
                          className="absolute bottom-4 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-4 border-surface-container-lowest active:scale-90 transition-transform flex items-center justify-center"
                          title="Change Photo"
                        >
                          <span className="material-symbols-outlined text-sm">
                            photo_camera
                          </span>
                        </button>
                      </div>
                      <h3 className="font-bold text-lg">Alex Sterling</h3>
                      <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest mt-1">
                        Senior Event Orchestrator
                      </p>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-lg mt-6">
                      <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                        Member Since
                      </h4>
                      <p className="text-sm font-semibold">October 2022</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 pt-8">
                    <h2 className="text-xl font-bold text-on-surface border-l-4 border-primary pl-4">
                      Profile Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4 font-medium"
                          type="text"
                          value="Alex Sterling"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4 font-medium"
                          type="email"
                          value="alex.sterling@precision-orchestra.com"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Contact Number
                        </label>
                        <input
                          className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4 font-medium"
                          type="tel"
                          value="+1 (555) 902-3481"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Bio / Description
                        </label>
                        <textarea
                          className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4 font-medium"
                          rows={3}
                        >
                          Strategic event architect with 10+ years experience in
                          high-stakes corporate summits and luxury gala
                          coordination.
                        </textarea>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button className="btn-primary-gradient text-white px-8 py-3 rounded-lg font-bold shadow-md active:scale-95 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- Section 2: Security & Password --> */}
              <section className="bg-surface-container-lowest rounded-xl custom-shadow p-8">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-1/3">
                    <h2 className="text-xl font-bold text-on-surface border-l-4 border-primary pl-4 mb-4">
                      Security &amp; Password
                    </h2>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Ensure your account stays secure by using a strong, unique
                      password and reviewing your login history regularly.
                    </p>
                    <div className="mt-8 p-4 bg-tertiary-fixed rounded-xl border border-tertiary-fixed-dim/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-on-tertiary-fixed">
                          shield
                        </span>
                        <span className="text-xs font-bold text-on-tertiary-fixed uppercase tracking-widest">
                          Security Tip
                        </span>
                      </div>
                      <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
                        Combine symbols, numbers, and both case types to
                        maximize password strength.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4"
                            placeholder="••••••••••••"
                            type="password"
                          />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline">
                            <span className="material-symbols-outlined text-lg">
                              visibility
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                            New Password
                          </label>
                          <input
                            className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4"
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                            Confirm New Password
                          </label>
                          <input
                            className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary py-3 px-4"
                            type="password"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                            Password Strength
                          </span>
                          <span className="text-xs font-bold text-primary">
                            STRONG
                          </span>
                        </div>
                        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden flex gap-1">
                          <div className="h-full w-1/4 bg-primary rounded-full"></div>
                          <div className="h-full w-1/4 bg-primary rounded-full"></div>
                          <div className="h-full w-1/4 bg-primary rounded-full"></div>
                          <div className="h-full w-1/4 bg-surface-variant rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button className="btn-primary-gradient text-white px-8 py-3 rounded-lg font-bold shadow-md active:scale-95 transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- Section 3: Account Recovery & Options (2FA Removed) --> */}
              <section className="bg-surface-container-lowest rounded-xl custom-shadow p-8">
                <h2 className="text-xl font-bold text-on-surface border-l-4 border-primary pl-4 mb-8">
                  Account Options
                </h2>
                <div className="space-y-8">
                  {/* <!-- Reset Password --> */}
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">
                          Account Recovery
                        </h4>
                        <p className="text-sm text-on-surface-variant">
                          Update your emergency contact email or reset via
                          external provider.
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
                      Reset Password
                    </button>
                  </div>
                  {/* <!-- Destructive Action --> */}
                  <div className="mt-12 pt-8 border-t border-outline-variant/30">
                    <div className="p-6 border border-error/20 bg-error-container/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h4 className="font-bold text-error flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>
                          Danger Zone: Delete Account
                        </h4>
                        <p className="text-sm text-on-surface-variant mt-1">
                          Once you delete your account, there is no going back.
                          All event data, historical logs, and documentation
                          will be permanently erased.
                        </p>
                      </div>
                      <button className="whitespace-nowrap bg-error text-white px-8 py-3 rounded-lg font-bold shadow-sm hover:bg-error/90 active:scale-95 transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="h-20"></div>
          </div>
        </main>
      </div>
    </>
  );
}
