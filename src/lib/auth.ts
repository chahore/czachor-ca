import { db } from '@/db';
import { sessionTable, userTable } from '@/db/schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { LinkedIn } from 'arctic';
import { Lucia } from 'lucia';
import type { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';

const adapter: DrizzleSQLiteAdapter = new DrizzleSQLiteAdapter(
  db,
  sessionTable,
  userTable,
);

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
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseSessionAttributes
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

interface DatabaseUserAttributes {
  linkedin_id: number;
}
interface DatabaseSessionAttributes {
  email: string;
}

export const linkedin = new LinkedIn(
  process.env.LINKEDIN_CLIENT_ID!,
  process.env.LINKEDIN_CLIENT_SECRET!,
  process.env.LINKEDIN_REDIRECT_URI!,
);
