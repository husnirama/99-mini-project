export interface UploadedFile {
  id: string;
  name: string;
  rawFile: File;
  preview: string;
}

export interface LocationSuggestion {
  placeId: string;
  description: string;
}

export type TicketAvailability = "Paid" | "Free";

export interface TicketTier {
  id: string;
  name: string;
  availability: TicketAvailability;
  price: string;
  capacity: string;
}

export type PromotionDiscountType = "PERCENTAGE" | "FIXED";

export interface PromotionVoucher {
  id: string;
  name: string;
  code: string;
  discountType: PromotionDiscountType;
  discountValue: string;
  maxDiscount: string;
  minPurchase: string;
  quota: string;
  startDate: string;
  endDate: string;
}
