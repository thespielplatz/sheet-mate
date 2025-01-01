import { FetchError } from 'ofetch'

export default (e: unknown) => {
  if (e instanceof FetchError) {
    const fetchError = e as FetchError
    if (fetchError.data.message) {
      return fetchError.data.message
    }
    return fetchError.message
  }
  return String(e)
}
