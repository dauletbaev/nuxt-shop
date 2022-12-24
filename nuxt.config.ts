// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-icon'],
  runtimeConfig: {
    public: {
      apiBase: 'https://dummyjson.com/',
      defaultProductsCount: 4,
    },
  },
})
