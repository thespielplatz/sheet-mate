export default ({
  domain,
  base,
  table,
  id,
}: {
  domain: string
  base: string
  table: string
  id: number
}) => {
  return `${domain}/dashboard/#/nc/${base}/${table}?rowId=${id}`
}
