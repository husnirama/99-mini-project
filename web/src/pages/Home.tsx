export default function Home() {
  return (
    <>
      <header className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08)_0%,transparent_70%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Find your next <br />
            <span className="text-primary">extraordinary</span> moment.
          </h1>
          <p className="text-lg md:text-xl text-neutral-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover the best events in your city, from intimate jazz sessions
            to global tech summits.
          </p>
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center gap-1 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-icons text-primary mr-3">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium placeholder:text-slate-400"
                placeholder="What are you looking for?"
                type="text"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-100 dark:bg-slate-800"></div>
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-icons text-primary mr-3">
                location_on
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-base font-medium"
                type="text"
                value="Jakarta, Indonesia"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-100 dark:bg-slate-800"></div>
            <div className="flex items-center flex-1 w-full px-4 py-3 md:py-0">
              <span className="material-symbols-outlined text-primary mr-3">
                calendar_month
              </span>
              <select className="bg-transparent border-none focus:ring-0 w-full text-base font-medium appearance-none cursor-pointer">
                <option>Any Date</option>
                <option>Today</option>
                <option>This Weekend</option>
                <option>Next Week</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20">
              Search
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center mr-2">
              Trending
            </span>
            <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold hover:bg-primary hover:text-white cursor-pointer transition-all border border-transparent">
              #MusicFestival
            </span>
            <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold hover:bg-primary hover:text-white cursor-pointer transition-all border border-transparent">
              #StartupPitch
            </span>
            <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold hover:bg-primary hover:text-white cursor-pointer transition-all border border-transparent">
              #FineArts
            </span>
            <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold hover:bg-primary hover:text-white cursor-pointer transition-all border border-transparent">
              #YogaWorkshop
            </span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Experiences
              </h2>
              <p className="text-neutral-muted text-base mt-2">
                Curated events that are currently trending in Jakarta.
              </p>
            </div>
            <a
              className="group text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              href="#"
            >
              Explore all events{" "}
              <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-slate-900 rounded-card-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbDsVEmI6j-9zHTvB9TSWpXk90-HhNEmYamjP0SsqmB0J2nr4Dh_Eeeiis5eeYGZA3lGyxFqIoTurG-2eE5sSNQ5_yNJEiPteYE4LwaRfKImlMDTGU_v6UhEqiOkK1u4iSabcYcT9hM2VbU6mqk4Ktw3SeFcEOViKOORK-jglShaSqyLj6JC2MV7aZ42MLy-BuKXXVMFchM9FfhR2nEskFS4uMxa8ZB82anEvf17wkT2mcIRW-rVcpnwqBSj9v4EGXwKwzX7bnN6fE"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center shadow-lg">
                  <span className="block text-[10px] font-extrabold text-primary uppercase tracking-tighter">
                    Dec
                  </span>
                  <span className="block text-xl font-black leading-none text-slate-900 dark:text-white">
                    15
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                  <span className="material-symbols-outlined font-light">
                    favorite
                  </span>
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg uppercase tracking-wider">
                    Selling Fast
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors leading-tight">
                  Java Jazz Festival 2024
                </h3>
                <div className="flex items-center text-sm text-neutral-muted mb-5">
                  <span className="material-icons text-base mr-1.5 text-slate-400">
                    location_on
                  </span>
                  <span>JIExpo Kemayoran, Jakarta</span>
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Tickets from
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      IDR 850.000
                    </span>
                  </div>
                  <button className="bg-primary/10 text-primary font-bold px-5 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all transform active:scale-95">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
            <div className="group bg-white dark:bg-slate-900 rounded-card-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuTuuUGBYTUHWwETdNXXl5d42d5UqvYBGN9gS7iE-cIGew8B1DfHz1WVyqe4HG2Jr7QoT7SxgEHDB12TZQ4byq9OnkkW1iumGyYOYBQHkNJVHuV--jwlRexSxL7HJWqsK1cIqhefzXR1J0IFCWnYIon-Fh7HkRLE3DK1qk7nji-dcAXTg2D25YVdcAgiFacbmdPCR3qC92oxADI9b3cAF9Dn9HLRaUeNKdBXBzDhFi8HsRNpGtX6PQWWPrZsEqVgnZLDFCGJ9GncaL"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center shadow-lg">
                  <span className="block text-[10px] font-extrabold text-primary uppercase tracking-tighter">
                    Jan
                  </span>
                  <span className="block text-xl font-black leading-none text-slate-900 dark:text-white">
                    22
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                  <span className="material-symbols-outlined font-light">
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors leading-tight">
                  Global Tech Summit
                </h3>
                <div className="flex items-center text-sm text-neutral-muted mb-5">
                  <span className="material-icons text-base mr-1.5 text-slate-400">
                    location_on
                  </span>
                  <span>ICE BSD, Tangerang</span>
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Standard Ticket
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      IDR 1.200.000
                    </span>
                  </div>
                  <button className="bg-primary/10 text-primary font-bold px-5 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all transform active:scale-95">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
            <div className="group bg-white dark:bg-slate-900 rounded-card-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFL7akRIYjZ9nu7sar-gVavmkuop0nZ736o107UulRJRIi4cpytBDqu5kVZxRNz6vwYpCvqwOf7oNAU0ibf8SxMoRRrh0I3t5mA3SfnMvUti9P1qOLnifKC_wDWMvR5ieLoZNFeC5i81ECGh2w5DNRNjrWm6HyovftRpXpFIlkjioCy6SWq5En_xOmaqTh6pRpdGSAliQZ0InFAWZdt-RnTH1Au8KEuiiagczuzwlpAh_bGvEYCvudwlNNizvnPsal28pPcDR2okHp"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center shadow-lg">
                  <span className="block text-[10px] font-extrabold text-primary uppercase tracking-tighter">
                    Feb
                  </span>
                  <span className="block text-xl font-black leading-none text-slate-900 dark:text-white">
                    05
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                  <span className="material-symbols-outlined font-light">
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors leading-tight">
                  Culinary Workshop Bandung
                </h3>
                <div className="flex items-center text-sm text-neutral-muted mb-5">
                  <span className="material-icons text-base mr-1.5 text-slate-400">
                    location_on
                  </span>
                  <span>Dago, Bandung</span>
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Registration
                    </span>
                    <span className="text-lg font-extrabold text-accent-green">
                      FREE
                    </span>
                  </div>
                  <button className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-all transform active:scale-95 shadow-md shadow-primary/10">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center justify-between">
                  Categories
                  <button className="text-primary text-[10px] font-bold hover:underline">
                    RESET
                  </button>
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      // checked=""
                      className="w-5 h-5 rounded text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      type="checkbox"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                      Music &amp; Concerts
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      className="w-5 h-5 rounded text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      type="checkbox"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                      Tech &amp; Business
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      className="w-5 h-5 rounded text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      type="checkbox"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                      Food &amp; Drinks
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      className="w-5 h-5 rounded text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      type="checkbox"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                      Arts &amp; Culture
                    </span>
                  </label>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    type="range"
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                    <span>Free</span>
                    <span>IDR 10.000.000+</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
                  Format
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      // checked=""
                      className="w-5 h-5 text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      name="format"
                      type="radio"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      In-person
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      className="w-5 h-5 text-primary border-slate-300 dark:border-slate-700 focus:ring-primary/20 bg-white dark:bg-slate-800"
                      name="format"
                      type="radio"
                    />
                    <span className="ml-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Online Event
                    </span>
                  </label>
                </div>
              </div>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-bold text-primary mb-2">Host your event</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                  Reach thousands of people looking for experiences like yours.
                </p>
                <button className="w-full bg-primary text-white text-xs font-bold py-3 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white w-full tracking-tight">
                Events in <span className="text-primary">Jakarta</span>
              </h2>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Sort by
                </span>
                <select className="text-sm font-bold bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none py-2.5 pl-4 pr-10 cursor-pointer shadow-sm">
                  <option>Recommended</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPkHgVQf6P_PwibvYItP9EgshD3Zpa-7Kj_lYRg-hcaSSYKWeD24jS2-q_O8PB-W9M7K1l0nBF3IVcu-UzB-aOMo7QsXwG4s0W9xfUm6cxcpFhMN19Bmmj5PWT_VmY_Hcb95zabfsiYaj28c0KxH3uA3AbGdGnSm4t5RrDn3lHfKRfK_IwS6hTWPlKGI07iQulgFoV4j0_dCmwBUmzpzA_EyJqKKMHy_MyB5xiarI-041F-SHuEemF_88n6eSqVkGnOxJcMXY7uZA9"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Sat, Mar 12 • 7:00 PM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    Rooftop Networking Night
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      location_on
                    </span>{" "}
                    Thamrin, Jakarta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      IDR 250.000
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded font-bold uppercase tracking-tighter text-slate-500">
                      124 attending
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP7Rc6qZok9HMtr-gFQqmq-lkliYDeeEX_XebnxxZqt4NRhUPr6szZOmjVbsqRZkiHyyO8j2hEOHTlN9K-b3ZIGPr6M_fuF1fmxVP9S1T7ktwxiDFhx3jS77XDgJYwxAarlo9BOSe1AKCHY02EdrIPu1qlx7Iz6I-P02rJKP7M3c1-9rRVwEvr2Sp_wRwN3RLTEKltLIhuX0zeggmIWjHFj236g-BXscnR0DmbxpIjbS1NtsD_eTjNqbKj52upcIjWmb2COZIndFeH"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Sun, Mar 13 • 10:00 AM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    Modern Art Exhibition
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      location_on
                    </span>{" "}
                    Kemang, Jakarta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-accent-green">
                      FREE
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded font-bold uppercase tracking-tighter text-slate-500">
                      500+ interested
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVhM9BEPnpIaMU7x3aDd2vQqriEzwreYiUUKheJR0NjkSHqv_LrGCFo2huWS37KZrSiP5CF9g7Ufo6NXOPjhyS9dxRBDohZqjnDsJQfqPOwAOJpE6Bu7MO3iSxI-WvqgnQUTRnQeST_DRJ2H_baop4LQVkAugVUgYGJweigwpKEw4PV3JjfV8WWoLidxG-CuJlmRK3-_DOGndFfz3y8BHdpj6iA00WfowJr7SKoBHRkcOwrDix_eB14fxNtxvK5gyz01OHXXGRE9CV"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Wed, Mar 16 • 2:00 PM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    UX Design Fundamentals
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      laptop
                    </span>{" "}
                    Online Event
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      IDR 150.000
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-red-50 text-red-500 rounded font-bold uppercase tracking-tighter">
                      15 spots left
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSKvE8O67GjR5nOzKrNBTb2VjZuhoUyF3NSg3tCGASIZ7jkIXuNqkReFF-3ybX0NqkxC4nB1uHgFNO_LbrAoiRKVN5ePM-RXNtYvm7U0ExuVKSZcJQT7XofxCIGPnE1Z6VkxbGtAYuEvDYzquw-IivJphfZhP3QLH-T1FbuklP4yKaxCBX7IzEnIqSl6z0s03uqmvocEyFxiX82jAmz2j4seq2cBm8GxySEAq7ftON142eG6vWErUCxlSq_pf0ydGqbYOvqPq42SMV"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Fri, Mar 18 • 9:00 PM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    Jakarta Jazz Session
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      location_on
                    </span>{" "}
                    Senayan, Jakarta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      IDR 450.000
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-orange-50 text-orange-500 rounded font-bold uppercase tracking-tighter">
                      Almost Full
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZLoc2nwKRwSBQ0BKCZPXDdWvjdA4huKHcVAbLVUhPa8W6SEPpxi3Wi_3T-Sa991za4sUoyFFZ6w_8JvKeHp_W13eaKjbMm44xxOFlXvMMDDrDi-rDJPVUUX2d8Ypt3ywZngEl4PsYj6vClG5-kwaVepOZUy4qI2ececk6nRVTl6re_JqeLmWJ-3EFWH8apvs9Y_h2JRtXyxvzP6M9q9OJkKfAOnvqWHMeqRvhcsHFHp4hrE5jSc5rvgPmCEq_mP544j8Xj7nZelf"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Mon, Mar 21 • 1:00 PM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    Founder's Breakfast
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      location_on
                    </span>{" "}
                    SCBD, Jakarta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      IDR 200.000
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-blue-50 text-blue-500 rounded font-bold uppercase tracking-tighter">
                      Invite Only
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbslqZsevpKHmfFyYRmwogx6vmBvkkYZMg4u0Wcdf6cijqvQma7-g-_Fv9d3iUgHnZEc3mFRGm2qLRPgyaAqKatWl2b4qsPXAFhIo9O6FMkeiPe9SdRqT3kMiNSkARWhcJOsBmnzrhhxKxAeWyJkj_LTdogCkbRObpVJDXIOKuDJYD9o-2gng2Y1hF0EGrJ9ChCEQ1i32aLmqBqEsdEbRf9crodWzLT7yWjTdqgIiYmYmogmZzHMLNSojrN0tEr4IzukSSvNcrqJ3I"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
                    <span className="material-symbols-outlined text-base font-light">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                    Sat, Mar 26 • 6:00 PM
                  </p>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    Wine Tasting Soiree
                  </h4>
                  <p className="text-sm text-neutral-muted mb-5 flex items-center">
                    <span className="material-icons text-sm mr-1.5 text-slate-400">
                      location_on
                    </span>{" "}
                    Menteng, Jakarta
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      IDR 750.000
                    </span>
                    <span className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded font-bold uppercase tracking-tighter">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <nav className="inline-flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white font-extrabold shadow-lg shadow-primary/20">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold">
                  2
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold">
                  3
                </button>
                <span className="px-4 text-slate-300">...</span>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold">
                  12
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-icons">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" fill="none" viewBox="0 0 100 100">
            <pattern
              height="20"
              id="grid"
              patternUnits="userSpaceOnUse"
              width="20"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
              ></path>
            </pattern>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                Never miss an <br />
                unforgettable moment.
              </h2>
              <p className="text-blue-100 text-xl font-medium opacity-90">
                Get weekly curated event recommendations and exclusive
                early-bird access to tickets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 px-8 py-5 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50 border-none placeholder:text-slate-400 text-lg shadow-2xl"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-slate-950 text-white font-extrabold px-10 py-5 rounded-2xl hover:bg-black transition-all transform active:scale-95 shadow-2xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
