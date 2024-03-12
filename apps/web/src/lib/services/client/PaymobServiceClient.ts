import { clientEnv } from "@/clientEnv";
import { clientApi } from "./ClientApi";
import {
  type PaymobAuthResponse,
  type PaymobCreateOrderPayload,
  type PaymobCreateOrderResponse,
  type PaymobMobileWalletPayload,
  type PaymobMobileWalletResponse,
  type PaymobPaymentKeysPayload,
  type PaymobPaymentKeysResponse,
  type BillingData,
  PaymobAuthResponseSchema,
  PaymobCreateOrderResponseSchema,
  PaymobPaymentKeysResponseSchema,
} from "@/lib/types/paymob";
import { parse } from "valibot";
import type { Phone, Session } from "@/lib/types/sharedTypes";
import type { localStorageCartItems } from "@/lib/types/cart";
import { createOrder } from "../serverActions/OrdersActions";
import { OrderSummary } from "@/lib/types/order";
import { AddressData } from "@/lib/types/address";

type PaymobAuthProcess = {
  authResponse: PaymobAuthResponse;
  orderResponse: PaymobCreateOrderResponse;
  paymentKeyResponse: PaymobPaymentKeysResponse;
};

export async function authenticatePaymob() {
  try {
    const response = await clientApi.post<PaymobAuthResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
      { api_key: clientEnv.NEXT_PUBLIC_PAYMOB_API_KEY }
    );
    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error auth Paymob");

    return null;
  }
}

export async function createPaymobOrder(
  paymobCreateOrderPayload: PaymobCreateOrderPayload
) {
  try {
    const response = await clientApi.post<PaymobCreateOrderResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
      paymobCreateOrderPayload
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "paymob order Creation Error"
    );
    return null;
  }
}

export async function getPaymentKey(
  paymobPaymentKeysPayloab: PaymobPaymentKeysPayload
) {
  try {
    const response = await clientApi.post<PaymobPaymentKeysResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
      paymobPaymentKeysPayloab
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "paymob payment key  Error"
    );
    return null;
  }
}

export async function paymobAuthProcess(
  amount: number,
  billingData: BillingData,
  paymnetType: "CARD" | "WALLET",
  cartItems: localStorageCartItems,
  session: Session,
  orderSummary: OrderSummary,
  addressData: AddressData
): Promise<PaymobAuthProcess> {
  const authResponse = await authenticatePaymob();

  if (!authResponse) throw new Error("paymob Authentication Error");

  const validatedAuthResponse = parse(PaymobAuthResponseSchema, authResponse);

  const orderResponse = await createPaymobOrder({
    auth_token: validatedAuthResponse.token,
    amount_cents: amount * 100,
    currency: "EGP",
    delivery_needed: false,
  });

  if (!orderResponse) throw new Error("paymob order Creation Error");

  const validatedOrderResponse = parse(
    PaymobCreateOrderResponseSchema,
    orderResponse
  );

  const paymentKeyResponse = await getPaymentKey({
    amount_cents: amount * 100,
    currency: "EGP",
    order_id: validatedOrderResponse.id,
    auth_token: validatedAuthResponse.token,
    expiration: 3600,
    integration_id: Number(
      paymnetType === "CARD"
        ? clientEnv.NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID
        : clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID
    ),
    billing_data: billingData,
  });

  if (!paymentKeyResponse) throw new Error("paymob payment key  Error");

  const validatedPaymentKeyResponse = parse(
    PaymobPaymentKeysResponseSchema,
    paymentKeyResponse
  );

  await createOrder(
    cartItems,
    session,
    validatedOrderResponse.id,
    orderSummary,
    addressData
  );

  return {
    authResponse: validatedAuthResponse,
    orderResponse: validatedOrderResponse,
    paymentKeyResponse: validatedPaymentKeyResponse,
  };
}

export async function getMobileWalletPaymentResponse(
  paymobMobileWalletPayload: PaymobMobileWalletPayload
) {
  console.log(paymobMobileWalletPayload);

  const response = await clientApi.post<PaymobMobileWalletResponse>(
    clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
    paymobMobileWalletPayload
  );

  return response;
}

export async function getCardPaymentLink(
  amount: number,
  billingData: BillingData,
  cartItems: localStorageCartItems,
  session: Session,
  orderSummary: OrderSummary,
  addressData: AddressData
) {
  try {
    const { paymentKeyResponse } = await paymobAuthProcess(
      amount,
      billingData,
      "CARD",
      cartItems,
      session,
      orderSummary,
      addressData
    );
    return clientEnv.NEXT_PUBLIC_PAYMOB_IFRAME_URL.replace(
      "IFRAME_ID_PLACEHOLDER",
      `${clientEnv.NEXT_PUBLIC_IFRAME_ID}`
    ).replace("PAYMENT_TOKEN_PLACEHOLDER", paymentKeyResponse.token);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "paymob auth Error");
    return null;
  }
}

export async function getMobilePaymentLink(
  amount: number,
  mobileNumber: Phone,
  billingData: BillingData,
  cartItems: localStorageCartItems,
  session: Session,
  orderSummary: OrderSummary,
  addressData: AddressData
) {
  try {
    const { paymentKeyResponse } = await paymobAuthProcess(
      amount,
      billingData,
      "WALLET",
      cartItems,
      session,
      orderSummary,
      addressData
    );

    const mobileWalletResponse = await getMobileWalletPaymentResponse({
      source: { identifier: mobileNumber, subtype: "WALLET" },
      payment_token: paymentKeyResponse.token,
    });

    return mobileWalletResponse;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "paymob auth Error");
    return null;
  }
}
