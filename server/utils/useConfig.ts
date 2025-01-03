import { parseConfig, type ConfigType } from '../domain/config'

let configCache: ConfigType | null = null

export const useConfig = (): ConfigType => {
  if (!configCache) {
    configCache = parseConfig()
  }

  return configCache
}
