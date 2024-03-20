import { object, parse, string } from "valibot";

const StrapiENVRuntime = {
  HOST: process.env.STRAPI_HOST,
  PORT: process.env.STRAPI_PORT,
  APP_KEYS: process.env.APP_KEYS,
  API_TOKEN_SALT: process.env.API_TOKEN_SALT,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  PUBLIC_URL: process.env.PUBLIC_URL,
  DATABASE_CLIENT: process.env.DATABASE_CLIENT,
  DATABASE_SSL_CA: process.env.DATABASE_SSL_CA,
  DATABASE_SSL: process.env.DATABASE_SSL,
  MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
};

const StrapiENVSchema = object({
  HOST: string(),
  PORT: string(),
  APP_KEYS: string(),
  API_TOKEN_SALT: string(),
  ADMIN_JWT_SECRET: string(),
  TRANSFER_TOKEN_SALT: string(),
  JWT_SECRET: string(),
  PUBLIC_URL: string(),
  DATABASE_CLIENT: string(),
  DATABASE_SSL_CA: string(),
  DATABASE_SSL: string(),
  MEILI_MASTER_KEY: string(),
  CLOUDINARY_NAME: string(),
  CLOUDINARY_KEY: string(),
  CLOUDINARY_SECRET: string(),
});

export const StrapiENV = parse(StrapiENVSchema, StrapiENVRuntime);

const MeiliENVRuntime = {
  MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
};

const MeiliENVSchema = object({
  MEILI_MASTER_KEY: string(),
});

export const MeiliENV = parse(MeiliENVSchema, MeiliENVRuntime);
