export default {
  routes: [
    {
      method: "PUT",
      path: "/products/decrementusingid/:id",
      handler: "stock.decrementAvailableStockUsingID",
    },
    {
      method: "PUT",
      path: "/products/decrementusingslug/:slug",
      handler: "stock.decrementAvailableStockUsingSlug",
    },
  ],
};
