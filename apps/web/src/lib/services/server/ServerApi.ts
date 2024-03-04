import createFetchApi from "@/lib/utils/CreateFetchApi";
import { serverEnv } from "@/serverEnv";

export const serverApiAuth = createFetchApi(serverEnv.STRAPI_API_URL, {
  headers: {
    Authorization: `Bearer ${serverEnv.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const serverApi = createFetchApi(serverEnv.STRAPI_API_URL, {
  headers: { "Content-Type": "application/json" },
});

export const meiliserverApiAuth = createFetchApi(serverEnv.MEILI_HOST, {
  headers: {
    Authorization: `Bearer ${serverEnv.MEILI_MASTER_KEY}`,
    "Content-Type": "application/json",
  },
});
