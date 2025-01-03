import { z } from 'zod'

export const TableMetadataResultSchema = z.object({
  base_id: z.string(),
  columns: z.array(z.object({
    title: z.string(),
    column_name: z.string(),
    uidt: z.string(),
    ct: z.string().nullable(),
  })),
})

export type TableMetadataResultType = z.infer<typeof TableMetadataResultSchema>
