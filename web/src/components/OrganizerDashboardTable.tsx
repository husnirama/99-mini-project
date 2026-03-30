import type { EventsSummary, TicketNumber } from "@/types/eventSummaryTypes";
import { formatEventDate } from "@/utils/eventList.utils";

function formattingTicket(tickets: TicketNumber[]) {
  const sold = tickets.reduce((sum, t) => sum + t.sold, 0);
  const quota = tickets.reduce((sum, t) => sum + t.quota, 0);
  return `${sold}/${quota}`;
}

export default function OrganizerDashboardTable({ event }: EventsSummary) {
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
        <div className="flex gap-2">
          <button
            className="text-outline hover:text-primary transition-colors"
            title="Edit"
          >
            <span
              className="material-symbols-outlined text-lg"
              data-icon="edit"
            >
              edit
            </span>
          </button>
          <button
            className="text-outline hover:text-primary transition-colors"
            title="Analytics"
          >
            <span
              className="material-symbols-outlined text-lg"
              data-icon="analytics"
            >
              analytics
            </span>
          </button>
          <button
            className="text-outline hover:text-primary transition-colors"
            title="More"
          >
            <span
              className="material-symbols-outlined text-lg"
              data-icon="more_vert"
            >
              more_vert
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}
