import consola from 'consola'

export default defineNuxtPlugin({
  name: 'auth-plugin',
  async setup (nuxtApp) {
    consola.info('Installing Auth Plugin')

    return {
      provide: {
        auth: {
          loginWithAccessKey: async (accessKey: string) => {
            try {
              const success = await $fetch('/api/auth/login', { 
                method: 'POST',
                body: { accessKey },
              })
              return success
            } catch (e) {
              return false
            }
          }
        }
      }
    }
  }
})