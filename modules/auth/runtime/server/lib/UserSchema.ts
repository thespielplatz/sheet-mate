import z from 'zod'

export const UserSchema = z.object({
  id: z.string().length(21),
  accessKey: z.string(),
})

export type UserType = z.infer<typeof UserSchema>
