import {
  Output,
  array,
  boolean,
  coerce,
  enum_,
  nullable,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import { EmailSchema, PhoneSchema } from "./sharedTypes";
import { AddressDataSchema } from "./address";
import { OrderDataSchema } from "./order";
import { CartDataSchema } from "./cart";

export enum Providers {
  google = "google",
  facebook = "facebook",
  instagram = "instagram",
}

export const UserProfileSchema = object({
  id: number(),
  username: string(),
  email: EmailSchema,
  provider: enum_(Providers),
  confirmed: boolean(),
  blocked: boolean(),
  phone: nullable(PhoneSchema),
  primaryEmail: nullable(EmailSchema),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  addresses: optional(
    union([array(AddressDataSchema), array(AddressDataSchema)])
  ),
  orders: optional(union([array(OrderDataSchema), array(OrderDataSchema)])),
  cart: optional(nullable(CartDataSchema)),
});

export type UserProfile = Output<typeof UserProfileSchema>;
