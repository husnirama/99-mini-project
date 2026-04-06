export type TicketAvailability = "Paid" | "Free";
export type PromotionDiscountType = "PERCENTAGE" | "FIXED";

export interface VenueInput {
  name: string;
  addressLine: string;
  city: string;
  region?: string;
  country: string;
  latitude?: string;
  longitude?: string;
}

export interface TicketTypeInput {
  id?: number;
  name: string;
  availability: TicketAvailability;
  price: string;
  capacity: string;
}

export interface ContactInfoInput {
  contactName: string;
  contactEmail: string;
  countryCode: string;
  phoneNumber: string;
}

export interface PromotionInput {
  id?: number;
  name: string;
  code: string;
  discountType: PromotionDiscountType;
  discountValue: string;
  maxDiscount?: string;
  minPurchase?: string;
  quota: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateEventInput {
  title: string;
  category?: string;
  eventDescription?: string;
  eventDateStart: Date;
  eventDateEnd: Date;
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
  termsAccepted: boolean;
  venue: VenueInput;
  ticketTypes: TicketTypeInput[];
  contactInfo: ContactInfoInput;
  promotions?: PromotionInput[];
}
