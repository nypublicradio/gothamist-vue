export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'WNYC | New York Public Radio, Podcasts, Live Streaming Radio, News',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "WNYC is America's most listened-to public radio station and the producer of award-winning programs and podcasts like Radiolab, On the Media, and The Brian Lehrer Show."
      },
      {
        hid: 'og_site_name',
        name: 'og:site_name',
        content: 'WNYC'
      },
      {
        hid: 'og_url',
        name: 'og:url',
        content: 'https://www.wnyc.org/radio'
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
        content: 'WNYC | New York Public Radio, Podcasts, Live Streaming Radio, News'
      },
      {
        hid: 'og_description',
        name: 'og:description',
        content: "WNYC is America's most listened-to public radio station and the producer of award-winning programs and podcasts like Radiolab, On the Media, and The Brian Lehrer Show."
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
        content: 'WNYC'
      },
      {
        hid: 'fb_app_id',
        name: 'fb:app_id',
        content: '151261804904925'
      },
      {
        hid: 'twitter_title',
        name: 'twitter:title',
        content: 'WNYC'
      },
      {
        hid: 'twitter_description',
        name: 'twitter:description',
        content: 'WNYC | New York Public Radio, Podcasts, Live Streaming Radio, News'
      },
      {
        hid: 'twitter_url',
        name: 'twitter:url',
        content: 'https://www.wnyc.org/radio'
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
        content: 'WNYC'
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
    '@nuxtjs/axios',
    '@nuxtjs/gtm'
  ],

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GTM_ID,
      pageTracking: true,
      pageViewEventName: 'Page View'
    },
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
      baseURL: process.env.WHATS_ON_API
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // this is needed to transpile es6 modules imported from radial
    transpile: [
      'nypr-design-system-vue',
      'vue-hifi'
    ]
  }
}
