import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const UserSchema = z.object({
  id: z.string().length(21),
  authKey: z.string(),
})

const InventoryScannerSchema = z.object({
  userId: z.string(),
  name: z.string(),
  nocoDb: z.object({
    url: z.string(),
    apiToken: z.string(),
  }),
})

export const ConfigSchema = z.object({
  users: z.array(UserSchema).default([]).optional(),
  inventoryScanners: z.array(InventoryScannerSchema).default([]).optional(),
})

export type ConfigType = z.infer<typeof ConfigSchema>

export const parseConfig = () => {
	const configFilePath = path.resolve(process.cwd(), 'config.json')

  try {
    const configData = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))
    return ConfigSchema.parse(configData)
  } catch (error) {
    console.error('Invalid configuration:', error)
    console.info('Using default configuration')
    return ConfigSchema.parse({})
  }
}