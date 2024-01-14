'use server'

import { db } from '@/db'
import { auth } from 'app/auth'
import { type Session } from 'next-auth'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function saveGuestbookEntry(formData: string) {
  let session = await getSession()
  let user_name = session.user?.name as string
  let user_email = session.user?.email as string
  let user_pic = session.user?.image as string

  if (!session.user) {
    throw new Error('Unauthorized')
  }

  let entry = formData
  let user_message = entry.slice(0, 80)

  const query = `
  INSERT INTO guestbook (user_name, user_email, user_pic, user_message, created_at)
  VALUES ('${user_name}', '${user_email}', '${user_pic}', '${user_message}', datetime('now'))
`

  await db.execute(query)

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
    const entry = `
    DELETE FROM guestbook
    WHERE id = ${id}
  `
    await db.execute(entry)
  } else {
    const entry = `
    DELETE FROM guestbook
    WHERE id = ${id}
    AND user_email = ${user_email}
  `
    await db.execute(entry)
  }

  revalidatePath('/guestbook')
}
