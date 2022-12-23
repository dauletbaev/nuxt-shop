// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'https://dummyjson.com/',
      defaultProductsCount: 4,
    },
  },
})
