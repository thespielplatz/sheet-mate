import { z } from 'zod'

const PageInfoSchema = z.object({
  totalRows: z.number(),
  page: z.number(),
  pageSize: z.number(),
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
})

export const RecordsResultSchema = z.object({
  list: z.array(z.object({
    Id: z.number(),
    CreatedAt: z.string(),
    UpdatedAt: z.string().nullable(),
    }).passthrough(),
  ),
  pageInfo: PageInfoSchema,
})

export type RecordsResultType = z.infer<typeof RecordsResultSchema>
