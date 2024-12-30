import consola from 'consola'

import Auth from '../lib/Auth'

export default defineNuxtPlugin({
  name: 'auth-plugin',
  async setup (nuxtApp) {
    consola.info('Installing Auth Plugin')

    return {
      provide: {
        auth: new Auth()
      }
    }
  }
})