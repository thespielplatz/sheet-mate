import type { z } from 'zod'
import { TableMetadataResultSchema } from '~/server/lib/nocoDB/TableMetadataResultSchema'

export const TableMetadataResultType = TableMetadataResultSchema.parse

export default (tableMeta: z.infer<typeof TableMetadataResultSchema>) => {
  const requiredColumns = [
    { title: 'code', validUidt: ['SingleLineText', 'LongText'] },
    { title: 'name', validUidt: ['SingleLineText', 'LongText'] },
    { title: 'amount', validUidt: ['Number'] },
  ]

  for (const column of requiredColumns) {
    const matchingColumn = tableMeta.columns.find(col => col.title === column.title)
    if (!matchingColumn) {
      return false
    }

    if (!column.validUidt.includes(matchingColumn.uidt)) {
      return false
    }
  }

  return true
}
