import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async getProductBySlug(ctx) {
      const { slug } = ctx.params;
      const entity = await strapi.db.query("api::product.product").findOne({
        where: { slug },
        populate: {
          seo: { populate: ["metaImage"] },
          images: true,
          cover: true,
          categories: true,
          subcategories: true,
        },
      });
      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  })
);
