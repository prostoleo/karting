// eslint-disable-next-line import/default

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'karting-krasnodar',
    htmlAttrs: {
      lang: 'ru',
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

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://api.storyblok.com',
      },
      {
        rel: 'preconnect',
        href: 'https://a.storyblok.com',
      },
      {
        rel: 'preconnect',
        href: 'https://app.storyblok.com',
      },

      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },

      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Arimo:wght@700&family=Lato:wght@400;500&display=swap',
      },

      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Arimo:wght@700&family=Lato:wght@400;500&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },

      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/1100x714/01eda8a916/hero-right-bg-min.jpg/m/0x400',
        as: 'image',
      },
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/1100x714/01eda8a916/hero-right-bg-min.jpg/m/0x550',
        as: 'image',
      },
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/791x571/2ee75e03c1/track-clipart-logo-14-1-min.png/m/600x0',
        as: 'image',
      },

      {
        rel: 'preload',
        href: 'https://assets10.lottiefiles.com/packages/lf20_clmd2mj6.json',
        as: 'fetch',
      },
    ],
    style: [],
    script: [
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
        defer: true,
        src: 'https://unpkg.com/@lottiefiles/lottie-player@1.5.6/dist/lottie-player.js',
      },
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/buefy.js',
    '~/plugins/vanilla-lazyload.js',
    // '~/plugins/uikit.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components', '~/components/base', '~/components/storyblok'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    'nuxt-windicss',
    [
      '@storyblok/nuxt/module',
      {
        accessToken: process.env.STORYBLOK_KEY || 'ydOEN9F4Nn8zhLWMymAP9Att',
        bridge: true,
        apiOptions: {}, // storyblok-js-client options
        useApiClient: true,
      },
    ],
  ],

  styleResources: {
    scss: [
      // '~/assets/scss/main.scss',
      './assets/scss/abstract/_colors.scss',
      './assets/scss/abstract/_mixins.scss',
      './assets/scss/components/_components.scss',
    ],
    /* sass: [
      // '~/assets/scss/main.scss',
      '~/assets/scss/abstract/colors.scss',
      '~/assets/scss/abstract/mixins.scss',
      '~/assets/scss/components/components.scss',
    ],
    hoistUseStatements: true, */
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/fonts/fonts.css',
    '~/assets/scss/main.scss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/critters',

    'nuxt-mq',
  ],

  mq: {
    defaultBreakpoint: 'sm',
    breakpoints: {
      sm: 450,
      '2sm': 650,
      med: 768,
      lg: 950,
      xl: 1200,
      '2xl': 1400,
      '3xl': 1600,
      '4xl': 1800,
    },
  },

  /* critters: {
    // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
    config: {
      // Default: 'media'
      preload: 'swap',
    },
  }, */

  generate: {
    fallback: true,

    // routes: dynamicRoutes,
  },

  loading: '@/components/base/BaseLoader.vue',

  server: {
    host: '0.0.0.0', // default: localhost
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
