export default class Auth {
  accessToken: string | null = null
  initialRefreshPromise: Promise<boolean> | null = null

  async loginWithAccessKey(accessKey: string) {
    try {
      const { accessToken } = await $fetch('/api/auth/login', { 
        method: 'POST',
        body: { accessKey },
      })
      this.accessToken = accessToken
      return true
    } catch (e) {
      this.accessToken = null
      return false
    }
  }

  async refresh() {
    if (this.initialRefreshPromise) {
      return this.initialRefreshPromise
    }

    this.initialRefreshPromise = this.startRefresh()
    return this.initialRefreshPromise
  }

  async logout() {
    try {
      const success = await $fetch('/api/auth/logout')
      this.accessToken = null
      return success
    } catch (e) {
      this.accessToken = null
      return false
    }        
  }

  async redirectIfLoggedIn() {
    const loggedIn = await this.isLoggedIn()
    console.log('redirectIfLoggedIn', loggedIn)
    if (loggedIn) {
      await navigateTo(useRuntimeConfig().public.authModule.redirectOnLoggedIn, { replace: true })
    }
  }

  async isLoggedIn() {
    if (!this.initialRefreshPromise) {
      this.initialRefreshPromise = this.startRefresh()
    }    
    await this.initialRefreshPromise
    return this.accessToken !== null
  }
  
  get $fetch() {
    return $fetch.create({
      headers: {
        Authorization: `${this.accessToken}`
      }
    })
  }

  private async startRefresh() {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh')
      this.accessToken = accessToken
      console.log('refresh - success')
      return true
    } catch (e) {
      this.accessToken = null
      console.log('refresh - nope')
      return false
    }
  }
}