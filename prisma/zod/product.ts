import * as z from "zod"
import { CompleteCategory, RelatedCategoryZodModel, CompleteOrderItem, RelatedOrderItemZodModel } from "./index"

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

export interface CompleteProduct extends z.infer<typeof ProductZodModel> {
  category?: CompleteCategory | null
  items: CompleteOrderItem[]
}

/**
 * RelatedProductZodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductZodModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductZodModel.extend({
  category: RelatedCategoryZodModel.nullish(),
  items: RelatedOrderItemZodModel.array(),
}))
