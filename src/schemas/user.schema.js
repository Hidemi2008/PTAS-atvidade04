import { z } from 'zod'

export const userSchema = z.object({
    nome: z.string().min(1),
    email: z.email(),
    idade: z.number().int().positive().optional(),
})

export const updateUserSchema = userSchema.partial()
