export default {
  config: {
    // Replace the Strapi logo in auth (login) views

    locales: ["ar", "fr"],

    tutorials: false,
    notifications: { releases: false },
  },

  bootstrap(app) {
    console.log(app);
  },
};
