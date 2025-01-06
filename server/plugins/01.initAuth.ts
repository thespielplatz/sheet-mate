import consola from 'consola'

export default defineNitroPlugin((nitroApp) => {
  consola.info('01 Configuring Auth Plugin')
  useUserProvider().set({
    login: (accessKey) => {
      const user = useConfig().users?.find((user) => user.accessKey === accessKey)
      if (!user) {
        return null
      }
      return user
    },
    getUser(userId) {
      const user = useConfig().users?.find((user) => user.id === userId)
      if (!user) {
        return null
      }      
      return user
    },
  })
})