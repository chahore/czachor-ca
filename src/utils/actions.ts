'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { revalidatePath } from 'next/cache'

import { createClient } from './supabase/server'

const supabase = createClient()

export async function saveWallEntry({
  user_message,
}: {
  user_message: string
}) {
  const { data: session } = await supabase.auth.getUser()
  await supabase.from('wall_entries').insert({
    user_message: user_message,
  })
  if (!user_message || !session.user?.email)
    return { error: 'Something went wrong' }

  revalidatePath('/wall')
}

export async function deleteWallEntry({ id }: { id: number }) {
  await supabase.from('wall_entries').delete().eq('id', id)
  revalidatePath('/wall')
}

export async function fetchWallEntries() {
  noStore()
  const result = await supabase
    .from('wall_entries')
    .select('*, users(*)')
    .order('created_at', { ascending: false })
  console.log(result)
  return result
}
