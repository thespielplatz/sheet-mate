import z from 'zod'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, useRuntimeConfig().authModule.refreshCookieName)
  if (!refreshToken) {
    deleteCookie(event, useRuntimeConfig().authModule.refreshCookieName)
    throw createError({
      status: 400,
      message: "No refresh token cookie",
    })
  }

  try {
    const { userId, sessionId } = await validateRefreshToken({ jwt: refreshToken})

    await setRefreshTokenAsCookie({ event, userId, sessionId })
  
    const accessToken = await createAccessToken({ userId: userId })
    
    return {
      accessToken
    }
  } catch (err) {
    deleteCookie(event, useRuntimeConfig().authModule.refreshCookieName)
    throw createError({
      status: 400,
      message: "Invalid refresh token",
    })
  }
})
