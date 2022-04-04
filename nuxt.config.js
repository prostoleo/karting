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
      /* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Arimo:wght@700&family=Lato:wght@400;500&display=swap" rel="stylesheet"></link> */
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      /* { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, */
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

      /* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.13.4/css/uikit.min.css" integrity="sha512-F69u2HnuOWB/48ncdmkVOpdYwQPZmzF5YbOiUBKfbR24zt93bpDurJnXTY8gwBSHmHhsF2wKv84uhwkiwRdk+A==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */
      /* {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.13.4/css/uikit.min.css',
        integrity:
          'sha512-F69u2HnuOWB/48ncdmkVOpdYwQPZmzF5YbOiUBKfbR24zt93bpDurJnXTY8gwBSHmHhsF2wKv84uhwkiwRdk+A==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      }, */
      /* {
        rel: 'preload',
        href: './_nuxt/fonts/Arimo-Bold.woff2',
        as: 'font',
      },
      {
        rel: 'preload',
        href: './_nuxt/fonts/Lato-Medium.woff2',
        as: 'font',
      },
      {
        rel: 'preload',
        href: './_nuxt/fonts/Lato-Regular.woff2',
        as: 'font',
      }, */
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/1100x714/01eda8a916/hero-right-bg-min.jpg/m/0x200',
        as: 'image',
      },
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/1100x714/01eda8a916/hero-right-bg-min.jpg/m/0x300',
        as: 'image',
      },
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/1100x714/01eda8a916/hero-right-bg-min.jpg/m/0x500',
        as: 'image',
      },
      {
        rel: 'preload',
        href: 'https://a.storyblok.com/f/150258/791x571/2ee75e03c1/track-clipart-logo-14-1-min.png/m/600x0',
        as: 'image',
      },
    ],
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
      /* < src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.13.4/js/uikit.min.js" integrity="sha512-o8CK0J43tUy+UMv1pgLI3neZyc8/gH4qqREvpBMb1geAv3bcKnJIdRvxUMGZQK+4gf6qixaK6NiNwW2Esa9BZg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */
      /* {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.13.4/js/uikit.min.js',
        integrity:
          'sha512-o8CK0J43tUy+UMv1pgLI3neZyc8/gH4qqREvpBMb1geAv3bcKnJIdRvxUMGZQK+4gf6qixaK6NiNwW2Esa9BZg==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      }, */
      {
        type: 'module',
        async: true,
        src: 'https://unpkg.com/@lottiefiles/lottie-player@1.5.6/dist/lottie-player.js',
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
  // css: ['~/assets/fonts/fonts.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // '~/plugins/uikit.js'
  // * worker for lottie player
  // '~/plugins/workers.js'
  // '~/plugins/lottie-vue-player.client.js'

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components', '~/components/base', '~/components/storyblok'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-windicss',
    'nuxt-compress',
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
    // '@nuxtjs/critters',
    '@nuxtjs/style-resources',
    'nuxt-mq',
    'nuxt-precompress',
    /* [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ], */
  ],

  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },

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

  loadingIndicator: {
    name: 'fading-circle',
    color: '#E40D04',
    background: 'black',
  },

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
    // extractCSS: true,
  },
};
