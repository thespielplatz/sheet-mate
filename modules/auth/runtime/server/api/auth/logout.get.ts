export default defineEventHandler(async (event) => {
  deleteCookie(event, useRuntimeConfig().authModule.refreshCookieName)
  return true
})
