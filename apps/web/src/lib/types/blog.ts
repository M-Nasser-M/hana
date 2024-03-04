import {
  Output,
  array,
  coerce,
  date,
  nullable,
  number,
  object,
  optional,
  string,
} from "valibot";
import {
  ImageSchema,
  LocaleSchema,
  MetaSchema,
  SeoSchema,
} from "./sharedTypes";

export const BlogDataSchema = object({
  id: number(),
  title: string(),
  description: string(),
  article: string(),
  cover: ImageSchema,
  seo: optional(nullable(SeoSchema)),
  slug: string(),
  categories: nullable(string()),
  createdAt: coerce(date(), (input) => new Date(input as string)),
  updatedAt: coerce(date(), (input) => new Date(input as string)),
  publishedAt: coerce(date(), (input) => new Date(input as string)),
  locale: LocaleSchema,
});

export type BlogData = Output<typeof BlogDataSchema>;

export const blogsSchema = object({
  data: array(BlogDataSchema),
  meta: MetaSchema,
});

export type Blogs = Output<typeof blogsSchema>;

export const blogSchema = object({
  data: BlogDataSchema,
  meta: MetaSchema,
});

export type Blog = Output<typeof blogSchema>;
