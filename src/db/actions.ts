'use server'

import { db } from '@/db'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache'

import { userTable, wallEntries } from './schema'

export async function saveWallEntry({
  user_message,
}: {
  user_message: string
}) {}

export async function deleteWallEntry({ id }: { id: number }) {}

export async function fetchWallEntries() {
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
}
