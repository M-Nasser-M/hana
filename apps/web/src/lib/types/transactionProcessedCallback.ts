import {
  Output,
  any,
  array,
  boolean,
  coerce,
  date,
  null_,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

export const SourceDataSchema = object({
  pan: string(),
  type: string(),
  sub_type: string(),
});
export type SourceData = Output<typeof SourceDataSchema>;

export const IngDataSchema = object({
  id: optional(union([number(), null_()])),
  first_name: string(),
  last_name: string(),
  street: string(),
  building: string(),
  floor: string(),
  apartment: string(),
  city: string(),
  state: string(),
  country: string(),
  email: string(),
  phone_number: string(),
  postal_code: string(),
  extra_description: string(),
  shipping_method: optional(union([null_(), string()])),
  order_id: optional(union([number(), null_()])),
  order: optional(union([number(), null_()])),
});
export type IngData = Output<typeof IngDataSchema>;

export const PaymentKeyClaimsSchema = object({
  lock_order_when_paid: boolean(),
  integration_id: number(),
  billing_data: IngDataSchema,
  order_id: number(),
  user_id: number(),
  pmk_ip: string(),
  exp: number(),
  currency: string(),
  amount_cents: number(),
});
export type PaymentKeyClaims = Output<typeof PaymentKeyClaimsSchema>;

export const ShippingDetailsSchema = object({
  id: number(),
  cash_on_delivery_amount: number(),
  cash_on_delivery_type: string(),
  latitude: null_(),
  longitude: null_(),
  is_same_day: number(),
  number_of_packages: number(),
  weight: number(),
  weight_unit: string(),
  length: number(),
  width: number(),
  height: number(),
  delivery_type: string(),
  return_type: null_(),
  order_id: number(),
  notes: string(),
  order: number(),
});
export type ShippingDetails = Output<typeof ShippingDetailsSchema>;

export const CollectorSchema = object({
  id: number(),
  created_at: coerce(date(), (input) => new Date(input as string)),
  phones: array(string()),
  company_emails: array(string()),
  company_name: string(),
  state: string(),
  country: string(),
  city: string(),
  postal_code: string(),
  street: string(),
});
export type Collector = Output<typeof CollectorSchema>;

export const OrderSchema = object({
  id: number(),
  created_at: coerce(date(), (input) => new Date(input as string)),
  delivery_needed: boolean(),
  merchant: CollectorSchema,
  collector: CollectorSchema,
  amount_cents: number(),
  shipping_data: IngDataSchema,
  shipping_details: ShippingDetailsSchema,
  currency: string(),
  is_payment_locked: boolean(),
  is_return: boolean(),
  is_cancel: boolean(),
  is_returned: boolean(),
  is_canceled: boolean(),
  merchant_order_id: null_(),
  wallet_notification: null_(),
  paid_amount_cents: number(),
  notify_user_with_email: boolean(),
  items: array(any()),
  order_url: string(),
  commission_fees: number(),
  delivery_fees_cents: number(),
  delivery_vat_cents: number(),
  payment_method: string(),
  merchant_staff_tag: null_(),
  api_source: string(),
  pickup_data: null_(),
  delivery_status: array(any()),
});
export type Order = Output<typeof OrderSchema>;

export const DataSchema = object({
  acq_response_code: string(),
  avs_acq_response_code: string(),
  klass: string(),
  receipt_no: string(),
  order_info: string(),
  message: string(),
  gateway_integration_pk: number(),
  batch_no: string(),
  card_num: null_(),
  secure_hash: string(),
  avs_result_code: string(),
  card_type: string(),
  merchant: string(),
  created_at: coerce(date(), (input) => new Date(input as string)),
  merchant_txn_ref: string(),
  authorize_id: string(),
  currency: string(),
  amount: string(),
  transaction_no: string(),
  txn_response_code: string(),
  command: string(),
});
export type Data = Output<typeof DataSchema>;

export const ObjSchema = object({
  id: number(),
  pending: boolean(),
  amount_cents: number(),
  success: boolean(),
  is_auth: boolean(),
  is_capture: boolean(),
  is_standalois_capturene_payment: boolean(),
  is_voided: boolean(),
  is_refunded: boolean(),
  is_3d_secure: boolean(),
  integration_id: number(),
  profile_id: number(),
  has_parent_transaction: boolean(),
  order: OrderSchema,
  created_at: coerce(date(), (input) => new Date(input as string)),
  transaction_processed_callback_responses: array(any()),
  currency: string(),
  source_data: SourceDataSchema,
  api_source: string(),
  terminal_id: null_(),
  is_void: boolean(),
  is_refund: boolean(),
  data: DataSchema,
  is_hidden: boolean(),
  payment_key_claims: PaymentKeyClaimsSchema,
  error_occured: boolean(),
  is_live: boolean(),
  other_endpoint_reference: null_(),
  refunded_amount_cents: number(),
  source_id: number(),
  is_captured: boolean(),
  captured_amount: number(),
  merchant_staff_tag: null_(),
  owner: number(),
  parent_transaction: null_(),
});
export type Obj = Output<typeof ObjSchema>;

export const TransactionCallbackSchema = object({
  obj: ObjSchema,
  type: string(),
});
export type TransactionCallback = Output<typeof TransactionCallbackSchema>;
