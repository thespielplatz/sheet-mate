import consola from 'consola'
import { initCmc } from '../utils/useCoinmarketcap'

export default defineNitroPlugin(() => {
  consola.info('02 Init CMC')
  const apiKey = useConfig().coinmarketcap?.apiKey
  if (apiKey) {
    initCmc(apiKey)
    consola.success('CMC initialized')
  } else {
    consola.error('CMC not initialized - no API key provided')
  }
})
