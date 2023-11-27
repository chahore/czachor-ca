'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { sql } from '@vercel/postgres'

export async function getGuestbookEntries() {
  noStore()
  let entries = await sql`
    SELECT body, user_name, user_profile
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `
  return entries.rows
}
