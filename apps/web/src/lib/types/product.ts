import {
  Input,
  Output,
  array,
  boolean,
  coerce,
  date,
  keyof,
  literal,
  nullable,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import {
  ColorSchema,
  ImageSchema,
  LocaleSchema,
  MetaSchema,
  SellerSchema,
  SeoSchema,
} from "./sharedTypes";
import {
  CategoriesData,
  CategoryDataSchema,
  SubCategoryDataSchema,
} from "./categories";

export const FilterableFieldsSchema = union([
  literal(`locale = ${string()}`),
  literal(`categories.name_en = ${string()}`),
  literal(`subcategories.name_en = ${string()}`),
  literal(`featured = ${string()}`),
]);

export type FilterableFields = Output<typeof FilterableFieldsSchema>;

export const ProductDataSchema = object({
  id: number(),
  name: string(),
  price: number(),
  description: string(),
  details: optional(nullable(string())),
  offer_price: nullable(number()),
  availableStock: string(),
  onholdStock: optional(nullable(string())),
  soldStock: optional(nullable(string())),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
  publishedAt: coerce(date(), (input) => new Date(input as string)),
  locale: LocaleSchema,
  categories: union([array(CategoryDataSchema), array(CategoryDataSchema)]),
  subcategories: union([
    array(SubCategoryDataSchema),
    array(SubCategoryDataSchema),
  ]),
  slug: string(),
  images: optional(nullable(array(ImageSchema))),
  cover: ImageSchema,
  colors: optional(nullable(ColorSchema)),
  seller: optional(nullable(SellerSchema)),
  seo: optional(nullable(SeoSchema)),
  featured: nullable(boolean()),
});

export type ProductData = Output<typeof ProductDataSchema>;

export const ProductsSchema = object({
  data: array(ProductDataSchema),
  meta: MetaSchema,
});

export type Products = Output<typeof ProductsSchema>;

export const ProductSchema = object({
  data: ProductDataSchema,
  meta: MetaSchema,
});

export type Product = Output<typeof ProductSchema>;

export const AttributesToRetrieveSchema = array(keyof(ProductDataSchema));

export type AttributesToRetrieve = Output<typeof AttributesToRetrieveSchema>;

export const filter = array;

export const ProductSearchRequestBodySchema = object({
  q: string(), //Query string
  filter: optional(array(FilterableFieldsSchema)), //Filter queries by an attribute's value
  sort: optional(nullable(array(string()))), //Sort search results by an attribute's value
  attributesToRetrieve: optional(AttributesToRetrieveSchema), //Attributes to display in the returned documents
  offset: optional(number()), //Number of documents to skip
  limit: optional(number()), //Maximum number of documents returned
  hitsPerPage: optional(number()), //Maximum number of documents returned for a page
  page: optional(number()), //Request a specific page of results
});

export type ProductSearchRequestBody = Output<
  typeof ProductSearchRequestBodySchema
>;

export const ProductSearchResponseElementSchema = object({
  id: number(),
  name: string(),
  price: number(),
  description: string(),
  offer_price: nullable(number()),
  availableStock: string(),
  slug: string(),
  cover: ImageSchema,
});

export type ProductSearchResponseElement = Output<
  typeof ProductSearchResponseElementSchema
>;

export const ProductSearchResponseSchema = object({
  hits: union([
    array(ProductSearchResponseElementSchema),
    array(ProductSearchResponseElementSchema),
  ]),
  query: string(),
  processingTimeMs: optional(number()),
  limit: optional(number()),
  offset: optional(number()),
  estimatedTotalHits: optional(number()),
  totalPages: number(),
  totalHits: number(),
});

export type ProductSearchResponse = Input<typeof ProductSearchResponseSchema>;

export const filterDefaultCheckStatus = (categories: CategoriesData[]) => {
  return categories.reduce((obj, category) => {
    const categoryObj = {
      [category.name_en]: {
        checked: false,
        filter: `categories.name_en = '${category.name_en}'`,
      },
    };

    if (category.subcategories) {
      const subcategoryObj = category.subcategories.reduce(
        (obj, subcategory) => {
          return {
            ...obj,
            [subcategory.name_en]: {
              checked: false,
              filter: `subcategories.name_en = '${subcategory.name_en}'`,
            },
          };
        },
        {}
      );

      return {
        ...obj,
        ...categoryObj,
        ...subcategoryObj,
      };
    } else {
      return {
        ...obj,
        ...categoryObj,
      };
    }
  }, {}) as Record<string, { checked: boolean; filter: FilterableFields }>;
};

export const defaultAttributesToRetrieve: AttributesToRetrieve = [
  "id",
  "name",
  "price",
  "description",
  "offer_price",
  "availableStock",
  "slug",
  "cover",
  "categories",
  "subcategories",
];

export const defaultPageSize = 9;
