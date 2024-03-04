import {
  Input,
  Output,
  array,
  coerce,
  date,
  email,
  enum_,
  length,
  nullable,
  number,
  object,
  optional,
  regex,
  startsWith,
  string,
  union,
} from "valibot";

enum locale {
  en = "en",
  ar = "ar",
}

export const LocaleSchema = enum_(locale);
export type Locale = Output<typeof LocaleSchema>;

export const PaginationSchema = object({
  page: optional(nullable(number())),
  pageSize: optional(nullable(number())),
  pageCount: optional(nullable(number())),
  total: optional(nullable(number())),
});
export type Pagination = Output<typeof PaginationSchema>;

export const MetaSchema = object({
  pagination: optional(PaginationSchema),
});
export type Meta = Output<typeof MetaSchema>;

export const SizesSchema = object({
  ext: optional(nullable(string())),
  url: optional(nullable(string())),
  hash: optional(nullable(string())),
  mime: optional(nullable(string())),
  name: optional(nullable(string())),
  path: optional(nullable(string())),
  size: optional(nullable(number())),
  width: optional(nullable(number())),
  height: optional(nullable(number())),
});
export type Large = Output<typeof SizesSchema>;

export const FormatsSchema = object({
  large: optional(nullable(SizesSchema)),
  small: optional(nullable(SizesSchema)),
  medium: optional(nullable(SizesSchema)),
  thumbnail: optional(nullable(SizesSchema)),
});
export type Formats = Output<typeof FormatsSchema>;

export const ProviderMetadataSchema = object({
  public_id: string(),
  resource_type: string(),
});

export type ProviderMetadata = Output<typeof ProviderMetadataSchema>;

enum placeholderEnum {
  blur = "blur",
  empty = "empty",
}

export const placeholderValueSchema = union([
  enum_(placeholderEnum),
  string([startsWith("data:image/")]),
]);

export type placeholderValue = Output<typeof placeholderValueSchema>;

export const ImageSchema = object({
  id: optional(nullable(number())),
  name: optional(nullable(string())),
  alternativeText: optional(nullable(string())),
  caption: optional(nullable(string())),
  width: number(),
  height: number(),
  formats: FormatsSchema,
  hash: optional(nullable(string())),
  ext: optional(nullable(string())),
  mime: optional(nullable(string())),
  size: optional(nullable(number())),
  url: string(),
  previewUrl: optional(nullable(string())),
  provider: optional(nullable(string())),
  provider_metadata: optional(nullable(ProviderMetadataSchema)),
  updatedAt: optional(
    nullable(coerce(date(), (input) => new Date(input as string)))
  ),
  createdAt: optional(
    nullable(coerce(date(), (input) => new Date(input as string)))
  ),
  placeholder: placeholderValueSchema,
});
export type Image = Input<typeof ImageSchema>;

export type Cover = Output<typeof ImageSchema>;

export const MetaSocialSchema = object({
  id: optional(nullable(number())),
  socialNetwork: optional(nullable(string())),
  title: optional(nullable(string())),
  description: optional(nullable(string())),
});
export type MetaSocial = Output<typeof MetaSocialSchema>;

export const SeoSchema = object({
  id: optional(nullable(number())),
  metaTitle: optional(nullable(string())),
  metaDescription: optional(nullable(string())),
  keywords: optional(nullable(string())),
  metaRobots: optional(nullable(string())),
  structuredData: optional(nullable(string())),
  metaViewport: optional(nullable(string())),
  canonicalURL: optional(nullable(string())),
  metaImage: optional(nullable(ImageSchema)),
  metaSocial: optional(nullable(array(MetaSocialSchema))),
});
export type Seo = Output<typeof SeoSchema>;

export const ColorSchema = object({
  id: number(),
  color: string(),
});

export type Color = Output<typeof ColorSchema>;

export const SellerSchema = object({
  id: number(),
  name: string(),
  info: string(),
});

export type Seller = Output<typeof SellerSchema>;

export const SessionUserSchema = object({
  name: string(),
  email: string([email()]),
  image: string(),
  cartId: optional(number()),
  id: number(),
});

export type SessionUser = Output<typeof SessionUserSchema>;

export const SessionSchema = object({
  user: SessionUserSchema,
  jwt: string(),
});

export type Session = Output<typeof SessionSchema>;

export const EmailSchema = string("invalid email", [email("invalid email")]);

export type Email = Output<typeof EmailSchema>;

export const PhoneSchema = string("phone is required", [
  length(11, "phone should be 11 number long"),
  startsWith("0", "phone number should start with 0"),
  regex(/^[0-9]+$/, "should be all numbers"),
]);

export type Phone = Output<typeof PhoneSchema>;
