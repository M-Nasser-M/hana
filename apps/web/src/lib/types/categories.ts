import {
  Output,
  array,
  coerce,
  date,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import { ImageSchema, PaginationSchema } from "./sharedTypes";

export const SubCategoryDataSchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type Subcategory = Output<typeof SubCategoryDataSchema>;

export const CategoryDataSchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  cover: optional(ImageSchema),
  subcategories: optional(
    union([array(SubCategoryDataSchema), array(SubCategoryDataSchema)])
  ),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type CategoriesData = Output<typeof CategoryDataSchema>;

export const CategoriesSchema = object({
  data: array(CategoryDataSchema),
  meta: PaginationSchema,
});

export type Categories = Output<typeof CategoriesSchema>;

export const SubCategoriesSchema = object({
  data: array(SubCategoryDataSchema),
  meta: PaginationSchema,
});

export type SubCategories = Output<typeof SubCategoriesSchema>;
