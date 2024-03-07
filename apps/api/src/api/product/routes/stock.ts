export default {
  routes: [
    {
      method: "PUT",
      path: "/products/increment/:id",
      handler: "quantity.incrementAvailableStock",
    },
    {
      method: "PUT",
      path: "/products/decrement/:id",
      handler: "quantity.decrementAvailableStock",
    },
  ],
};
