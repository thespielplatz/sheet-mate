import NocoDB from '../lib/nocoDB/NocoDB'

export const useNocoDB = ({ domain, table, apiToken }: { domain: string, table: string, apiToken: string }) => {
  return new NocoDB({ domain, table, apiToken })
}
