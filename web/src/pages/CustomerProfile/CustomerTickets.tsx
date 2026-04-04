import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";

export default function CustomerTickets() {
  return (
    <>
      {/* top navigation */}
      <TopNavigation />
      <div className="max-w-9xl flex gap-8 p-6 lg:p-5 mx-auto">
        {/* side navigation */}
        <SideNavigation />
        {/* main content */}
        <main className="min-h-screen flex flex-col">
          {/* <!-- Content Canvas --> */}
          <div className="p-6 md:p-10 space-y-8">
            {/* <!-- Page Header --> */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  My Tickets
                </h2>
                <p className="text-on-surface-variant mt-1">
                  Manage your event bookings and view transaction history.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-secondary-container text-on-secondary-container text-sm font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>
                  Export PDF
                </button>
              </div>
            </div>
            {/* <!-- Summary Bento Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <!-- Card 1 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span
                    className="material-symbols-outlined text-6xl"
                    data-icon="confirmation_number"
                  >
                    confirmation_number
                  </span>
                </div>
                <p className="text-label-md uppercase tracking-widest text-on-surface-variant font-semibold text-xs mb-2">
                  Total Tickets
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-on-surface">24</span>
                  <span className="text-xs font-medium text-success text-green-600 flex items-center">
                    +3 this month
                  </span>
                </div>
              </div>
              {/* <!-- Card 2 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span
                    className="material-symbols-outlined text-6xl"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                </div>
                <p className="text-label-md uppercase tracking-widest text-on-surface-variant font-semibold text-xs mb-2">
                  Upcoming Events
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-on-surface">3</span>
                  <span className="text-xs font-medium text-primary">
                    Next: Dec 15
                  </span>
                </div>
              </div>
              {/* <!-- Card 3 --> */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-secondary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span
                    className="material-symbols-outlined text-6xl"
                    data-icon="stars"
                  >
                    stars
                  </span>
                </div>
                <p className="text-label-md uppercase tracking-widest text-on-surface-variant font-semibold text-xs mb-2">
                  Total Points
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-on-surface">
                    12,450
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    IDR 124k value
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- Transaction Table Container --> */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-bold text-lg">Transaction History</h3>
                <div className="flex items-center gap-2">
                  <select className="bg-surface-container-low border-none rounded-lg text-xs font-medium py-1.5 focus:ring-primary/20">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-surface-container-low/50 text-on-surface-variant uppercase text-[10px] tracking-widest font-bold">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Event Name</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Qty</th>
                      <th className="px-6 py-4">Total Paid</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {/* <!-- Row 1: Completed --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        #TXN-9021
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                            <img
                              alt="Summer Fest"
                              data-alt="vibrant neon concert stage with crowd silhouettes in purple and orange lighting, high energy music festival atmosphere"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYFF2cfcOV8OXfoRkANxrBi7Ckquce9_U7hgeVbKY_E4ojnlgkwxFqyFFw8CONqiDWNgi98QSsfNkHRk0VknjFpc_LcNeJU8Gjk1iS1n2MzPADWOoMtKRbGH8Csq3cA4PaCXszGrUE3X-zoPirqH_oPdaF9iXSNnGyvFzSyZixgZ6GWRxg6ObngeZG1Ibbh_ixU-Uf0k0NBzrNCTOyqTuzKJnOyMFIcZbT_fV_jh7JUKPPlxaDdtYDGR0auR2OvEJ1i0vv-tK_gfek"
                            />
                          </div>
                          <span className="font-bold">
                            Neon Summer Festival 2024
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        Nov 12, 2023
                      </td>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4 font-semibold text-on-surface">
                        IDR 1,250,000
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:underline font-semibold flex items-center gap-1 mr-4">
                          <span className="material-symbols-outlined text-base">
                            star
                          </span>
                          Review
                        </button>
                        <button className="text-primary hover:underline font-semibold flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            confirmation_number
                          </span>
                          View Ticket
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 2: Pending --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        #TXN-9045
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                            <img
                              alt="Tech Summit"
                              data-alt="modern tech conference hall with blue led lighting, professional speakers on stage, futuristic corporate event design"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOCxnSRzVAweorO2Sg4VHaeP89zPXtWv4hOtUKLE7iQJgObYUlFJzbLiHnqrhNpDxN2-K5W9mKGbhiFrGQ-BLH6ZuQbJm9loF1XThOKeUB9ld0M-c0Jy-tGziDcjMvNZUcu5flyuNYrbpaqpxN5QhWKD7SslQHiYCa8A1q4k-MJshSN9381ge8rKoaaYqEGNGt6VXMLBEWq2wV3IfSEwZPJJxyiItUl3C69x-ze-Av7RXDoAZgH9nxoo9yYle8Q0lM2nfRcsveNNf0"
                            />
                          </div>
                          <span className="font-bold">Global Tech Summit</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        Nov 28, 2023
                      </td>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4 font-semibold text-on-surface">
                        IDR 3,500,000
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[11px] font-bold uppercase tracking-wider">
                          Pending Payment
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-error hover:underline font-semibold flex items-center gap-1">
                            Cancel
                          </button>
                          <button className="bg-primary text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm hover:opacity-90 transition-all">
                            Pay Now
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* <!-- Row 3: Waiting Confirmation --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        #TXN-9082
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                            <img
                              alt="Jazz Night"
                              data-alt="dimly lit elegant jazz club with a saxophone player in spotlight, warm smoky atmosphere with vintage wooden textures"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj8GtY6Zth1OsJ7WVQlLFwc0Y__pKqCnuQmIhACvO4crzRVjR_m_fiCZBoRhhYE6ymhNtEkEw5GRSOALUfacGsZMiSlV2wzTHVYkPvDRXnJqFawRtHcMP0mTnaQCGPneoiLdAdhm0ASbpJpBEXS5G96ba4YxqnqHBpUGacy8d6f8CjGdGPiDMgNDulVlt_9ch41WXyqTLKoSnb6zm_4LPGOnkl7gxXVgcuZT1BJdwtF-gfeByZauQvlgxM0oUpe75h1VE7L18X-FAE"
                            />
                          </div>
                          <span className="font-bold">
                            Midnight Jazz Quartet
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        Dec 02, 2023
                      </td>
                      <td className="px-6 py-4">4</td>
                      <td className="px-6 py-4 font-semibold text-on-surface">
                        IDR 800,000
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                          Waiting Confirmation
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-on-surface font-semibold flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            receipt_long
                          </span>
                          Details
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Row 4: Canceled --> */}
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        #TXN-8822
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex items-center gap-3 opacity-60">
                          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 grayscale">
                            <img
                              alt="Workshop"
                              data-alt="close-up of hands working on pottery wheel with clay, artisan workshop setting with natural earthy tones and soft morning light"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkZw9VW0FNk_J8C_62ADw9bwo5ELsCFSiGy3C4JV1wMqQrKcVqgNCyrmlwEnvpcDN27UyJLxbWEhHYzl5WD0mU33cRJmWW8W3Ko7UEgNh2r0LGkCajhm2vz0tBDIOA9iElvqghiOGyo86u_mbSIEFHHtZEoib03uj7VNSPj2zQehywevFQffuZpbOez9lauYlaePDilswa4Bgv6Z0D0PSAfpilj2LRtXKII-CTsuyNfT7ZZLVzPAlWINBJuQy_apr3_u9v3hfzCS40"
                            />
                          </div>
                          <span className="font-bold line-through">
                            Artisan Pottery Workshop
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant/50">
                        Oct 15, 2023
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant/50">
                        1
                      </td>
                      <td className="px-6 py-4 font-semibold text-on-surface-variant/50">
                        IDR 450,000
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold uppercase tracking-wider">
                          Canceled
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-on-surface-variant/50 italic text-xs">
                          No actions available
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between">
                <p className="text-xs text-on-surface-variant">
                  Showing 4 of 24 transactions
                </p>
                <div className="flex gap-1">
                  <button className="h-8 w-8 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      chevron_left
                    </span>
                  </button>
                  <button className="h-8 w-8 rounded bg-primary text-white text-xs font-bold">
                    1
                  </button>
                  <button className="h-8 w-8 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant text-xs">
                    2
                  </button>
                  <button className="h-8 w-8 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant text-xs">
                    3
                  </button>
                  <button className="h-8 w-8 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Empty Spacer for Mobile Bottom Nav Padding --> */}
          <div className="h-20 md:hidden"></div>
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around items-center py-3 px-2 z-50 shadow-2xl">
          <a
            className="flex flex-col items-center gap-1 text-slate-400"
            href="#"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-primary" href="#">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              confirmation_number
            </span>
            <span className="text-[10px] font-bold">Tickets</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-slate-400"
            href="#"
          >
            <span className="material-symbols-outlined">redeem</span>
            <span className="text-[10px] font-medium">Rewards</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-slate-400"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </a>
        </nav>
      </div>
    </>
  );
}
