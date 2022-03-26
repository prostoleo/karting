// eslint-disable-next-line no-unused-vars
import { dynamicRoutes } from './utils/storyblok/routes';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'karting-krasnodar',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'КАРТИНГ-ЦЕНТР В КРАСНОДАРЕ. Большой выбор картов. Скидка при бронировании заездов онлайн. Выдаем экипировку. 7 картов еа выбор',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      /* {
        type: 'module',
        defer: true,
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      }, */
      {
        type: 'module',
        defer: true,
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      },
      {
        nomodule: true,
        defer: true,
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
      },
      {
        type: 'module',
        async: true,
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      },

      /* {
        type: 'module',
        defer: true,
        src: 'https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js',
      }, */
      /* {
        type: 'text/partytown',
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      },
      {
        type: 'text/partytown',
        src: 'https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js',
      }, */
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/fonts/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/uikit.js'],
  // * worker for lottie player
  // '~/plugins/workers.js'
  // '~/plugins/lottie-vue-player.client.js'

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components', '~/components/base', '~/components/storyblok'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // 'nuxt-windicss',
    [
      '@storyblok/nuxt/module',
      {
        accessToken: process.env.STORYBLOK_KEY || 'ydOEN9F4Nn8zhLWMymAP9Att',
        bridge: true,
        apiOptions: {}, // storyblok-js-client options
        useApiClient: true,
      },
    ],
    [
      '@pinia/nuxt',
      {
        disableVuex: true,
      },
    ],
  ],

  styleResources: {
    scss: ['~/assets/scss/main.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  generate: {
    fallback: true,

    // routes: dynamicRoutes,
  },

  loadingIndicator: {
    name: 'fading-circle',
    color: '#E40D04',
    background: 'black',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
};
