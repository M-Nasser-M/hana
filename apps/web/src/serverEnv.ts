import { string, object, parse, url } from "valibot";

const serverEnvSchema = object({
  I18NEXUS_API_KEY: string(),
  STRAPI_API_URL: string([url()]),
  STRAPI_API_TOKEN: string(),
  STRAPI_URL: string([url()]),
  NEXTAUTH_URL: string([url()]),
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
});

const parsedEnv = parse(serverEnvSchema, process.env);

export const serverEnv = parsedEnv;
