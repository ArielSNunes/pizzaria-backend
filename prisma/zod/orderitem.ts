import * as z from "zod"

export const OrderItemZodModel = z.object({
  id: z.string(),
  amount: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  orderId: z.string().nullish(),
  productId: z.string().nullish(),
})
