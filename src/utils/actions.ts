'use server'

import { saveWallEntrySchema } from '@/lib/zod-schemas'
import { revalidatePath } from 'next/cache'

import { createClient } from './supabase/server'
import { type Database } from '@/types/supabase'

const supabase<Database> = createClient()

export async function saveWallEntry(formData: FormData) {
  const { user_message } = saveWallEntrySchema.parse(formData)
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

export async function deleteWallEntry(id: number) {
  await supabase.from('wall_entries').delete().eq('id', id)
  revalidatePath('/wall')
}

export async function fetchWallEntries() {
  const { data: entries, error } = await supabase.from('wall_entries').select()
  if (error) return { error }
  return { success: entries }
}
