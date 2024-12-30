export default class Auth {
  accessToken: string | null = null

  async loginWithAccessKey(accessKey: string) {
    try {
      const success = await $fetch('/api/auth/login', { 
        method: 'POST',
        body: { accessKey },
      })
      return success
    } catch (e) {
      return false
    }
  }
}