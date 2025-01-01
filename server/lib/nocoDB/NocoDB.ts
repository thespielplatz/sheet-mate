import { RecordsResultSchema as RecordsResultSchema } from './RecordsResultSchema'

export default class NocoDB {
  domain: string
  table: string
  apiToken: string

  static create({ domain, table, apiToken }: { domain: string, table: string, apiToken: string }) {
    return new NocoDB({ domain, table, apiToken })
  }

  constructor({ domain, table, apiToken }: { domain: string, table: string, apiToken: string }) {
    this.domain = domain
    this.table = table
    this.apiToken = apiToken
  }

  async getRecordByField({ field, value }: { field: string, value: string }) {
    const url = `${this.getTableUrl}/records`

    const result = await $fetch(url, {
      headers: {
        'xc-token': this.apiToken,
      },
      query: {
        where: `(${field},eq,${value})`,
      }
    })
    return RecordsResultSchema.parse(result)
  }

  private get getTableUrl() {
    return `${this.domain}/api/v2/tables/${this.table}`
  }
}