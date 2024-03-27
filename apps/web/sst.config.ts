// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import { serverEnv } from "./src/serverEnv";
import { clientEnv } from "./src/clientEnv";

export default $config({
  app(input) {
    return {
      name: "HanaWeb",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs(
      "HanaWeb",
      {
        environment: {
          STRAPI_API_URL: serverEnv.STRAPI_API_URL,
          STRAPI_API_TOKEN: serverEnv.STRAPI_API_TOKEN,
          STRAPI_URL: serverEnv.STRAPI_URL,
          NEXTAUTH_URL: serverEnv.NEXTAUTH_URL,
          GOOGLE_CLIENT_ID: serverEnv.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: serverEnv.GOOGLE_CLIENT_SECRET,
          NEXTAUTH_SECRET: serverEnv.NEXTAUTH_SECRET,
          FACEBOOK_CLIENT_ID: serverEnv.FACEBOOK_CLIENT_ID,
          FACEBOOK_CLIENT_SECRET: serverEnv.FACEBOOK_CLIENT_SECRET,
          INSTAGRAM_CLIENT_ID: serverEnv.INSTAGRAM_CLIENT_ID,
          INSTAGRAM_CLIENT_SECRET: serverEnv.INSTAGRAM_CLIENT_SECRET,
          MEILI_HOST: serverEnv.MEILI_HOST,
          MEILI_MASTER_KEY: serverEnv.MEILI_MASTER_KEY,
          PAYMOB_HMAC_SECRET: serverEnv.PAYMOB_HMAC_SECRET,
          NEXT_PUBLIC_MEILI_HOST: clientEnv.NEXT_PUBLIC_MEILI_HOST,
          NEXT_PUBLIC_MEILI_MASTER_KEY: clientEnv.NEXT_PUBLIC_MEILI_MASTER_KEY,
          NEXT_PUBLIC_STRAPI_API_URL: clientEnv.NEXT_PUBLIC_STRAPI_API_URL,
          NEXT_PUBLIC_STRAPI_API_TOKEN: clientEnv.NEXT_PUBLIC_STRAPI_API_TOKEN,
          NEXT_PUBLIC_PAYMOB_API_KEY: clientEnv.NEXT_PUBLIC_PAYMOB_API_KEY,
          NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL:
            clientEnv.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
          NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL:
            clientEnv.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
          NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL:
            clientEnv.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
          NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL:
            clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
          NEXT_PUBLIC_PAYMOB_IFRAME_URL:
            clientEnv.NEXT_PUBLIC_PAYMOB_IFRAME_URL,
          NEXT_PUBLIC_IFRAME_ID: String(clientEnv.NEXT_PUBLIC_IFRAME_ID),
          NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID: String(
            clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID
          ),
          NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID: String(
            clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID
          ),
          NEXT_PUBLIC_PAYMOB_HMAC_SECRET:
            clientEnv.NEXT_PUBLIC_PAYMOB_HMAC_SECRET,
        },
      },
      {}
    );
  },
});
