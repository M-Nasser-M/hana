import { Input, array, date, number, object, string } from "valibot";
import { MetaSchema } from "./sharedTypes";

export const GovernoratesDeliveryElementSchema = object({
  id: number(),
  delivery_price: number(),
  governorate_name_ar: string(),
  governorate_name_en: string(),
});

export type GovernoratesDeliveryElement = Input<
  typeof GovernoratesDeliveryElementSchema
>;

export const GovernoratesDeliveryDataSchema = object({
  id: number(),
  governoratesDelivery: array(GovernoratesDeliveryElementSchema),
  createdAt: date(),
  updatedAt: date(),
  publishedAt: date(),
});

export type Data = Input<typeof GovernoratesDeliveryDataSchema>;

export const GovernoratesDeliverySchema = object({
  data: GovernoratesDeliveryDataSchema,
  meta: MetaSchema,
});

export type GovernoratesDelivery = Input<typeof GovernoratesDeliverySchema>;
