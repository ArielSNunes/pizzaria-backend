import * as z from "zod"

export const OrderZodModel = z.object({
  id: z.string(),
  table: z.number().int(),
  status: z.boolean(),
  draft: z.boolean(),
  name: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
