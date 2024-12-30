import z from 'zod'

const InputSchema = z.object({
  accessKey: z.string()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, InputSchema.parse)
  
  const config = useConfig()

  const user = config.users?.find(user => user.accessKey === body.accessKey)
  if (!user) {
    return false
  }

  return true
})
