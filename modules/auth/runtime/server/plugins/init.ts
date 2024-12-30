import consola from 'consola'

export default defineNitroPlugin((nitroApp) => {
  consola.info('Initializing Auth module')
  // Currently Nitro Plugins are synchronous, so we can't use async/await
  initJwt()
})