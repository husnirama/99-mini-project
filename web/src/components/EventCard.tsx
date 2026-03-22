import type { EventCardProps } from "@/types/eventListTypes";
import {
  getEventImage,
  getEventLocation,
  getLowestPrice,
  formatEventDate,
  formatEventTime,
  formatPrice,
} from "@/utils/eventList.utils";
import { Link } from "react-router";

export default function EventCard({ event }: EventCardProps) {
  const lowestPrice = getLowestPrice(event.ticket);
  const image = getEventImage(event);
  const location = getEventLocation(event);
  return (
    <Link
      to={`/events/${event.id}`}
      className="bg-white dark:bg-slate-900 rounded-card-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl block"
    >
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
        />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-md transition-all">
          <span className="material-symbols-outlined text-base font-light">
            favorite
          </span>
        </button>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
          {formatEventDate(event.eventDateStart)} •{" "}
          {formatEventTime(event.eventDateStart)}
        </p>
        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h4>
        <p className="text-sm text-neutral-muted mb-5 flex items-center">
          <span className="material-icons text-sm mr-1.5 text-slate-400">
            location_on
          </span>{" "}
          {location}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`font-extrabold ${
              lowestPrice === 0
                ? "text-accent-green"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {lowestPrice === null
              ? "Price TBA"
              : lowestPrice === 0
                ? "FREE"
                : `IDR ${formatPrice(lowestPrice)}`}
          </span>
          <span className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded font-bold uppercase tracking-tighter text-slate-500">
            {event.status}
          </span>
        </div>
      </div>
      {/* </div>
      </div> */}
    </Link>
  );
}
