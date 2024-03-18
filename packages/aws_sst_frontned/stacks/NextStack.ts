import { StrapiStack } from "../../aws_sst_backend/stacks/StrapiStack";
import { meiliStack } from "../../aws_sst_backend/stacks/Meilistack";
import { HanaVPC } from "../../aws_sst_backend/stacks/VPCStack";
import { NextjsSite, StackContext, use } from "sst/constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { NextENV } from "../../aws_sst_backend/Env";

export function NextStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);

  const strapi = use(StrapiStack);

  const meili = use(meiliStack);

  const site = new NextjsSite(stack, "site", {
    path: "../../apps/web",
    cdk: {
      server: {
        vpc,
        logRetention: RetentionDays.ONE_MONTH,
      },
      revalidation: {
        vpc,
      },
    },
    bind: [strapi, meili],
    environment: {
      I18NEXUS_API_KEY: NextENV.I18NEXUS_API_KEY,
      STRAPI_API_URL: strapi.url
        ? `${strapi.url}/api`
        : "http://localhost:1337/api",
      STRAPI_API_TOKEN: NextENV.STRAPI_API_TOKEN,
      STRAPI_URL: strapi.url ? strapi.url : "http://localhost:1337",
      NEXTAUTH_URL: "",
      GOOGLE_CLIENT_ID: NextENV.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: NextENV.GOOGLE_CLIENT_SECRET,
      NEXTAUTH_SECRET: NextENV.NEXTAUTH_SECRET,
      FACEBOOK_CLIENT_ID: NextENV.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: NextENV.FACEBOOK_CLIENT_SECRET,
      INSTAGRAM_CLIENT_ID: NextENV.INSTAGRAM_CLIENT_ID,
      INSTAGRAM_CLIENT_SECRET: NextENV.INSTAGRAM_CLIENT_SECRET,
      MEILI_HOST: meili.url ? meili.url : "http://localhost:7700",
      MEILI_MASTER_KEY: NextENV.MEILI_MASTER_KEY,
      PAYMOB_HMAC_SECRET: NextENV.PAYMOB_HMAC_SECRET,
      NEXT_PUBLIC_MEILI_HOST: meili.url ? meili.url : "http://localhost:7700",
      NEXT_PUBLIC_MEILI_MASTER_KEY: NextENV.NEXT_PUBLIC_MEILI_MASTER_KEY,
      NEXT_PUBLIC_STRAPI_API_URL: strapi.url
        ? `${strapi.url}/api`
        : "http:localhost:1337/api",
      NEXT_PUBLIC_STRAPI_API_TOKEN: NextENV.NEXT_PUBLIC_STRAPI_API_TOKEN,
      NEXT_PUBLIC_PAYMOB_API_KEY: NextENV.NEXT_PUBLIC_PAYMOB_API_KEY,
      NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL:
        NextENV.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
      NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL:
        NextENV.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
      NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL:
        NextENV.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
      NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL:
        NextENV.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
      NEXT_PUBLIC_PAYMOB_IFRAME_URL: NextENV.NEXT_PUBLIC_PAYMOB_IFRAME_URL,
      NEXT_PUBLIC_IFRAME_ID: NextENV.NEXT_PUBLIC_IFRAME_ID,
      NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID:
        NextENV.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID,
      NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID:
        NextENV.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID,
      NEXT_PUBLIC_PAYMOB_HMAC_SECRET: NextENV.NEXT_PUBLIC_PAYMOB_HMAC_SECRET,
    },
  });

  stack.addOutputs({ SITE_URL: site.url });
}
