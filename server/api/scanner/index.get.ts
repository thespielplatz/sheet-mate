import z from 'zod'
import { getScannerConfig } from '../../utils/getScannerConfig'
import checkTableMetadata from '~/server/domain/scanner/checkTableMetadata'

const InputSchema = z.object({
  id: z.string().describe('Id of a QR code scanner mate'),
})

const ScannerDto = z.object({
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

  const nocoDB = useNocoDB({ ...scannerConfig.nocoDb })
  const result = await nocoDB.getTableMeta()
  
  if (!checkTableMetadata(result)) {
    throw createError({
      status: 500,
      message: 'Table metadata is not correct!',
    })
  }

  return ScannerDto.parse({
    name: scannerConfig.name,
  })
})
