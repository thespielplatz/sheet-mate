import getParamSafe from '~/server/utils/getParamSafe'

export default defineEventHandler(async (event) => {
  //const body = await readBody(event)
  //const test = getParamSafe(body, 'test')

  return {
    'status': 'ok',
  }
})
