import {
  Output,
  array,
  coerce,
  date,
  number,
  object,
  optional,
  string,
} from "valibot";
import { MetaSchema } from "./sharedTypes";

export const GovernorateDataSchema = object({
  id: coerce(number(), Number),
  governorate_name_ar: string(),
  governorate_name_en: string(),
  delivery: number(),
  createdAt: optional(coerce(date(), (input) => new Date(input as string))),
  updatedAt: optional(coerce(date(), (input) => new Date(input as string))),
  publishedAt: optional(coerce(date(), (input) => new Date(input as string))),
});

export type GovernorateData = Output<typeof GovernorateDataSchema>;

export const GovernorateSchema = object({
  data: GovernorateDataSchema,
  meta: MetaSchema,
});

export type Governorate = Output<typeof GovernorateSchema>;

export const GovernoratesSchema = object({
  data: array(GovernorateDataSchema),
  meta: MetaSchema,
});

export type Governorates = Output<typeof GovernoratesSchema>;

export const cityDataSchema = object({
  id: coerce(string(), Number),
  governorate_id: coerce(string(), Number),
  city_name_ar: string(),
  city_name_en: string(),
});

export type CityData = Output<typeof cityDataSchema>;

export const citySchema = object({
  data: cityDataSchema,
  meta: MetaSchema,
});

export const citiesSchema = object({
  data: array(cityDataSchema),
  meta: MetaSchema,
});

export type Cities = Output<typeof citiesSchema>;
