// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      database: process.env.APPWRITE_DATABASE_ID,
      collection: process.env.APPWRITE_COLLECTION_ID,
    },
  },
  modules: ['nuxt-appwrite'],
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT,
    project: process.env.APPWRITE_PROJECT_ID,
  },
});
