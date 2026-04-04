import type { EventCardProps } from "@/types/eventListTypes";
import {
  getEventImage,
  getEventLocation,
  getLowestPrice,
  formatPrice,
} from "@/utils/eventList.utils";
import { Link } from "react-router";
export default function FeatureEventCard({ event }: EventCardProps) {
  const image = getEventImage(event);
  const location = getEventLocation(event);
  const lowestPrice = getLowestPrice(event.ticket);

  const date = new Date(event.eventDateStart);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  return (
    <Link
      to={`/events/${event.id}`}
      className="group bg-white dark:bg-slate-900 rounded-card-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={image}
        />
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center shadow-lg">
          <span className="block text-[10px] font-extrabold text-primary uppercase tracking-tighter">
            {month}
          </span>
          <span className="block text-xl font-black leading-none text-slate-900 dark:text-white">
            {day}
          </span>
        </div>
        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors">
          <span className="material-symbols-outlined font-light">favorite</span>
        </span>
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg uppercase tracking-wider">
            Selling Fast
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors leading-tight">
          {event.title}
        </h3>
        <div className="flex items-center text-sm text-neutral-muted mb-5">
          <span className="material-icons text-base mr-1.5 text-slate-400">
            location_on
          </span>
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
              Tickets from
            </span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              {lowestPrice === null
                ? "Price TBA"
                : lowestPrice === 0
                  ? "FREE"
                : `IDR ${formatPrice(lowestPrice)}`}
            </span>
          </div>
          <span className="rounded-lg bg-primary/10 px-5 py-2.5 font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white">
            Get Tickets
          </span>
        </div>
      </div>
    </Link>
  );
}
