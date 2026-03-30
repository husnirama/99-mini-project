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
  title: string;
  category: string;
  createdAt: string;
  status: string;
  ticket: TicketNumber[];
};

export type EventDashboard = {
  numberOfEvent: string;
  numberOfActiveEvent: string;
  numberTransaction: string;
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
