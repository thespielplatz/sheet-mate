export default class Auth {
  _accessToken: string | null = null

  async loginWithAccessKey(accessKey: string) {
    try {
      const { accessToken } = await $fetch('/api/auth/login', { 
        method: 'POST',
        body: { accessKey },
      })
      this._accessToken = accessToken
      return true
    } catch (e) {
      this._accessToken = null
      return false
    }
  }

  async refresh() {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh')
      this._accessToken = accessToken
      return true
    } catch (e) {
      this._accessToken = null
      return false
    }    
  }

  get accessToken() {
    return this._accessToken
  }

  get $fetch() {
    return $fetch.create({
      headers: {
        Authorization: `${this.accessToken}`
      }
    })
  }
}