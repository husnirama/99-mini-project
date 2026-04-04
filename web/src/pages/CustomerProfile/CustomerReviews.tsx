import SideNavigation from "@/components/customer/SideNavigation";
import TopNavigation from "@/components/customer/TopNavigation";

export default function CustomerTickets() {
  return (
    <>
      {/* top navigation */}
      <TopNavigation />
      <div className="max-w-9xl flex gap-8 p-6 lg:p-10">
        {/* side navigation */}
        <SideNavigation />
        {/* main content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  alt="Large User Profile"
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdOy3S697-0rTw3sGeoHk6IB6_0zE21gDWOEqJyrziw5s8g2kQX28qb6TlT2Md--j9Z88s6hLb9Ms0lXmZb08CtUfBOIYb1cW_413SY48ssfwXUVDkNm4vpLHqC2oprhg1ZpIKMJS4_nBTL5vtHYdRyXklt68jf1Qb3UhT09aDX5pj4Yy-UXROD4_a-TZC8OjtIqT1ZpFT4pS6N6H1Qg5FH89u8fhEKZFCpeaYucd-fhrflWIPkD3THvRcv9OzWte4XBEOcTeBmpi3"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform">
                  <span className="material-icons-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Alex Rivera</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  alex.rivera@example.com
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-400">
                    Member since 2023
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                View Public Profile
              </button>
              <button className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">
                Edit Settings
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Total Events
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Reviews Written
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Average Rating
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-amber-500">4.8</p>
                  <span className="material-symbols-outlined text-amber-500 star-filled text-xl">
                    star
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Past Events</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  Filter by:
                </span>
                <select className="text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-1 px-3 focus:ring-primary">
                  <option>All Past Events</option>
                  <option>Awaiting Review</option>
                  <option>Reviewed</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        alt="Past Event"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgT_-pC3mM8iMLHlTedATpErAZ5BRvkxVTSsIcunXxtCrYOjiYTL-kzbmt8D9rLuJXmqlo53dnXnAxxHGYywgFlhQSUwqMko4thc1LZqcrvv2JACvwSjKC4WRkk8KAOo0oOWjTbYEZemoc5q5F1cDMNtUIc3xHL3HmDFO4kKJhoErAxGU6MZr6q8HYTEZfwFCwm1X6nuhBZ_snaDzelwY0k9ylJomf3TTuk7oUMPErTr93IcEeYBDCAMk7qqP6eMEa8HgNmAuNHHU"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-base">
                            Global Food Carnival 2024
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <span className="material-icons-outlined text-sm">
                              calendar_today
                            </span>{" "}
                            Jan 20, 2024
                            <span className="mx-2">•</span>
                            <span className="material-icons-outlined text-sm">
                              location_on
                            </span>{" "}
                            Sentul International Circuit
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-100 dark:border-green-800/50">
                          <span className="material-symbols-outlined text-sm star-filled">
                            check_circle
                          </span>
                          REVIEWED
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-amber-500">
                            <span className="material-symbols-outlined text-sm star-filled">
                              star
                            </span>
                            <span className="material-symbols-outlined text-sm star-filled">
                              star
                            </span>
                            <span className="material-symbols-outlined text-sm star-filled">
                              star
                            </span>
                            <span className="material-symbols-outlined text-sm star-filled">
                              star
                            </span>
                            <span className="material-symbols-outlined text-sm star-filled">
                              star
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Jan 22, 2024
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                          "The variety of food was incredible! Well organized
                          and the mobile app for ordering worked flawlessly.
                          Can't wait for next year."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/30 dark:border-primary/20 overflow-hidden shadow-md ring-1 ring-primary/5">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        alt="Past Event"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD_Cf3xilgC0eAUyVZhzmnE0tVHXNX_Alw-pTXwc20EKB9S_Vi4yBM5CSlnCLYbRjon-QR6xGp35iVHVxSYG6pbPoJLFbGE72odFrSI5tJSs6uZGw30uv2OXDA1JaZ5Q2m99Fe1AXAJ2K1BlPlQYzF6ZRQPkMgZvY7S70i0tzqtqBYGwP_Iggnk0FRKL4I01kgXseLFKN1ehONpcKoXADOVlIqkgYRjCvoVIWWOwqxjYvpaGcLwQDMAJTqfrbXRdG12uAdxa6rcYQu"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-base">
                            UI/UX Designer Meetup 2024
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <span className="material-icons-outlined text-sm">
                              calendar_today
                            </span>{" "}
                            March 12, 2024
                            <span className="mx-2">•</span>
                            <span className="material-icons-outlined text-sm">
                              location_on
                            </span>{" "}
                            Co-working Space ID
                          </p>
                        </div>
                        <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                          <span className="material-icons-outlined text-sm">
                            flag
                          </span>{" "}
                          Report Issue
                        </button>
                      </div>
                      <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5">
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            How was your experience?
                          </label>
                          <div className="flex gap-1 mb-4">
                            <button className="text-amber-400 hover:text-amber-500 transition-colors">
                              <span className="material-symbols-outlined text-3xl star-filled">
                                star
                              </span>
                            </button>
                            <button className="text-amber-400 hover:text-amber-500 transition-colors">
                              <span className="material-symbols-outlined text-3xl star-filled">
                                star
                              </span>
                            </button>
                            <button className="text-amber-400 hover:text-amber-500 transition-colors">
                              <span className="material-symbols-outlined text-3xl star-filled">
                                star
                              </span>
                            </button>
                            <button className="text-amber-400 hover:text-amber-500 transition-colors">
                              <span className="material-symbols-outlined text-3xl star-filled">
                                star
                              </span>
                            </button>
                            <button className="text-slate-200 dark:text-slate-700 hover:text-amber-400 transition-colors">
                              <span className="material-symbols-outlined text-3xl">
                                star
                              </span>
                            </button>
                          </div>
                          <textarea
                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm p-4 focus:ring-primary focus:border-primary transition-all min-h-[100px]"
                            placeholder="Share details of your experience to help others..."
                          ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <span className="material-icons-outlined text-sm">
                              verified
                            </span>
                            Your review will be public
                          </p>
                          <div className="flex gap-3">
                            <button className="px-5 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                              Cancel
                            </button>
                            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all">
                              Submit Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        alt="Past Event"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeYybI2RqEW8sTO2hgRqGTUIEsan2Kj-H0dg092eUNHGm0_SN5LU3E7RLQhfGVzC02ql7Nn-lKU7nCTNm7CYoaOEUD0ZkdzcW24mEyqs5OVnN1gZhf1McHVy30x03E5c_eSnKPxtVdy9iuncGQPJwS3zkka92sLgYUCRfNeaT0-4zgJxr2wxpxniu8HwU5-DBEMpHZDULpYdeGf4-Ed806cuYfgN-DNtPsxtOmGaPeokXFHZKsvXBiJxNv44c05R-VyxSLzeFlbbQJ"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">
                        Jazz Under the Stars
                      </h4>
                      <p className="text-xs text-slate-500">
                        Feb 14, 2024 • City Park Amphitheater
                      </p>
                    </div>
                  </div>
                  <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold px-6 py-2.5 rounded-lg border border-primary/20">
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-center">
              <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                Show More Events
                <span className="material-icons-outlined">expand_more</span>
              </button>
            </div>
          </div>
          <div className="mt-12 p-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              Need help with your reviews or bookings?{" "}
              <a className="text-primary font-bold hover:underline" href="#">
                Contact Support
              </a>
            </p>
            <div className="mt-6 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">24</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Total Events
                </p>
              </div>
              <div className="w-[1px] bg-slate-200 dark:bg-slate-800 h-10"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Reviews Left
                </p>
              </div>
              <div className="w-[1px] bg-slate-200 dark:bg-slate-800 h-10"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">1.2M</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  IDR Saved
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
