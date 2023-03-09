/** @type {import('@nuxt/types').NuxtConfig} */
const config = {
  server: {
    port: 9000
  },

  // This should be typed properly.
  sentry: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ]
}

export default config
