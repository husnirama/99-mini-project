// export interface CreateEventInput {
//   organizerId: number;
//   title: string;
//   eventDate: Date;
//   eventDateStart: Date;
//   eventDateEnd: Date;
//   status: "DRAFT" | "PUBLISHED" | "CANCELED";
//   eventDescription?: string;
//   eventTnC?: string;
//   venues: Array<{
//     name: string;
//     addressLine: string;
//     city: string;
//     region?: string;
//     country: string;
//     latitude?: string;
//     longitude?: string;
//   }>;
//   ticketTypes: Array<{
//     name: string;
//     price: number;
//     quota: number;
//     salesStartAt: Date;
//     salesEndAt: Date;
//     status: "ACTIVE" | "HIDDEN" | "SOLD_OUT";
//     contactPerson: string;
//     emailContactPerson: string;
//     phoneContactPerson: string;
//   }>;
// }

export interface CreateEventInput {
  title: string;
  eventDate: Date;
  eventDateStart: Date;
  eventDateEnd: Date;
}
