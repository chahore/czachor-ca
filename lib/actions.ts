'use server'

import { auth } from 'app/auth'
import { type Session } from 'next-auth'
import { sql } from '@vercel/postgres'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession()
  let user_email = session.user?.email as string
  let user_name = session.user?.name as string
  let user_profile = session.user?.image as string

  if (!session.user) {
    throw new Error('Unauthorized')
  }

  let entry = formData.get('entry')?.toString() || ''
  let body = entry.slice(0, 500)

  await sql`
    INSERT INTO guestbook (user_email, body, user_name, user_profile, created_at)
    VALUES (${user_email}, ${body}, ${user_name}, ${user_profile}, NOW())
  `

  revalidatePath('/guestbook')
}

export async function deleteGuestbookEntry(id: number) {
  let session = await getSession()
  let user_email = session.user?.email as string

  if (!session.user) {
    throw new Error('Unauthorized')
  }

  const isAdmin = user_email === 'david@czachor.dev'

  if (isAdmin) {
    await sql`
      DELETE FROM guestbook
      WHERE id = ${id}
    `
  } else {
    await sql`
      DELETE FROM guestbook
      WHERE id = ${id}
      AND user_email = ${user_email}
    `
  }

  revalidatePath('/guestbook')
}
