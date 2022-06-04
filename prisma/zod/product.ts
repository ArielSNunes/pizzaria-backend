import * as z from "zod"

export const ProductZodModel = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  banner: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  categoryId: z.string().nullish(),
})
