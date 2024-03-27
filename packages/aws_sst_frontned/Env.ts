import { object, parse, string } from "valibot";

const NextENVRuntime = {
  I18NEXUS_API_KEY: process.env.I18NEXUS_API_KEY,
  STRAPI_API_URL: process.env.STRAPI_API_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  STRAPI_URL: process.env.STRAPI_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
  MEILI_HOST: process.env.MEILI_HOST,
  MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
  PAYMOB_HMAC_SECRET: process.env.PAYMOB_HMAC_SECRET,
  NEXT_PUBLIC_MEILI_HOST: process.env.NEXT_PUBLIC_MEILI_HOST,
  NEXT_PUBLIC_MEILI_MASTER_KEY: process.env.NEXT_PUBLIC_MEILI_MASTER_KEY,
  NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  NEXT_PUBLIC_PAYMOB_API_KEY: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
  NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL:
    process.env.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
  NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL:
    process.env.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
  NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL:
    process.env.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
  NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL:
    process.env.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
  NEXT_PUBLIC_PAYMOB_IFRAME_URL: process.env.NEXT_PUBLIC_PAYMOB_IFRAME_URL,
  NEXT_PUBLIC_IFRAME_ID: process.env.NEXT_PUBLIC_IFRAME_ID,
  NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID:
    process.env.NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID,
  NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID:
    process.env.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID,
  NEXT_PUBLIC_PAYMOB_HMAC_SECRET: process.env.NEXT_PUBLIC_PAYMOB_HMAC_SECRET,
};

const NextENVSchema = object({
  I18NEXUS_API_KEY: string(),
  STRAPI_API_TOKEN: string(),
  STRAPI_URL: string(),
  STRAPI_API_URL: string(),
  NEXTAUTH_URL: string(),
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  NEXTAUTH_SECRET: string(),
  FACEBOOK_CLIENT_ID: string(),
  FACEBOOK_CLIENT_SECRET: string(),
  INSTAGRAM_CLIENT_ID: string(),
  INSTAGRAM_CLIENT_SECRET: string(),
  MEILI_HOST: string(),
  MEILI_MASTER_KEY: string(),
  PAYMOB_HMAC_SECRET: string(),
  NEXT_PUBLIC_MEILI_HOST: string(),
  NEXT_PUBLIC_MEILI_MASTER_KEY: string(),
  NEXT_PUBLIC_STRAPI_API_URL: string(),
  NEXT_PUBLIC_STRAPI_API_TOKEN: string(),
  NEXT_PUBLIC_PAYMOB_API_KEY: string(),
  NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL: string(),
  NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL: string(),
  NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL: string(),
  NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL: string(),
  NEXT_PUBLIC_PAYMOB_IFRAME_URL: string(),
  NEXT_PUBLIC_IFRAME_ID: string(),
  NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID: string(),
  NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID: string(),
  NEXT_PUBLIC_PAYMOB_HMAC_SECRET: string(),
});

export const NextENV = parse(NextENVSchema, NextENVRuntime);
