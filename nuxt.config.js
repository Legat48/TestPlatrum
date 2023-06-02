export default {
  ssr: true,

  head: {
    titleTemplate: 'Test Platrum',
    title: 'Test Platrum',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 8881 // default: 3000
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/style.scss'
  ],
  // Путь к резервному HTML-файлу
  generate: {
    fallback: true
  },

  styleResources: {
    scss: ['~/assets/scss/scss/*.scss']
  },

  // Подключение плагинов
  plugins: [
  ],

  middleware: ['~/middleware'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    true: true,
    dirs: [
      '~/components'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],

  publicRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: ''
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
