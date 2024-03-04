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

export const SubCategorySchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type Subcategory = Output<typeof SubCategorySchema>;

export const CategorySchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  cover: optional(ImageSchema),
  subcategories: optional(
    union([array(SubCategorySchema), array(SubCategorySchema)])
  ),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
});

export type Category = Output<typeof CategorySchema>;

export const CategoriesSchema = object({
  data: array(CategorySchema),
  meta: PaginationSchema,
});

export type Categories = Output<typeof CategoriesSchema>;

export const SubCategoriesSchema = object({
  data: array(SubCategorySchema),
  meta: PaginationSchema,
});

export type SubCategories = Output<typeof SubCategoriesSchema>;
