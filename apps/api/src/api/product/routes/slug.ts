export default {
  routes: [
    {
      method: "GET",
      path: "/products/slug/:slug",
      handler: "slug.getProductBySlug",
    },
  ],
};
