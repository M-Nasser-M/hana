import type { OrderSummary } from "../types/order";
import { atom } from "jotai";
import { cartAtom } from "./atoms";
import type { PaymentType } from "../types/paymob";
import type { AddressData } from "../types/address";
import type { Phone } from "../types/sharedTypes";

export const orderSubtotalAtom = atom((get) =>
  get(cartAtom).reduce((acc, item) => {
    return (
      acc +
      (item.product.offer_price
        ? +item.product.offer_price
        : +item.product.price) *
        +item.quantity
    );
  }, 0)
);

export const orderShippingAtom = atom(0);

export const orderTaxAtom = atom(0);

export const shippingDetailsAtom = atom<AddressData | null>(null);

export const mobileWalletAtom = atom<Phone>("");

export const paymentTypeAtom = atom<PaymentType | null>(null);

export const orderSummaryAtom = atom<OrderSummary>((get) => {
  const subtotal = get(orderSubtotalAtom);
  const shipping = get(orderShippingAtom);
  const tax = get(orderTaxAtom);
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
});
