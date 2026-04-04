import type { User } from "@/api/types";

export type SiteLink = {
  label: string;
  to: string;
};

export const FOOTER_LINK_GROUPS: Array<{
  title: string;
  links: SiteLink[];
}> = [
  {
    title: "Explore",
    links: [
      { label: "Find Events", to: "/" },
      { label: "Categories", to: "/" },
      { label: "Pricing", to: "/pricing" },
      { label: "Help Center", to: "/help" },
    ],
  },
  {
    title: "Host",
    links: [
      { label: "Create Events", to: "/host" },
      { label: "Sell Tickets Online", to: "/host" },
      { label: "Event Marketing", to: "/host" },
      { label: "Success Stories", to: "/host" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

export const FOOTER_SHORTCUTS: SiteLink[] = [
  { label: "About", to: "/about" },
  { label: "Host", to: "/host" },
  { label: "Help", to: "/help" },
];

export function getOrganizerStatisticsPath(userId?: number | null) {
  return userId ? `/organizer/${userId}/statistics` : "/organizer/dashboard";
}

export function getOrganizerAttendeesPath(userId?: number | null) {
  return userId ? `/organizer/${userId}/attendees` : "/organizer/dashboard";
}

export function getOrganizerSettingsPath(userId?: number | null) {
  return userId ? `/organizer/${userId}/settings` : "/organizer/dashboard";
}

export function getOrganizerEntryPath(user?: Pick<User, "id" | "role"> | null) {
  if (user?.role === "EVENT_ORGANIZER") {
    return "/organizer/create-event";
  }

  if (!user) {
    return "/auth/register?role=EVENT_ORGANIZER";
  }

  return "/help";
}
