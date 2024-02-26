'use server'

import { db } from '@/server/db'
import { auth } from '../app/auth'
import { type Session } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'
import {
  deleteWallEntrySchema,
  saveWallEntrySchema,
  wallEntrySchema,
} from '@/lib/zod-schemas'
import { revalidatePath } from 'next/cache'
import { wallEntries } from './db/schema'
import { eq } from 'drizzle-orm'

async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export const action = createSafeActionClient()

export const createWallEntry = action(
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

export const fetchWallEntries = action(wallEntrySchema, async () => {
  const entries = await db.query.wallEntries.findMany()
  revalidatePath('/wall')
  return { success: entries }
})
