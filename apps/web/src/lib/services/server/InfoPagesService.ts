import type { ArticleAndSeo } from "@/lib/types/mainPages";
import type { Locale } from "@/lib/types/sharedTypes";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";
import { cache } from "react";

export async function getPrivacyPolicy(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/privacy-policy?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export const getPrivacyPolicyCached = cache(getPrivacyPolicy);

export async function getTermsAndConditions(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/terms-and-conditions?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export const getTermsAndConditionsCached = cache(getTermsAndConditions);

export async function getRefunReturn(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/refund-return?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export const getRefunReturnCached = cache(getRefunReturn);

export async function getAboutUs(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/about-us?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export const getAboutUsCached = cache(getAboutUs);
