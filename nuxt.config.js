const pkg = require('./package');

module.exports = {
  mode: 'universal',

  srcDir: 'src/client',

  build: {
    babel: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              'apollo-client-resolvers':
                './local_modules/apollo-client-resolvers'
            }
          }
        ]
      ]
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      default: '~/apollo/index.js'
    }
  }
};
