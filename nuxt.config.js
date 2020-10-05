export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'New York Public Radio Live Streaming | WNYC Lab',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'WNYC Lab is a new, experimental way to listen to WNYC, America\'s most listened-to public radio station. Enjoy the public radio programming you love, try out new features, and leave us your feedback.'
      },
      {
        hid: 'og_site_name',
        name: 'og:site_name',
        content: 'WNYC Lab'
      },
      {
        hid: 'og_url',
        name: 'og:url',
        content: 'https://lab.wnyc.org'
      },
      {
        hid: 'og_type',
        name: 'og:type',
        content: 'website'
      },
      {
        hid: 'og_locale',
        name: 'og:locale',
        content: 'en_US'
      },
      {
        hid: 'og_title',
        name: 'og:title',
        content: 'An experimental way to listen to WNYC, America\'s most listened-to public radio station.'
      },
      {
        hid: 'og_description',
        name: 'og:description',
        content: 'Enjoy the public radio programming you love, try out new features, and leave us your feedback.'
      },
      {
        hid: 'og_image',
        name: 'og:image',
        content: 'https://media.wnyc.org/i/1200/1200/c/80/1/wnyc_square_logo.png'
      },
      {
        hid: 'og_image_width',
        name: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og_image_height',
        name: 'og:image:height',
        content: '1200'
      },
      {
        hid: 'og_image_alt',
        name: 'og:image:alt',
        content: 'WNYC Lab'
      },
      {
        hid: 'fb_app_id',
        name: 'fb:app_id',
        content: '151261804904925'
      },
      {
        hid: 'twitter_title',
        name: 'twitter:title',
        content: 'WNYC Lab'
      },
      {
        hid: 'twitter_description',
        name: 'twitter:description',
        content: 'An experimental way to listen to WNYC, America\'s most listened-to public radio station.'
      },
      {
        hid: 'twitter_url',
        name: 'twitter:url',
        content: 'https://lab.wnyc.org'
      },
      {
        hid: 'twitter_site',
        name: 'twitter:site',
        content: '@WNYC'
      },
      {
        hid: 'twitter_image',
        name: 'twitter:image',
        content: 'https://media.wnyc.org/i/1200/1200/c/80/1/wnyc_square_logo.png'
      },
      {
        hid: 'twitter_alt',
        name: 'twitter:alt',
        content: 'WNYC Lab'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://media.wnyc.org/static/img/favicon_wnyc.ico?_=1553611630'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { lang: 'scss', src: './assets/main.scss' }
  ],

  styleResources: { scss: './assets/*.scss' },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: true
  }
}
