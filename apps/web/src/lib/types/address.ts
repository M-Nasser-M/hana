import {
  Output,
  array,
  coerce,
  date,
  nullable,
  number,
  object,
  optional,
  string,
} from "valibot";
import { MetaSchema, PhoneSchema } from "./sharedTypes";
import { GovernorateDataSchema } from "./city-governorate";

export const AddressDataSchema = object({
  id: number(),
  name: string(),
  building: string(),
  apartment_no: optional(nullable(string())),
  street: string(),
  first_name: string(),
  last_name: string(),
  governorate: GovernorateDataSchema,
  district: string(),
  floor: optional(nullable(number())),
  details: optional(nullable(string())),
  phone: PhoneSchema,
  createdAt: optional(coerce(date(), (input) => new Date(input as string))),
  updatedAt: optional(coerce(date(), (input) => new Date(input as string))),
});

export type AddressData = Output<typeof AddressDataSchema>;

export const AddressSchema = object({
  data: AddressDataSchema,
  meta: MetaSchema,
});

export type Address = Output<typeof AddressSchema>;

export const AddressesSchema = object({
  data: array(AddressDataSchema),
  meta: MetaSchema,
});

export type Addresses = Output<typeof AddressesSchema>;
