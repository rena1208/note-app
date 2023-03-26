const environment = process.env.NODE_ENV
const envSet = require(`./env.${environment}.js`)

export default {
  env: envSet,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'note-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    './env.development.js',


  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    // baseURL: 'http://localhost:3000',
  },

  proxy: {
    "/api": envSet.apiBaseUrl
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // ユーザー新規登録
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  //Modules: https://auth.nuxtjs.org/schemes/local
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: { url: "/api/logout", method: "post" },
          user: { url: "/api/user", method: "get" },
        },
      },
    },
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.apiBaseUrl,
    },
  },
}
