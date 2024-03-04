import { Output, object } from "valibot";
import { EmailSchema, PhoneSchema } from "../types/sharedTypes";

export const EditUserInfoFormSchema = object({
  email: EmailSchema,
  phone: PhoneSchema,
});

export type EditUserInfoForm = Output<typeof EditUserInfoFormSchema>;
