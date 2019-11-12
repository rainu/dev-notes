import colors from 'vuetify/es5/util/colors'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/dev-notes/'
  }
} : {
  router: {
    base: '/'
  }
}
routerBase.router.middleware = ['encryption', 'dropbox']

export default {
  ...routerBase,

  mode: 'spa',

  generate: {
    dir: 'docs'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${routerBase.router.base}favicon.ico` }
    ]
  },

  env: {
    appName: process.env.npm_package_name,
    routerBase: routerBase.router.base,
    version: process.env.npm_package_version,
    revision: process.env.COMMIT_HASH || 'development',
    dropbox: {
      clientId: process.env.DROPBOX_CLIENT_ID || 'h89z3y690lntrca',
      redirectUrl: ( routerBase.router.base + '?recall=dropbox' )
    },
  },

  manifest: {
    "name": "DevNotes",
    "short_name": "DevNotes",
    "start_url": routerBase.router.base,
    "scope": routerBase.router.base + ".",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#FFE7A2",
    "theme_color": "#74B392",
    "dir": "ltr",
    "lang": "de-DE"
  },

  icon: {
    sizes: [16, 32, 120, 144, 152, 192, 384, 512]
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
    '~/plugins/notification',
    '~/plugins/reminder',
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
      themes: {
        dark: {
          primary: '#74B392',
          accent: '#eaff00',
          secondary: '#FFE7A2',
          info: '#40f934',
          warning: '#b8b11e',
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
      //we need the compiler-included build for template-notes!
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
