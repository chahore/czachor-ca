'use server'

import { db } from '@/db'
import { validateRequest } from '@/lib/auth'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache'

import { userTable, wallEntries } from './schema'

export async function saveWallEntry({
  user_message,
}: {
  user_message: string
}) {
  try {
    const { session } = await validateRequest()

    if (!session) {
      throw new Error('Unauthorized')
    }

    await db.insert(wallEntries).values({
      user_message,
      user_id: session.userId,
    })

    revalidatePath('/wall')
  } catch (error) {
    throw new Error('Failed to save wall entry. Please try again later.')
  }
}

export async function getWallEntries() {
  try {
    noStore()
    return await db
      .select({
        id: wallEntries.id,
        user_message: wallEntries.user_message,
        user_name: userTable.user_name,
        user_pic: userTable.user_pic,
      })
      .from(wallEntries)
      .leftJoin(userTable, eq(wallEntries.user_id, userTable.id))
      .orderBy(desc(wallEntries.id))
  } catch (error) {
    throw new Error('Failed to fetch wall entries. Please try again later.')
  }
}
