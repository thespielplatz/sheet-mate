import consola from 'consola'
import { AuthUserSchema } from '~/modules/auth/runtime/server/lib/AuthUserSchema'

export default defineNitroPlugin((nitroApp) => {
  consola.info('01 Configuring Auth Plugin')
  useUserHandler().set({
    login: (accessKey) => {
      const user = useConfig().users?.find((user) => user.accessKey === accessKey)
      if (!user) {
        return null
      }
      return AuthUserSchema.parse(user)
    },
    getUser(userId) {
      const user = useConfig().users?.find((user) => user.id === userId)
      if (!user) {
        return null
      }      
      return AuthUserSchema.parse(user)
    },
  })
})