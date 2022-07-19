export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'celestePageV3',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/static/font-awesome-4.7.0/css/font-awesome.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    {
      src: '@/plugins/element-ui',
      ssr: true
    },
    '@/plugins/NuxtAxios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
    },
    vendor: ['axios'] // 为防止重复打包
  },
  axios: {
    proxy: true,
    // prefix: '/api/',
    credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:3001/', //这个网站是开源的可以请求到数据的
      pathRewrite: {
        '^/api/': '',
        changeOrigin: true
      }
    }
  },
}
