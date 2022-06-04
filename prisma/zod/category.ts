import * as z from "zod"

export const CategoryZodModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
