const toHexString = (byteArray: Uint8Array): string => {
  return Array.from(byteArray)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

export default toHexString