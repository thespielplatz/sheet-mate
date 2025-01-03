import consola from 'consola'

export default defineNitroPlugin((nitroApp) => {
  consola.info('Initializing Auth module')
  consola.info(`- Development mode: ${isDevelopmentMode()}`)
  consola.info(`- Refresh Cookie secure: ${isDevelopmentMode() ? 'false' : 'true'}`)

  // Currently Nitro Plugins are synchronous, so we can't use async/await
  initJwt()
})