import { db } from '@/db'
import { sessionTable, userTable } from '@/db/schema'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { LinkedIn } from 'arctic'
import { Lucia } from 'lucia'

const adapter: DrizzleSQLiteAdapter = new DrizzleSQLiteAdapter(
  db,
  sessionTable,
  userTable
)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      linkedinId: attributes.linkedin_id,
      username: attributes.username,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  linkedin_id: number
  username: string
}

export const linkedin = new LinkedIn(
  process.env.LINKEDIN_CLIENT_ID!,
  process.env.LINKEDIN_CLIENT_SECRET!,
  process.env.LINKEDIN_REDIRECT_URI!
)
