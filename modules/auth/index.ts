import { defineNuxtModule, createResolver, addPlugin, addServerScanDir } from '@nuxt/kit'
import consola from 'consola'
import { defu } from 'defu'

import type { Nuxt } from 'nuxt/schema'

import isDevelopmentMode from './runtime/server/utils/isDevelopmentMode'

export default defineNuxtModule({
  meta: {
    name: 'auth-module',
    configKey: 'authModule',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    issuer: 'not-set',
    audience: 'not-set',
    refreshTokenExpirationTime: '28 days',
    accessTokenExpirationTime: '5 min',
    refreshCookie: {
      name: 'refresh_token',
      secure: true,
      sameSite: 'lax',
      expiresInDays: 25,
    },
    public: {
      redirectOnLoggedIn: '/dashboard',
    },
  },
  hooks: {},
  async setup(moduleOptions, nuxt) {
    consola.info('Installing Auth module')

    if (isDevelopmentMode()) {
      moduleOptions.refreshCookie.secure = false
    }

    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      authModule: moduleOptions,
    })
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      authModule: moduleOptions.public,
    })

    registerAll(nuxt)
  }
})

const registerAll = (nuxt: Nuxt) => {
  const { resolve } = createResolver(import.meta.url)

  const runtimeDir = resolve('./runtime')
  nuxt.options.build.transpile.push(runtimeDir)

  addPlugin({
    src: resolve(runtimeDir, 'plugins/auth.client'),
    mode: 'client',
  })

  addServerScanDir(resolve(runtimeDir, 'server'))
  // Components: https://nuxt.com/docs/guide/going-further/modules#injecting-vue-components-with-addcomponent
}
