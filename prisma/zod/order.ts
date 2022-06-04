import * as z from "zod"
import { CompleteOrderItem, RelatedOrderItemZodModel } from "./index"

export const OrderZodModel = z.object({
  id: z.string(),
  table: z.number().int(),
  status: z.boolean(),
  draft: z.boolean(),
  name: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteOrder extends z.infer<typeof OrderZodModel> {
  items: CompleteOrderItem[]
}

/**
 * RelatedOrderZodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderZodModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderZodModel.extend({
  items: RelatedOrderItemZodModel.array(),
}))
