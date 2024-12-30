export const createRefreshToken = async ({ userId }: { userId: string }) => {
  return useJwt().createJwt({
    payload: {
      userId
    },
    issuer: useRuntimeConfig().authModule.issuer,
    audience:  useRuntimeConfig().authModule.audience,
    expirationTime: useRuntimeConfig().authModule.refreshTokenExpirationTime,
  })
}
