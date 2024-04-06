import { linkedin } from '@/lib/auth'
import { generateState } from 'arctic'
import { cookies } from 'next/headers'

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = await linkedin.createAuthorizationURL(state, {
    scopes: ['profile', 'email'],
  })

  cookies().set('linkedin_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return Response.redirect(url)
}
