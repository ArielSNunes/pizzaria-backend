import * as z from "zod"
import { CompleteOrder, RelatedOrderZodModel, CompleteProduct, RelatedProductZodModel } from "./index"

export const OrderItemZodModel = z.object({
  id: z.string(),
  amount: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  orderId: z.string().nullish(),
  productId: z.string().nullish(),
})

export interface CompleteOrderItem extends z.infer<typeof OrderItemZodModel> {
  order?: CompleteOrder | null
  product?: CompleteProduct | null
}

/**
 * RelatedOrderItemZodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderItemZodModel: z.ZodSchema<CompleteOrderItem> = z.lazy(() => OrderItemZodModel.extend({
  order: RelatedOrderZodModel.nullish(),
  product: RelatedProductZodModel.nullish(),
}))
