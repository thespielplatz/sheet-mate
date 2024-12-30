import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import type { UserType } from '../lib/UserSchema'

export const defineLoggedInEventHandler = <T extends EventHandlerRequest, D>(
  handler: (event: H3Event<T>, user: UserType) => Promise<D> // Update handler type to include user parameter
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    
    const authorization = getHeader(event, 'Authorization')
    if (!authorization) {
      throw createError({
        status: 400,
        message: "Authorization header is missing",
      })
    }

    try {
      const { userId } = await validateAccessToken({ jwt: authorization })
      const user = useConfig().users?.find(u => u.id === userId)
      if (!user) {
        throw createError({
          status: 401,
          message: "User not found",
        })
      }

      return await handler(event, user)
    } catch (err) {
      throw createError({
        status: 400,
        message: "Invalid access token",
      })
    }
  })
