export const getCmcConfig = ({ userId, importerId }: { userId: string, importerId: string }) => {
  const cmcConfigs = useConfig().cmcImporters?.filter(item => item.userId === userId && item.id === importerId)
  if (!cmcConfigs || cmcConfigs.length === 0) {
    return null
  }
  return cmcConfigs[0]
}
