export type TicketNumber = {
  quota: number;
  sold: number;
};

export type WeeklySales = {
  day: string;
  fullDate: string;
  revenue: number | string;
};

export type EventSummary = {
  id: number;
  title: string;
  category: string | null;
  createdAt: string;
  status: string;
  ticket: TicketNumber[];
};

export type EventDashboard = {
  numberOfEvent: number;
  numberOfActiveEvent: number;
  numberTransaction: number;
  sumRevenue: {
    _sum: {
      totalAmount: number | null;
    };
  };
  eventSummary: EventSummary[];
  numberAttendees: number;
  weeklySales: WeeklySales[];
} | null;

export type EventsSummary = {
  event: EventSummary;
};
