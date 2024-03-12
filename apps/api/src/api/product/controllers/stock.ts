import { factories } from "@strapi/strapi";
import quantity from "../routes/stock";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async decrementAvailableStockUsingID(ctx) {
      const { id } = ctx.params;

      const { availableStock, onholdStock, localizations } =
        await strapi.entityService.findOne("api::product.product", id, {
          fields: ["availableStock", "onholdStock"],
          populate: ["localizations"],
        });

      const localizationsIDS = localizations.map(
        (localization) => localization.id,
      );

      const entity = await strapi.db.query("api::product.product").updateMany({
        data: {
          availableStock: +availableStock - 1,
          onholdStock: +onholdStock + 1,
        },
        where: { id: [id, ...localizationsIDS] },
      });

      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  }),
);
