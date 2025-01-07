import z from 'zod'

const InputSchema = z.object({
  id: z.string().describe('Id of a QR code scanner mate'),
})

export const OutputDto = z.object({
  name: z.string(),
})
export type OutputDtoType = z.infer<typeof OutputDto>

export default defineLoggedInEventHandler(async (event, user) => {
  const query = await getValidatedQuery(event, InputSchema.parse)
  const importerId = query.id

  const cmcConfig = getCmcConfig({ userId: user.id, importerId })
  if (!cmcConfig) {
    throw createError({
      status: 404,
      message: 'Cmc Importer not found',
    })
  }

  return OutputDto.parse(cmcConfig)
})
