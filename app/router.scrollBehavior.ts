import { RouterOptions } from 'vue-router'

const scrollBehavior: RouterOptions['scrollBehavior'] = (to, from, savedPosition) => {
  console.info('INFO')
}

export default scrollBehavior
