import Cmc from '../lib/Cmc/Cmc'

let cache: Cmc | null = null

export const initCmc = async (apiKey: string) => {
  cache = Cmc.create(apiKey)
}

export default (): Cmc => {
  if (!cache) {
    throw new Error('Cmc not initialized - call initCmc first')
  }

  return cache
}
