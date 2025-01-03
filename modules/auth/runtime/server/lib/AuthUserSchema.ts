import z from 'zod'

export const AuthUserSchema = z.object({
  id: z.string(),
})

export type AuthUserType = z.infer<typeof AuthUserSchema>
