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

  const sessionId = await createSessionId()
  await setRefreshTokenAsCookie({ event, userId: user.id, sessionId })

  const accessToken = await createAccessToken({ userId: user.id })
  
  return {
    accessToken
  }
})
