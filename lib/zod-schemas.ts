import * as z from 'zod'

export const saveWallEntrySchema = z.object({
  user_message: z
    .string()
    .min(2, {
      message: 'Wall Entry must be at least 2 characters.',
    })
    .max(80, {
      message: 'Wall Entry cannot be more than 80 characters.',
    }),
})

export const deleteWallEntrySchema = z.object({
  id: z.number(),
})
