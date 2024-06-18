import { db } from '@/db';
import { userTable, type SelectUser } from '@/db/schema';
import { linkedin, lucia } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('linkedin_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await linkedin.validateAuthorizationCode(code);
    const linkedinUserResponse = await fetch(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const linkedinUser: LinkedInUser =
      (await linkedinUserResponse.json()) as LinkedInUser;

    const existingUser = (await db
      .select()
      .from(userTable)
      .where(eq(userTable.linkedin_id, linkedinUser.sub))
      .get()) as SelectUser;

    if (existingUser) {
      await db
        .update(userTable)
        .set({
          user_name: linkedinUser.name,
          user_email: linkedinUser.email,
          user_pic: linkedinUser.picture,
        })
        .where(eq(userTable.id, existingUser.id))
        .run();

      const session = await lucia.createSession(existingUser.id, {
        email: linkedinUser.email,
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/wall',
        },
      });
    }

    const userId = generateId(15);

    await db
      .insert(userTable)
      .values({
        id: userId,
        linkedin_id: linkedinUser.sub,
        user_name: linkedinUser.name,
        user_email: linkedinUser.email,
        user_pic: linkedinUser.picture,
      })
      .returning();
    const session = await lucia.createSession(userId, {
      email: linkedinUser.email,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface LinkedInUser {
  sub: number;
  name: string;
  email: string;
  picture: string;
}
