import { factories } from "@strapi/strapi";
import quantity from "../routes/stock";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async decrementAvailableStockUsingID(ctx) {
      const { id } = ctx.params;
      const { locale } = ctx.request.body.data;

      const IDs = () => (locale === "en" ? [id, id + 1] : [id - 1, id]);

      const { availableStock, onholdStock } =
        await strapi.entityService.findOne("api::product.product", id, {
          fields: ["availableStock", "onholdStock"],
        });
      const entity = await strapi.db.query("api::product.product").updateMany({
        data: {
          availableStock: +availableStock - 1,
          onholdStock: +onholdStock + 1,
        },
        where: { id: [23, 24] },
      });

      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
    async decrementAvailableStockUsingSlug(ctx) {
      const { slug } = ctx.params;
      const { locale } = ctx.request.body.data;
      const slugs = () =>
        locale === "en"
          ? [slug, `${slug}-ar`]
          : [slug.slice(0, locale.length * -1 - 1), slug];
      const { availableStock, onholdStock } = await strapi.db
        .query("api::product.product")
        .findOne({
          where: { slug },
          select: ["availableStock", "onholdStock"],
        });

      const entity = await strapi.db.query("api::product.product").updateMany({
        data: {
          availableStock: +availableStock - 1,
          onholdStock: +onholdStock + 1,
        },
        where: { slug: slugs },
      });

      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  }),
);
