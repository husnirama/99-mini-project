// import { z } from "zod";

// export const createTransactionSchema = z.object({
//   items: z
//     .array(
//       z.object({
//         ticketTypeId: z.coerce
//           .number()
//           .int("ticketTypeId must be an integer")
//           .positive("ticketTypeId must be positive"),
//         quantity: z.coerce
//           .number()
//           .int("quantity must be an integer")
//           .min(1, "quantity must be at least 1"),
//       }),
//     )
//     .min(1, "At least one ticket must be selected"),
// });
