import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async getBlogBySlug(ctx) {
      const { slug } = ctx.params;
      const entity = await strapi.db.query("api::blog.blog").findOne({
        where: { slug },
        populate: {
          seo: { populate: ["metaImage"] },
          cover: true,
        },
      });
      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  })
);
