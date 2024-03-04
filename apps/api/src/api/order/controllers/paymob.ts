import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async updateTransactionIdAndPaymentStatus(ctx) {
      const { paymob_transaction_id, payment_status } = ctx.request.body.data;
      const { paymob_order_id } = ctx.params;
      const entity = await strapi.db.query("api::order.order").update({
        where: { paymob_order_id },
        data: { paymob_transaction_id, payment_status },
      });
      const output = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(output);
    },
  })
);
