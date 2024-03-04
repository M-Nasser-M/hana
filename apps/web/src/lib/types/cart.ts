import {
  Output,
  array,
  coerce,
  date,
  nullable,
  number,
  object,
  optional,
  union,
} from "valibot";
import {
  ProductDataSchema,
  ProductSearchResponseElementSchema,
} from "./product";
import { MetaSchema } from "./sharedTypes";

export const CartItemDataSchema = object({
  id: number(),
  product: optional(nullable(ProductDataSchema)),
  quantity: nullable(number()),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type CartItemData = Output<typeof CartItemDataSchema>;

export const CartItemSchema = object({
  data: CartItemDataSchema,
  meta: MetaSchema,
});

export type CartItem = Output<typeof CartItemSchema>;

export const CartDataSchema = object({
  id: number(),
  // users_permisssions_user: optional(nullable(UserDataSchema)),
  cart_items: union([array(CartItemDataSchema), array(CartItemDataSchema)]),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type CartData = Output<typeof CartDataSchema>;

export const CartSchema = object({
  data: CartDataSchema,
  meta: MetaSchema,
});

export type Cart = Output<typeof CartSchema>;

export const LocalStorageCartItemSchema = object({
  product: ProductSearchResponseElementSchema,
  quantity: number(),
});

export const LocalStorageCartItemsSchema = array(LocalStorageCartItemSchema);

export type localStorageCartItem = Output<typeof LocalStorageCartItemSchema>;

export type localStorageCartItems = Output<typeof LocalStorageCartItemsSchema>;
