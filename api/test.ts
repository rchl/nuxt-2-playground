import type { ServerMiddleware } from '@nuxt/types'

export default <ServerMiddleware> function serverMiddleware (_req, res, _next) {
  res.end('Hello')
}
