export const getScannerConfig = ({ userId, scannerId }: { userId: string, scannerId: string}) => {
  let scannerConfigs = useConfig().inventoryScanners?.filter(scanner => scanner.userId === userId && scanner.id === scannerId)
  if (!scannerConfigs || scannerConfigs.length === 0) {
    return null
  }
  return scannerConfigs[0]
}
