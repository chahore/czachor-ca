import { db } from '@/db'
import { linkedin, lucia } from '@/lib/auth'
import type { DatabaseUser } from '@/lib/db'
import { OAuth2RequestError } from 'arctic'
import { generateId } from 'lucia'
import { cookies } from 'next/headers'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('linkedin_oauth_state')?.value ?? null
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await linkedin.validateAuthorizationCode(code)
    const linkedinUserResponse = await fetch('https://api.linkedin.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const linkedinUser: LinkedInUser = await linkedinUserResponse.json()
    const existingUser = db
      .prepare('SELECT * FROM user WHERE linkedin_id = ?')
      .get(linkedinUser.id) as DatabaseUser | undefined

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      })
    }

    const userId = generateId(15)
    db.prepare(
      'INSERT INTO user (id, linkedin_id, username) VALUES (?, ?, ?)'
    ).run(userId, linkedinUser.id, linkedinUser.login)
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}

interface LinkedInUser {
  id: string
  login: string
}
