import z from 'zod'
import consola from 'consola'
import { getScannerConfig } from '../../utils/getScannerConfig'

const InputSchema = z.object({
  scannerId: z.string().describe('Scanner id'),
  code: z.string().describe('Inventory code'),
  amount: z.number().describe('Inventory amount'),
})

export const OutputDto = z.object({
  Id: z.number(),
})

export default defineLoggedInEventHandler(async (event, user) => {
  const query = await readValidatedBody(event, InputSchema.parse)
  const scannerConfig = getScannerConfig({ userId: user.id, scannerId: query.scannerId })
  if (!scannerConfig) {
    throw createError({
      status: 404,
      message: 'Scanner not found',
    })
  }

  const nocoDB = useNocoDB({ ...scannerConfig.nocoDb })
  try {
    let id
    const record = await nocoDB.getRecordByField({ field: 'code', value: query.code })

    if (record.list.length === 0) {
      id = null
    } else {
      id = record.list[0].Id
    }

    if (id) {
      const updateResult = await nocoDB.updateRecord({
        Id: id,
        amount: query.amount,
      })
      return OutputDto.parse(updateResult)
    }
    const createResult = await nocoDB.createRecord({
      code: query.code,
      amount: query.amount,
    })
    return OutputDto.parse(createResult)
  } catch (error) {
    consola.error(error)
    throw createError({
      status: 500,
      message: String(error),
    })
  }
})
