export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '蔚蓝群服MiaoNet',
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
    'nuxt-socket-io',
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3001'
    }]
  },
  axios: {
		prefix: "/api", // 配置请求接口前缀
		proxy: true // 开启代理
	},
	// 配置代理
	proxy: {
		"/api": {
			// 配置接口地址
			target: "http://localhost:3001/api/",
			pathRewrite: {
				"^/api/":"/"
			},
			changeOrigin: true
		}
	},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
    },
    vendor: ['axios'] // 为防止重复打包
  },
}
