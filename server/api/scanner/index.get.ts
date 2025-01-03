import z from 'zod'
import { getScannerConfig } from '../../utils/getScannerConfig'
import checkTableMetadata from '~/server/domain/scanner/checkTableMetadata'
import { TableMetadataResultSchema } from '~/server/lib/nocoDB/TableMetadataResultSchema'

const InputSchema = z.object({
  id: z.string().describe('Id of a QR code scanner mate'),
})

export const OutputDto = TableMetadataResultSchema.extend({
  name: z.string().describe('Name of the scanner'),
  domain: z.string(),
  table: z.string(),
}).nullable()
export type OutputDtoType = z.infer<typeof OutputDto>

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

  return OutputDto.parse({ 
    ...result,
    domain: scannerConfig.nocoDb.domain,
    name: scannerConfig.name,
    table: scannerConfig.nocoDb.table,
  })
})
