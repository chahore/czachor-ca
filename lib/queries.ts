'use server'

import { unstable_noStore as noStore } from 'next/cache'

export async function getGuestbookEntries() {
  noStore()
  let entries = await sql`
    SELECT body, user_name, user_profile, id, user_email
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `
  return entries.rows
}
