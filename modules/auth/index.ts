import { defineNuxtModule, createResolver, addPlugin, addServerHandler } from '@nuxt/kit'
import consola from 'consola'

export default defineNuxtModule({
  meta: {
    name: 'auth-module',
    configKey: 'authModule',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {},
  hooks: {},
  setup(moduleOptions, nuxt) {
    consola.info('Installing Auth module')
    const { resolve } = createResolver(import.meta.url)
    addServerHandler({
      route: '/api/auth',
      handler: resolve('./runtime/server/api/auth/')
    })
    addServerHandler({
      route: '/api/auth/login',
      handler: resolve('./runtime/server/api/auth/login.post')
    })
    addPlugin({
      src: resolve('./runtime/plugins/auth.client'),
      mode: 'client',
    })
    //addPlugin(resolve('./runtime/plugins/auth.client.ts'))
    // Components: https://nuxt.com/docs/guide/going-further/modules#injecting-vue-components-with-addcomponent
  }
})