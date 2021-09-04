export default {
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL
  },
  env: {
    GA_TRACKING: process.env.GA_TRACKING
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Test NuxtJS",
    htmlAttrs: {
      lang: "vi"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "author",
        content: "njim"
      },
      {
        name: "robots",
        content: "noindex,nofollow"
      },
      {
        hid: "description",
        name: "description",
        content: "Demo NuxtJS"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: process.env.API_BASE_URL,
        crossorigin: true
      },
      {
        rel: "dns-prefetch",
        href: process.env.API_BASE_URL
      },
      {
        rel: "preconnect",
        href: process.env.CDN_URL,
        crossorigin: true
      },
      {
        rel: "dns-prefetch",
        href: process.env.CDN_URL
      }
    ],
    noscript: [
      {
        innerHTML: "Please install/enable javascript !",
        body: true
      }
    ]
  },

  loading: {
    color: "#2f855a"
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in"
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/custom.css", "@/assets/css/custom.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axios",
    "~plugins/vue-js-modal",
    "~plugins/vee-validate",
    "~plugins/loading",
    "~plugins/globalMixins",
    "~plugins/v-select"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "nuxt-purgecss"
  ],

  build: {
    transpile: ["vee-validate/dist/rules"],
    extend(config, { isDev, isClient, loaders: { vue } }) {
      config.node = {
        fs: "empty"
      };
    }
  },

  serverMiddleware: [
    {
      path: "api/update-users",
      handler: "~server/api/update-users"
    },
    {
      path: "api/update-roles",
      handler: "~server/api/update-roles"
    },
    {
      path: "api/check-email",
      handler: "~server/api/check-email"
    }
  ],

  purgeCSS: {
    // your settings here
    whitelist: ["body", "html", "nuxt-progress"],
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      /closeNav/,
      /^v-select/,
      /^vs__/,
      /^vs--/
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/toast", "@nuxtjs/pwa", "@nuxt/content"],

  content: {
    // Options
  },

  toast: {
    position: "bottom-center",
    duration: 2000
  }
};
