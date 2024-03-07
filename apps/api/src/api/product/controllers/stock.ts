import { factories } from "@strapi/strapi";
import quantity from "../routes/stock";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async incrementAvailableStock(ctx) {
      const { id } = ctx.params;
      const { availableStock, onholdStock } =
        await strapi.entityService.findOne("api::product.product", id, {
          fields: ["availableStock", "onholdStock"],
        });
      const entity = await strapi.db.query("api::product.product").update({
        where: { id },
        data: {
          availableStock: +availableStock + 1,
          onholdStock: +onholdStock - 1,
        },
      });
      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
    async decrementAvailableStock(ctx) {
      const { id } = ctx.params;
      const { availableStock, onholdStock } =
        await strapi.entityService.findOne("api::product.product", id, {
          fields: ["availableStock", "onholdStock"],
        });
      const entity = await strapi.db.query("api::product.product").update({
        where: { id },
        data: {
          availableStock: +availableStock - 1,
          onholdStock: +onholdStock + 1,
        },
      });
      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  }),
);
