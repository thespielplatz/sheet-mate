import z from 'zod'
import { getScannerConfig } from '../../utils/getScannerConfig'

const InputSchema = z.object({
  scannerId: z.string().describe('Scanner id'),
  inventoryId: z.string().describe('Inventory id'),
})

const customFieldsParser = z.array(z.unknown()).transform((fields) =>
  fields.map((field) => {
    if (typeof field !== "object" || field === null) {
      throw new Error("Invalid field format");
    }
    const key = Object.keys(field)[0];
    const name = Object.values(field)[0];
    return { key, name: String(name) };
  })
);

const InventoryItemDto = z.object({
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

export default defineLoggedInEventHandler(async (event, user) => {
  const query = await getValidatedQuery(event, InputSchema.parse)

  const scannerConfig = getScannerConfig({ userId: user.id, scannerId: query.scannerId })
  if (!scannerConfig) {
    throw createError({
      status: 404,
      message: 'Scanner not found',
    })
  }

  const nocoDB = useNocoDB({ ...scannerConfig.nocoDb })
  const result = await nocoDB.getRecordByField({ field: 'code', value: query.inventoryId })
  console.log('Noco Result', result) 

  if (result.list.length === 0) {
    return InventoryItemDto.parse(null)
  }

  const inventoryItem = result.list[0]
  const parsed = InventoryItemDto.parse(inventoryItem)
  console.log('Parsed', parsed)

  return parsed
})
