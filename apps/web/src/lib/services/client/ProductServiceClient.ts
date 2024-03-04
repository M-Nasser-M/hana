import {
  ProductSearchRequestBody,
  ProductSearchResponse,
  defaultAttributesToRetrieve,
  defaultPageSize,
} from "@/lib/types/product";
import { meiliClientApi } from "./ClientApi";

const defaultReqBody: ProductSearchRequestBody = {
  q: "",
  attributesToRetrieve: defaultAttributesToRetrieve,
  hitsPerPage: defaultPageSize,
  page: 1,
};

export async function searchProducts(reqObject: ProductSearchRequestBody) {
  const reqBody: ProductSearchRequestBody = {
    ...defaultReqBody,
    ...reqObject,
  };

  try {
    const products = await meiliClientApi.post<ProductSearchResponse>(
      "/indexes/product/search",
      reqBody
    );

    return products;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}
