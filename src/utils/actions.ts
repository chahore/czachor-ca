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
    user_email: session.user?.email,
    user_name: session.user?.user_metadata.name,
    user_pic: session.user?.user_metadata.picture,
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
  return await supabase
    .from('wall_entries')
    .select('*')
    .order('created_at', { ascending: false })
}
