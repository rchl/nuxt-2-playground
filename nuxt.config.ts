import type { NuxtConfig } from '@nuxt/types'

// import consola, { JSONReporter } from 'consola'
// consola.setReporters([
//   new JSONReporter(),
// ])

const config: NuxtConfig = {
  components: true,

  // This should be typed properly.
  sentry: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
  ],

  typescript: {
    // typeCheck: false
  }
}

export default config
