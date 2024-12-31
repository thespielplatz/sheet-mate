import z from 'zod'
import { getScannerConfig } from '../utils/getScannerConfig'

const InputSchema = z.object({
  id: z.string().describe('item id'),
})

const ScannerItemDto = z.object({
  name: z.string(),
}).nullable()

export default defineLoggedInEventHandler(async (event, user) => {
  const query = await getValidatedQuery(event, InputSchema.parse)
  const scannerId = query.id

  const scannerConfig = getScannerConfig({ userId: user.id, scannerId })
  if (!scannerConfig) {
    throw createError({
      status: 404,
      message: 'Scanner not found',
    })
  }

  throw createError({
    status: 501,
    message: 'Not implemented',
  })

  return ScannerItemDto.parse({
  })
})
