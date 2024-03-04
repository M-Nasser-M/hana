import { Categories } from "@/lib/types/categories";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";

export async function getCategoriesData() {
  const queryString = qs.stringify({
    populate: ["cover"],
  });

  try {
    const response = await serverApiAuth.get<Categories>(
      `/categories?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export async function getCategoriesAndSubCategoriesData() {
  const queryString = qs.stringify({
    populate: ["cover", "subcategories"],
  });

  try {
    const response = await serverApiAuth.get<Categories>(
      `/categories?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}
