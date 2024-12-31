import z from 'zod'

const DashboardDto = z.array(z.object({
  id: z.string(),
  name: z.string(),
}))

export default defineLoggedInEventHandler(async (event, user) => {
  const inventoryScanners = useConfig().inventoryScanners?.filter(scanner => scanner.userId === user.id).map(scanner => {
    return {
      id: scanner.id,
      name: scanner.name,
    }
  })
  return DashboardDto.parse(inventoryScanners)
})
