export default {
  routes: [
    {
      method: "PUT",
      path: "/products/decrementusingid/:id",
      handler: "stock.decrementAvailableStockUsingID",
    },
  ],
};
