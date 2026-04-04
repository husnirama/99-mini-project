import { useAuthStore } from "@/store/auth-store";
import type { EventsSummary, TicketNumber } from "@/types/eventSummaryTypes";
import { formatEventDate } from "@/utils/eventList.utils";
import { Link } from "react-router";

function formattingTicket(tickets: TicketNumber[]) {
  const sold = tickets.reduce((sum, t) => sum + t.sold, 0);
  const quota = tickets.reduce((sum, t) => sum + t.quota, 0);
  return `${sold}/${quota}`;
}

export default function OrganizerDashboardTable({ event }: EventsSummary) {
  const organizerId = useAuthStore((state) => state.user?.id);
  const eventName = event.title;
  const eventCategory = event.category;
  const eventDate = event.createdAt;
  const eventStatus = event.status;
  const eventSold = event.ticket;
  return (
    <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4 font-bold text-on-surface">{eventName}</td>
      <td className="px-6 py-4 text-on-surface-variant">{eventCategory}</td>
      <td className="px-6 py-4 text-on-surface-variant text-sm">
        {formatEventDate(eventDate)}
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
          {eventStatus}
        </span>
      </td>
      <td className="px-6 py-4 text-on-surface font-semibold">
        {formattingTicket(eventSold)}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          <Link
            className="text-primary hover:underline"
            to={`/events/${event.id}`}
          >
            View
          </Link>
          {organizerId ? (
            <Link
              className="text-slate-500 hover:text-primary hover:underline"
              to={`/organizer/${organizerId}/statistics?eventId=${event.id}`}
            >
              Statistics
            </Link>
          ) : null}
          <Link
            className="text-slate-500 hover:text-primary hover:underline"
            to={`/organizer/transactions?eventId=${event.id}`}
          >
            Transactions
          </Link>
        </div>
      </td>
    </tr>
  );
}
