import { searchProducts } from "@/lib/services/client/ProductServiceClient";
import { unstable_noStore as noStore } from "next/cache";
import { Locale } from "@/lib/types/sharedTypes";
import SearchComponent from "./SearchComponent";
import { safeParse } from "valibot";

import {
  type FilterableFields,
  ProductSearchResponseSchema,
  defaultAttributesToRetrieve,
  defaultPageSize,
} from "@/lib/types/product";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
  storeKeys,
  type storeTranslations,
} from "../../../../messages/messagesKeys";
import { getCategoriesAndSubCategoriesData } from "@/lib/services/server/CategoryService";
import { CategoriesSchema } from "@/lib/types/categories";

type Props = {
  params: { locale: Locale };
  searchParams: {
    page?: number;
    searchquery?: string;
    sort?: string;
    filter?: string;
  };
};

const Page = async ({ params: { locale }, searchParams }: Props) => {
  noStore();
  unstable_setRequestLocale(locale);
  const searchQuery = searchParams.searchquery ? searchParams.searchquery : "";
  const sort: string[] =
    searchParams.sort &&
    (searchParams.sort.endsWith(":asc") || searchParams.sort.endsWith(":desc"))
      ? [searchParams.sort]
      : [];
  const page =
    searchParams.page &&
    !isNaN(searchParams.page) &&
    Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;
  const filter: FilterableFields[] = searchParams.filter
    ? [...JSON.parse(searchParams.filter)]
    : [`locale = ${locale}`];

  const products = await searchProducts({
    q: "",
    filter,
    page,
    attributesToRetrieve: defaultAttributesToRetrieve,
    sort,
    hitsPerPage: defaultPageSize,
  });

  const validatedData = safeParse(ProductSearchResponseSchema, products);
  const t = await getTranslations("store");
  const translations = storeKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as storeTranslations);

  const categories = await getCategoriesAndSubCategoriesData();

  const validatedCategories = safeParse(CategoriesSchema, categories);

  if (validatedData.success && validatedCategories.success) {
    return (
      <SearchComponent
        products={validatedData.output}
        filter={filter}
        sort={sort.length > 0 ? sort[0] : null}
        searchQuery={searchQuery}
        page={page}
        numberOfpages={validatedData.output.totalPages}
        translations={translations}
        categories={validatedCategories.output.data}
      />
    );
  }
};

export default Page;
