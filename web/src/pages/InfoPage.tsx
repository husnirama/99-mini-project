import { getOrganizerEntryPath } from "@/config/site-navigation";
import { useAuthStore } from "@/store/auth-store";
import { Link, useLocation } from "react-router";

type InfoPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  primaryCta: {
    label: string;
    to: string;
  };
};

const INFO_PAGE_CONTENT: Record<string, InfoPageContent> = {
  "/about": {
    eyebrow: "About EventHub",
    title: "A focused platform for discovering and running live events.",
    description:
      "EventHub connects attendees with curated experiences while giving organizers a clean workflow for publishing, selling, and reviewing ticket payments.",
    sections: [
      {
        title: "For attendees",
        body: "Browse upcoming experiences, compare ticket tiers, and keep your payment history in one place.",
      },
      {
        title: "For organizers",
        body: "Create events, review incoming payments, monitor dashboard health, and stay aligned with your attendee list.",
      },
      {
        title: "Built for clarity",
        body: "The current app focuses on the booking journey, organizer operations, and reliable transaction management.",
      },
    ],
    primaryCta: {
      label: "Browse Events",
      to: "/",
    },
  },
  "/pricing": {
    eyebrow: "Pricing",
    title: "Simple pricing guidance for the current EventHub workflow.",
    description:
      "The repository currently centers on the event discovery and organizer operations flow. Ticket pricing is defined per event and managed directly by organizers during event creation.",
    sections: [
      {
        title: "Ticket pricing",
        body: "Each event can publish multiple ticket tiers with its own quota and price.",
      },
      {
        title: "Promotions",
        body: "Organizers can configure vouchers and discounts as part of the event setup process.",
      },
      {
        title: "Need organizer access?",
        body: "Use the host flow below to start creating events with organizer-specific tooling.",
      },
    ],
    primaryCta: {
      label: "Start Hosting",
      to: "/host",
    },
  },
  "/careers": {
    eyebrow: "Careers",
    title: "The current product experience is centered on the app itself.",
    description:
      "There isn’t a dedicated careers backend in this repository, so this page points people back into the working product flows instead of a dead destination.",
    sections: [
      {
        title: "Product focus",
        body: "This codebase is currently optimized for browsing events, buying tickets, and organizer operations.",
      },
      {
        title: "Explore the platform",
        body: "If you're evaluating the product, the best starting point is the event listing and organizer host flow.",
      },
      {
        title: "Questions",
        body: "The help center page includes the best current guidance for support-oriented questions.",
      },
    ],
    primaryCta: {
      label: "Open Help Center",
      to: "/help",
    },
  },
  "/help": {
    eyebrow: "Help Center",
    title: "Get unstuck with the current EventHub experience.",
    description:
      "Use the live product flows that already exist in this repository: account access, organizer tools, transaction history, and checkout support.",
    sections: [
      {
        title: "Account access",
        body: "Use the login and register flows to access customer or organizer functionality. Active sessions now restore automatically when a refresh session is still valid.",
      },
      {
        title: "Organizer support",
        body: "Organizers can create events, review incoming payments, inspect attendees, and update profile details from the organizer workspace.",
      },
      {
        title: "Payments and orders",
        body: "Customers can revisit transaction detail pages to upload payment proof, review status, or cancel transactions while they remain cancellable.",
      },
    ],
    primaryCta: {
      label: "Browse Events",
      to: "/",
    },
  },
  "/privacy": {
    eyebrow: "Privacy",
    title: "Privacy information for the current EventHub product scope.",
    description:
      "This repository currently stores and processes user profile, event, order, transaction, and session data that support the live product workflows present in the app.",
    sections: [
      {
        title: "Profile data",
        body: "Accounts currently include core identity fields such as name, email, role, address, referral code, and session records.",
      },
      {
        title: "Operational data",
        body: "Event, order, transaction, and organizer dashboard data are used to power the booking journey and organizer workspace.",
      },
      {
        title: "Session handling",
        body: "Access sessions are persisted locally in the web app and refreshed against the backend while the refresh session remains valid.",
      },
    ],
    primaryCta: {
      label: "Return Home",
      to: "/",
    },
  },
  "/terms": {
    eyebrow: "Terms",
    title: "Terms guidance for the current event marketplace flow.",
    description:
      "The app currently supports browsing events, creating orders, managing transactions, and operating organizer dashboards. This page exists so legal and policy links route somewhere intentional inside the current product.",
    sections: [
      {
        title: "Accounts",
        body: "Users are expected to provide valid account information for login, checkout, and organizer operations.",
      },
      {
        title: "Transactions",
        body: "Transaction status changes depend on order lifecycle rules, organizer review, expiration handling, and payment proof flows implemented in the backend.",
      },
      {
        title: "Organizer tooling",
        body: "Organizer access is scoped to the organizer's own data and protected routes within the current repository.",
      },
    ],
    primaryCta: {
      label: "Open Help Center",
      to: "/help",
    },
  },
  "/host": {
    eyebrow: "Host on EventHub",
    title: "Create events, review payments, and manage attendees from one workflow.",
    description:
      "The organizer experience in this repository already includes event creation, transaction review, attendee views, organizer settings, and dashboard metrics.",
    sections: [
      {
        title: "Launch events",
        body: "Create an event with venue details, ticket tiers, images, and promotions from the organizer event creation flow.",
      },
      {
        title: "Review payments",
        body: "Use the organizer transaction queue to approve, reject, or cancel payments according to the current business rules.",
      },
      {
        title: "Operate confidently",
        body: "Track weekly sales, attendee totals, and organizer profile information in the dedicated workspace.",
      },
    ],
    primaryCta: {
      label: "Become an Organizer",
      to: "/auth/register?role=EVENT_ORGANIZER",
    },
  },
};

export default function InfoPage() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const fallbackContent = INFO_PAGE_CONTENT["/help"];
  const pageContent = INFO_PAGE_CONTENT[location.pathname] ?? fallbackContent;
  const primaryCta =
    location.pathname === "/host"
      ? {
          label:
            user?.role === "EVENT_ORGANIZER" ? "Open Organizer Tools" : "Become an Organizer",
          to: getOrganizerEntryPath(user),
        }
      : pageContent.primaryCta;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {pageContent.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
          {pageContent.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          {pageContent.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
            to={primaryCta.to}
          >
            {primaryCta.label}
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            to="/"
          >
            Browse Events
          </Link>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {pageContent.sections.map((section) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            key={section.title}
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
