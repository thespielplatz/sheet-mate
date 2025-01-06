export const userProvider: IUserProvider = {
  login(accessKey) {
    const user = useConfig().users?.find((user) => user.accessKey === accessKey)
    if (!user) {
      return null
    }
    return user
  },
  getUser(userId: string) {
    const user = useConfig().users?.find((user) => user.id === userId)
    if (!user) {
      return null
    }      
    return user
  },
}
