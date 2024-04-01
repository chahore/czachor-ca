'use server'

import { deleteWallEntrySchema, saveWallEntrySchema } from '@/lib/zod-schemas'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'

import { auth } from '../app/auth'
import { wallEntries } from './db/schema'

const action = createSafeActionClient()

export const saveWallEntry = action(
  saveWallEntrySchema,
  async ({ user_message }) => {
    const session = await auth()
    if (!user_message || !session?.user?.name)
      return { error: 'Something went wrong' }
    const newWallEntry = await db
      .insert(wallEntries)
      .values({
        user_message: user_message,
        user_name: session.user.name,
        user_email: session.user.email,
        user_pic: session.user.image,
      })
      .returning()
    revalidatePath('/wall')
    if (!newWallEntry) return { error: 'Could not create wall entry.' }
    if (newWallEntry[0].id) return { success: 'Wall entry created.' }
  }
)

export const deleteWallEntry = action(deleteWallEntrySchema, async ({ id }) => {
  try {
    await db.delete(wallEntries).where(eq(wallEntries.id, id))
    revalidatePath('/wall')
    return { success: 'Wall entry deleted.' }
  } catch (error) {
    return { error: 'Something went wrong.' }
  }
})

export const fetchWallEntries = async () => {
  const entries = await db.query.wallEntries.findMany({
    orderBy: (wallEntries, { desc }) => [desc(wallEntries.created_at)],
  })
  revalidatePath('/wall')
  return { success: entries }
}
