export default function CreateEventPage() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons text-white text-xl">
                    event
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight text-primary">
                  EventHub
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Dashboard
                </a>
                <a className="text-sm font-medium text-primary" href="#">
                  Events
                </a>
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Attendees
                </a>
                <a
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Analytics
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Save Draft
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* <!-- Breadcrumb & Header --> */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <a className="hover:text-primary transition-colors" href="#">
            Dashboard
          </a>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <a className="hover:text-primary transition-colors" href="#">
            Events
          </a>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            Create New Event
          </span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            Create New Event
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Set up your event details, tickets, and schedule to start selling.
          </p>
        </div>
        <form className="space-y-12">
          {/* <!-- Section 1: Basic Info --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                1
              </span>
              <h2 className="text-xl font-bold">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Name
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  placeholder="e.g. Jakarta Tech Summit 2024"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3 appearance-none">
                  <option>Select a category</option>
                  <option>Technology</option>
                  <option>Music</option>
                  <option>Business</option>
                  <option>Art</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Location
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                    location_on
                  </span>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3"
                    placeholder="Search for a venue or city"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section 2: Description & Media --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                2
              </span>
              <h2 className="text-xl font-bold">Description &amp; Media</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Description
                </label>
                <textarea
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  placeholder="Tell people what your event is about..."
                  rows={5}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Cover Image
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">
                      image
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PNG, JPG or WEBP (Max. 5MB, Recommended: 1200x630px)
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section 3: Date & Time --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                3
              </span>
              <h2 className="text-xl font-bold">Date &amp; Time</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Start Date &amp; Time
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      calendar_today
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="date"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      schedule
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="time"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  End Date &amp; Time
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      calendar_today
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="date"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      schedule
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="time"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section 4: Tickets --> */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  4
                </span>
                <h2 className="text-xl font-bold">Ticket Tiers</h2>
              </div>
              <button
                className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                Add Tier
              </button>
            </div>
            <div className="space-y-4">
              {/* <!-- Ticket Item --> */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Ticket Type Name
                      </label>
                      <input
                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                        placeholder="e.g. Early Bird"
                        type="text"
                        value="Early Bird"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Availability
                      </label>
                      <select className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm">
                        <option>Paid</option>
                        <option>Free</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Price (IDR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-sm text-slate-500">
                          Rp
                        </span>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                          placeholder="0"
                          type="number"
                          value="250000"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Capacity
                      </label>
                      <input
                        className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                        placeholder="e.g. 100"
                        type="number"
                        value="50"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="text-slate-400 hover:text-red-500 transition-colors p-2"
                  type="button"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
              {/* <!-- Additional ticket (Draft/Blank) --> */}
              <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-center">
                <button
                  className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                  Create another ticket type
                </button>
              </div>
            </div>
          </section>
          {/* <!-- Final Actions --> */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                className="rounded text-primary focus:ring-primary border-slate-300"
                id="terms"
                type="checkbox"
              />
              <label
                className="text-sm text-slate-600 dark:text-slate-400"
                htmlFor="terms"
              >
                I agree to the{" "}
                <a className="text-primary hover:underline" href="#">
                  Terms &amp; Conditions
                </a>{" "}
                of EventManager.
              </label>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                className="w-full sm:w-auto px-10 py-3 text-sm font-bold text-white bg-primary rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Create Event
                <span className="material-symbols-outlined text-lg">
                  rocket_launch
                </span>
              </button>
            </div>
          </div>
        </form>
        {/* <!-- Preview Card Sticky (Optional visual element) --> */}
        <div className="mt-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready to launch?</h3>
              <p className="text-white/80 max-w-md">
                Your event will be visible to thousands of potential attendees
                as soon as you hit publish. You can still edit details later.
              </p>
            </div>
            <div className="flex -space-x-4">
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-200 overflow-hidden"
                data-alt="Avatar of organizer one"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKi1UpjzUYTMD5_UooKRwD7MWQ1IeOFzRlUUlAALozP_OpTKAe6AdS1GiUBLYQr7qeuMR4u_YswF3u_VZYqbR_Q3ZSEo4NGLJMimulqjOKVeLkDKqLTDrFqfZFvI3zxk6PjMhfB40cBEt6nEO1hzi8nH6yn6maxpTIFrEAKpwSC_RaNG9iEhxiSN9zFZeFx2dbzny9Nrt6IE52OZyC91lSElo3b-KWvGYdV8-9rUBizaGdG6xHlLzsAFMRpClLYMfKsxBTyBM8wY3V')`,
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-300 overflow-hidden"
                data-alt="Avatar of organizer two"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4RyLviiIh8CS6mOzr8UQz_KHlR2XfbDnBssMsUs306hlCj3iSShiYiSOn_N14etCs0AX50rTvGdtOOifg-6Cybs6oXPFst05CXuMfQiHO_2ByMNN5TBAH6s3kwDe4wqyKe_unCjiKJXI5-afi94UKAiEZRJnTYUpPBvX7Oss0tYuhvF3tlh_zuGttOLYdxjXQudJXxMO3vBX28ztqbHQPSuIOwHOrCFguXYlDZrsoN_69r03ZGHQm6_1kPwvhzxTDbONp1d4HoCwR')`,
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-400 overflow-hidden"
                data-alt="Avatar of organizer three"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ2fSeMEtEZohsX4jSnRpwWAKnD0FykgpZ35yVZhm_JGzKCWKIZkqwVQHiKDw8yzXMfS_CfuDM4LIdK8wbWqhRRX4vLNf9hZXE6fLyVxwNy-9EzIjXS_XAQN5Eb__wnUw6s103G2oWiYIkJ0nCxrqXUhE008FuooWZqqfsxXGKK0VBEkMj81lmX7lt-6iia41hYxNr_FUJyluWgQen9TkrphsRQuXY_C2eAh8MYNoLFz1aUpeYV7VHKpOmEubiYKXgwdDgjiKNbmk')`,
                }}
              ></div>
              <div className="h-12 w-12 rounded-full border-4 border-white/20 bg-primary/80 flex items-center justify-center text-xs font-bold">
                +12
              </div>
            </div>
          </div>
          {/* <!-- Abstract background shape --> */}
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </main>
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© 2024 EventManager Platform. All rights reserved.</p>
      </footer>
    </>
  );
}
