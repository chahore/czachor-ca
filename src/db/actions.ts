'use server'

import { db } from '@/db'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { userTable, wallEntries } from './schema'

export async function saveWallEntry({
  user_message,
}: {
  user_message: string
}) {}

export async function deleteWallEntry({ id }: { id: number }) {}

// export async function saveWallEntry({
//   user_message,
// }: {
//   user_message: string
// }) {
//   const { data: session } = await supabase.auth.getUser()
//   await supabase.from('wall_entries').insert({
//     user_message: user_message,
//   })
//   if (!user_message || !session.user?.email)
//     return { error: 'Something went wrong' }

//   revalidatePath('/wall')
// }

// export async function deleteWallEntry({ id }: { id: number }) {
//   await supabase.from('wall_entries').delete().eq('id', id)
//   revalidatePath('/wall')
// }

// export async function fetchWallEntries() {
//   noStore()
//   const result = await supabase
//     .from('wall_entries')
//     .select('*, users(*)')
//     .order('created_at', { ascending: false })
//   console.log(result)
//   return result
// }

export async function fetchWallEntries() {
  return await db
    .select({
      id: wallEntries.id,
      user_message: wallEntries.user_message,
      user_name: userTable.user_name,
      user_pic: userTable.user_pic,
    })
    .from(wallEntries)
    .leftJoin(userTable, eq(wallEntries.user_id, userTable.id))
}
