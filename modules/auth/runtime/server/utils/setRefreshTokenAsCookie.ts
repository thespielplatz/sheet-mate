import { setCookie, H3Event } from 'h3'

export const setRefreshTokenAsCookie = async ({ event, userId, sessionId }: { event: H3Event, userId: string, sessionId: string }) => {
  const newRefreshToken = await createRefreshToken({ userId, sessionId })
  setCookie(event, useRuntimeConfig().authModule.refreshCookieName, newRefreshToken, {
    httpOnly: true,
    secure: isDevelopmentMode() ? false : true,
    sameSite: 'strict',
  })
}
