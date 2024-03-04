import { EmailSchema, MetaSchema, PhoneSchema } from "./sharedTypes";
import {
  Output,
  boolean,
  coerce,
  enum_,
  nullable,
  number,
  object,
  string,
} from "valibot";

enum Providers {
  google = "google",
  facebook = "facebook",
  instagram = "instagram",
}

export const UserDataSchema = object({
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
});

export type UserData = Output<typeof UserDataSchema>;

export const UserSchema = object({
  data: UserDataSchema,
  meta: MetaSchema,
});

export type User = Output<typeof UserSchema>;
