import * as z from "zod"

export const UserZodModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
