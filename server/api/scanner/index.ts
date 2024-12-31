import z from 'zod'
import { getScannerConfig } from '../utils/getScannerConfig'

const InputSchema = z.object({
  id: z.string().describe('Id of a QR code scanner mate'),
})

const OutputSchema = z.object({
  name: z.string(),
})

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

  return OutputSchema.parse({
    name: scannerConfig.name,
  })
})
