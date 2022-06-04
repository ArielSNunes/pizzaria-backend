import * as z from "zod"
import { CompleteProduct, RelatedProductZodModel } from "./index"

export const CategoryZodModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCategory extends z.infer<typeof CategoryZodModel> {
  products: CompleteProduct[]
}

/**
 * RelatedCategoryZodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryZodModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryZodModel.extend({
  products: RelatedProductZodModel.array(),
}))
