import z from 'zod'

export const DashboardItemDto = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['intentoryScanner', 'cmcImporter']),
})
export type DashboardItemDtoType = z.infer<typeof DashboardItemDto>

export const DashboardDto = z.array(DashboardItemDto)
export type DashboardDtoType = z.infer<typeof DashboardDto>

export default defineLoggedInEventHandler(async (event, user) => {
  const config = useConfig()

  const inventoryScanners = mapItems(user.id, 'intentoryScanner', config.inventoryScanners)
  const cmcImporters = mapItems(user.id, 'cmcImporter', config.cmcImporters)

  return DashboardDto.parse([...inventoryScanners, ...cmcImporters])
})

const mapItems = (userId: string, type: string, items?: { userId: string, id: string, name: string }[]) => items?.filter(item => item.userId === userId).map(({ id, name }) => ({ id, name, type })) || []
