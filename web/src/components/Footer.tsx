function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">event</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                EventHub
              </span>
            </div>
            <p className="text-neutral-muted mb-8 max-w-xs leading-relaxed">
              The world's largest marketplace for live experiences. We empower
              anyone to create, share, find and attend events that fuel their
              passions.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-icons">facebook</span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-icons text-xl font-bold">
                  camera_alt
                </span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="material-icons">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-neutral-muted">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Find Events
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Categories
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Host</h4>
            <ul className="space-y-4 text-sm text-neutral-muted">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Create Events
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Sell Tickets Online
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Event Marketing
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-muted">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-muted">
            © 2024 EventHub Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center text-sm text-neutral-muted">
              <span className="material-icons text-sm mr-1">language</span>
              <span>English (US)</span>
            </div>
            <div className="flex items-center text-sm text-neutral-muted">
              <span className="material-icons text-sm mr-1">payments</span>
              <span>IDR (Rp)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
