module.exports = ({ env }) => ({
  ckeditor5: {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  publisher: {
    enabled: true,
    config: {
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log("beforePublish");
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log("afterPublish");
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log("beforeUnpublish");
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log("afterUnpublish");
        },
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  meilisearch: {
    config: {
      host: env("MEILI_HOST"),
      apiKey: env("MEILI_MASTER_KEY"),
      product: {
        settings: {
          filterableAttributes: [
            "locale",
            "categories.name_en",
            "subcategories.name_en",
            "featured",
          ],
          sortableAttributes: ["createdat", "updatedat", "price"],
        },
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  "local-image-sharp": {
    config: {
      cacheDir: ".image-cache",
      maxAge: 604800,
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "30d",
      },
      register: {
        allowedFields: ["username", "email", "password", "confirmed", "phone"],
      },
    },
  },
});
