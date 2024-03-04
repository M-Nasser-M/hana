import { HmacSHA512 } from "crypto-js";
import type {
  PaymobHmacTransactionObjectBackend,
  PaymobHmacTransactionObjectFrontend,
} from "../types/paymob";

const compareHmacFrontEnd = (
  hmacSecret: string,
  inputObject: PaymobHmacTransactionObjectFrontend,
  compareHmac: string
): boolean => {
  const inputString = concatInputStringFromObjectFrontEnd(inputObject);
  const calculatedHmac: string = HmacSHA512(inputString, hmacSecret).toString();

  return calculatedHmac === compareHmac ? true : false;
};

const compareHmacBackEnd = (
  hmacSecret: string,
  inputObject: PaymobHmacTransactionObjectBackend,
  compareHmac: string
): boolean => {
  const inputString = concatInputStringFromObjectBackEnd(inputObject);
  const calculatedHmac: string = HmacSHA512(inputString, hmacSecret).toString();

  return calculatedHmac === compareHmac ? true : false;
};

const concatInputStringFromObjectFrontEnd = (
  inputObject: PaymobHmacTransactionObjectFrontend
): string => {
  const inputString = `${inputObject.amount_cents}${inputObject.created_at}${inputObject.currency}${inputObject.error_occured}${inputObject.has_parent_transaction}${inputObject.id}${inputObject.integration_id}${inputObject.is_3d_secure}${inputObject.is_auth}${inputObject.is_capture}${inputObject.is_refunded}${inputObject.is_standalone_payment}${inputObject.is_voided}${inputObject.order}${inputObject.owner}${inputObject.pending}${inputObject["source_data.pan"]}${inputObject["source_data.sub_type"]}${inputObject["source_data.type"]}${inputObject.success}`;

  return inputString;
};

const concatInputStringFromObjectBackEnd = (
  inputObject: PaymobHmacTransactionObjectBackend
) => {
  const inputString = `${inputObject.obj.amount_cents}${inputObject.obj.created_at}${inputObject.obj.currency}${inputObject.obj.error_occured}${inputObject.obj.has_parent_transaction}${inputObject.obj.id}${inputObject.obj.integration_id}${inputObject.obj.is_3d_secure}${inputObject.obj.is_auth}${inputObject.obj.is_capture}${inputObject.obj.is_refunded}${inputObject.obj.is_standalone_payment}${inputObject.obj.is_voided}${inputObject.obj.order.id}${inputObject.obj.owner}${inputObject.obj.pending}${inputObject.obj.source_data.pan}${inputObject.obj.source_data.sub_type}${inputObject.obj.source_data.type}${inputObject.obj.success}`;

  return inputString;
};

export { compareHmacFrontEnd, compareHmacBackEnd };
