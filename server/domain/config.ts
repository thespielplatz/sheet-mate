import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const UserSchema = z.object({
  id: z.string(),
  accessKey: z.string(),
})

const InventoryScannerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  nocoDb: z.object({
    domain: z.string(),
    apiToken: z.string(),
    table: z.string(),
  }),
})

const CmcImporterSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
})

export const ConfigSchema = z.object({
  users: z.array(UserSchema).default([]).optional(),
  inventoryScanners: z.array(InventoryScannerSchema).default([]).optional(),
  cmcImporters: z.array(CmcImporterSchema).default([]).optional(),
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