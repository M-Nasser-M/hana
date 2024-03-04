import {
  Output,
  array,
  coerce,
  date,
  enum_,
  nullable,
  number,
  object,
  optional,
  union,
} from "valibot";
import { ProductDataSchema } from "./product";
import { AddressDataSchema } from "./address";
import { MetaSchema } from "./sharedTypes";
import { UserDataSchema } from "./user";

export enum OrderStatusEnum {
  ACCEPTED = "ACCEPTED",
  PREPARED = "PREPARED",
  OUTFORDELIVERY = "OUT FOR DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export enum PaymenetStatusEnum {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  DECLINED = "DECLINED",
}

export const OrderDataSchema = object({
  id: number(),
  total: nullable(number()),
  estimated_delivery: nullable(number()),
  order_status: enum_(OrderStatusEnum),
  payment_status: enum_(PaymenetStatusEnum),
  paymob_order_id: optional(nullable(number())),
  paymob_transaction_id: optional(nullable(number())),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
  address: optional(nullable(AddressDataSchema)),
  order_items: optional(
    union([array(AddressDataSchema), array(AddressDataSchema)])
  ),
  users_permissions_user: optional(nullable(UserDataSchema)),
});

export type OrderData = Output<typeof OrderDataSchema>;

export const OrderSchema = object({
  data: OrderDataSchema,
  meta: MetaSchema,
});

export type Order = Output<typeof OrderSchema>;

export const OrdersSchema = object({
  data: array(OrderDataSchema),
  meta: MetaSchema,
});

export type Orders = Output<typeof OrdersSchema>;

export const OrderSummarySchema = object({
  subtotal: number(),
  shipping: number(),
  tax: number(),
  total: number(),
});

export type OrderSummary = Output<typeof OrderSummarySchema>;

export const OrderItemDataSchema = object({
  id: number(),
  quantity: number(),
  product: optional(ProductDataSchema),
  users_permissions_user: optional(nullable(UserDataSchema)),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type OrderItemData = Output<typeof OrderItemDataSchema>;

export const OrderItemSchema = object({
  data: OrderItemDataSchema,
  meta: MetaSchema,
});

export type OrderItem = Output<typeof OrderItemSchema>;

export const OrderItemsSchema = object({
  data: array(OrderItemDataSchema),
  meta: MetaSchema,
});

export type OrderItems = Output<typeof OrderItemsSchema>;
