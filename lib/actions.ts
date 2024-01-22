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

export async function saveWallEntry(formData: FormData) {
  try {
    let session = await getSession()
    let user_name = session.user?.name as string
    let user_email = session.user?.email as string
    let user_pic = session.user?.image as string

    if (!session.user) {
      throw new Error('Unauthorized')
    }

    let entry = formData.get('entry')?.toString() || ''
    let user_message = entry.slice(0, 80)

    const query = {
      sql: `
        INSERT INTO wall (user_name, user_email, user_pic, user_message, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
      `,
      args: [user_name, user_email, user_pic, user_message],
    }

    await db.execute(query)
    revalidatePath('/wall')
  } catch (error) {
    throw error
  }
}

export async function deleteWallEntry(id: number) {
  let session = await getSession()
  let user_email = session.user?.email as string

  if (!session.user) {
    throw new Error('Unauthorized')
  }

  const isAdmin = user_email === 'david@czachor.dev'

  try {
    let query
    if (isAdmin) {
      query = {
        sql: 'DELETE FROM wall WHERE id = ?',
        args: [id],
      }
    } else {
      query = {
        sql: 'DELETE FROM wall WHERE id = ? AND user_email = ?',
        args: [id, user_email],
      }
    }

    await db.execute(query)
    revalidatePath('/wall')
  } catch (error) {
    throw error
  }
}
