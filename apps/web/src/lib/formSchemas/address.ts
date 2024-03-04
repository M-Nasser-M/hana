import {
  Output,
  coerce,
  custom,
  maxValue,
  minLength,
  minValue,
  nullable,
  number,
  object,
  optional,
  string,
} from "valibot";
import { PhoneSchema } from "../types/sharedTypes";

export const AddressFormSchema = object({
  name: string("Name is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  first_name: string("First Name is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  last_name: string("Last Name is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  governorate: string("governorate is required"),
  district: string("District is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  street: string("Street is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  building: string("building is required", [
    minLength(1, "must be at least 1 charaters"),
  ]),
  floor: optional(
    nullable(
      coerce(
        number("Floor needs to be a number", [
          minValue(0, "can't be less than 0"),
          maxValue(200, "can't be more than 200"),
        ]),
        (input) => (Number(input) > 0 ? Number(input) : 0)
      )
    )
  ),
  apartment_no: optional(nullable(string())),
  details: optional(nullable(string())),
  phone: PhoneSchema,
});

export type AddressForm = Output<typeof AddressFormSchema>;

function oneKeyExists(input: AddressForm) {
  //check that input object has at least one key that is not null or undefined
  for (const key in input) {
    if (
      input[key as keyof AddressForm] !== null &&
      input[key as keyof AddressForm] !== undefined
    ) {
      return true;
    }
  }
  return false;
}

export const updateAddressFormSchema = object(
  {
    name: optional(
      string("Name is required", [minLength(3, "must be at least 3 charaters")])
    ),
    first_name: optional(
      string("First Name is required", [
        minLength(3, "must be at least 3 charaters"),
      ])
    ),
    last_name: optional(
      string("Last Name is required", [
        minLength(3, "must be at least 3 charaters"),
      ])
    ),
    governorate: optional(string("governorate is required")),
    district: optional(
      string("District is required", [
        minLength(3, "must be at least 3 charaters"),
      ])
    ),
    street: optional(
      string("Street is required", [
        minLength(3, "must be at least 3 charaters"),
      ])
    ),
    building: string(),
    floor: optional(
      nullable(
        coerce(
          number("Floor needs to be a number", [
            minValue(0, "can't be less than 0"),
            maxValue(200, "can't be more than 200"),
          ]),
          (input) => (Number(input) > 0 ? Number(input) : 0)
        )
      )
    ),
    apartment_no: optional(nullable(string())),
    details: optional(nullable(string())),
    phone: optional(PhoneSchema),
  },
  [custom(oneKeyExists, "at least one value need to be updated")]
);

export type UpdateAddressForm = Output<typeof updateAddressFormSchema>;
