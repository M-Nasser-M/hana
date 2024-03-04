export default {
  routes: [
    {
      method: "GET",
      path: "/blogs/slug/:slug",
      handler: "slug.getBlogBySlug",
    },
  ],
};
