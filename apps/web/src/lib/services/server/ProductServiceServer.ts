import {
  type Product,
  type ProductSearchRequestBody,
  type ProductSearchResponse,
  type Products,
  defaultAttributesToRetrieve,
  defaultPageSize,
} from "@/lib/types/product";
import { type StoreMainPage } from "@/lib/types/mainPages";
import type { Locale } from "@/lib/types/sharedTypes";
import { meiliserverApiAuth, serverApiAuth } from "./ServerApi";
import qs from "qs";

export async function getStoreMainPage(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<StoreMainPage>(
      `/store?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getProductPage(
  locale: Locale,
  page: number = 1,
  pageSize: number = defaultPageSize
) {
  const queryString = qs.stringify({
    populate: { cover: true },
    locale,
    pagination: { page, pageSize },
  });

  try {
    const response = await serverApiAuth.get<Products>(
      `/products?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getProductUsingID(id: number) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
  });

  try {
    const response = await serverApiAuth.get<Product>(
      `/products/${id}?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getProductUsingSlug(slug: string) {
  try {
    const response = await serverApiAuth.get<Product>(`/products/slug/${slug}`);

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export const defaultReqBodyFeatured = (
  locale: Locale
): ProductSearchRequestBody => ({
  q: "",
  attributesToRetrieve: defaultAttributesToRetrieve,
  filter: ["featured = true", `locale = ${locale}`],
  hitsPerPage: defaultPageSize,
  page: 1,
});

export async function getFeaturedProducts(
  locale: Locale,
  reqObject?: ProductSearchRequestBody
) {
  const reqBody: ProductSearchRequestBody = {
    ...defaultReqBodyFeatured(locale),
    ...reqObject,
  };

  try {
    const products = await meiliserverApiAuth.post<ProductSearchResponse>(
      "/indexes/product/search",
      reqBody
    );
    return products;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function decrementAvailableStockUsingId(
  id: number,
  locale: Locale
) {
  try {
    const response = await serverApiAuth.put<Product>(
      `/products/decrementusingid/${id}`,
      { locale }
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function decrementAvailableStockUsingSlug(
  slug: string,
  locale: Locale
) {
  try {
    const response = await serverApiAuth.put<Product>(
      `/products/decrementusingslug/${slug}`,
      { locale }
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}
