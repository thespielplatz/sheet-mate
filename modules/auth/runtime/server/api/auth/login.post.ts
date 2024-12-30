import z from 'zod'

const InputSchema = z.object({
  accessKey: z.string()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, InputSchema.parse)
  
  const config = useConfig()

  const user = config.users?.find(user => user.accessKey === body.accessKey)
  if (!user) {
    throw createError({
      status: 401,
      message: "Login Denied",
      statusMessage: "Login request Denied",
    })
  }

  const refreshToken = await createRefreshToken({ userId: user.id })
  setCookie(event, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  const accessToken = await createAccessToken({ userId: user.id })
  
  return {
    accessToken
  }
})
