const baseUrl = 'https://pro-api.coinmarketcap.com/v1'

export default class Cmc {
  public static create(apiKey: string): Cmc {
    return new Cmc(apiKey)
  }

  private apiKey: string

  private constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async map(symbols: string) {
    const url = `${baseUrl}/cryptocurrency/map?symbol=${symbols}`
    const response = await $fetch(url, {
      method: 'GET',
      headers: this.createHeaders(),
    })
    return response
  }

  async value(ids: string): Promise<unknown> {
    const url = `${baseUrl}/cryptocurrency/quotes/latest?id=${ids}&convert=EUR`
    const response = await $fetch(url, {
      method: 'GET',
      headers: this.createHeaders(),
    })
    return response
  }

  private createHeaders() {
    return {
      'X-CMC_PRO_API_KEY': this.apiKey,
      'Content-Type': 'application/json',
    }
  }
}
