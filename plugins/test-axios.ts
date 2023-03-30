import type { Plugin } from '@nuxt/types'

export default <Plugin> function ({ $axios }) {
  $axios.get('/favicon.png')
  // I do something here.
}
