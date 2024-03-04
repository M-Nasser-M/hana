export default {
  routes: [
    {
      method: "PUT",
      path: "/orders/paymob/:paymob_order_id",
      handler: "paymob.updateTransactionIdAndPaymentStatus",
    },
  ],
};
