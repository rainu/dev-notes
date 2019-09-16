import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  manifest: {
    "name": "RayNote",
    "short_name": "RayNote",
    "start_url": "/",
    "scope": ".",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#fff",
    "theme_color": "#fff",
    "dir": "ltr",
    "lang": "de-DE"
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/localStore',
    '~/plugins/i18n',
    '~/plugins/init',
    '~/plugins/style',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#74B392',
          accent: '#eaff00',
          secondary: '#FFE7A2',
          info: '#40f934',
          warning: '#FFE7A2',
          error: '#FF6363',
          success: '#74B392',
        },
        light: {
          primary: '#74B392',
          accent: '#eaff00',
          secondary: '#FFE7A2',
          info: '#40f934',
          warning: '#FFE7A2',
          error: '#FF6363',
          success: '#74B392',

          header: '#FFE7A2',
          footer: '',
          navigation: colors.grey.lighten3,
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
