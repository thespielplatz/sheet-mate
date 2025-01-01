import z from 'zod'
import consola from 'consola'
import { getScannerConfig } from '../../utils/getScannerConfig'

const InputSchema = z.object({
  scannerId: z.string().describe('Scanner id'),
  code: z.string().describe('Inventory code'),
  amount: z.number().describe('Inventory amount'),
})

export const InventoryItemDto = z.object({
  Id: z.number(),
  name: z.string(),
  code: z.string(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
  amount: z.number(),
}).passthrough().transform((item) => {
  const transformed = {
    id: item.Id,
    name: item.name,
    code: item.code,
    amount: item.amount,
    createdAt: new Date(item.CreatedAt).getTime(),
    updatedAt: new Date(item.UpdatedAt).getTime(),
    fields: {},
  }

  // Extract passthrough fields
  transformed.fields = Object.keys(item)
    .filter((key) => !["Id", "name", "code", "CreatedAt", "UpdatedAt", "amount"].includes(key))
    .reduce((acc, key) => {
      acc[key] = String(item[key])
      return acc
    }, {} as Record<string, string>)

  return transformed
}).nullable()

export type InventoryItemDto = z.infer<typeof InventoryItemDto>

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
    const result = await nocoDB.getRecordByField({ field: 'code', value: query.code })

    if (result.list.length === 0) {
      id = null
    } else {
      id = result.list[0].Id      
    }

    if (id) {
      await nocoDB.updateRecord({
        Id: id,
        amount: query.amount,
      })
      return true
    }
    return true
  } catch (error) {
    consola.error(error)
    throw createError({
      status: 500,
      message: String(error),
    })
  }
})
