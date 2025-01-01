import { z } from 'zod'

export const UpdateRecordResultSchema = z.object({
  Id: z.number(),
})

export type UpdateRecordResultSchema = z.infer<typeof UpdateRecordResultSchema>
