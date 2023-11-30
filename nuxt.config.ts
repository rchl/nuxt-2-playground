import type { NuxtConfig } from '@nuxt/types';

// import consola, { JSONReporter } from 'consola'
// consola.setReporters([
//   new JSONReporter(),
// ])

const config: NuxtConfig = {
    server: {
        port: 9000,
    },

    build: {
        transpile: [
            '/crypto-js/',
        ],
    },

    components: true,

    // This should be typed properly.
    sentry: {
        dsn: '123',
        config: {
            debug: true,
        },
    },

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        'volar-component-types/nuxt',
    ],

    modules: [
        '@nuxtjs/axios',
    ],

    plugins: [
    // '~/plugins/test-axios.ts'
    ],

    serverMiddleware: [
    // '~/api/test.ts'
    ],

    typescript: {
        typeCheck: false,
    },
};

export default config;
