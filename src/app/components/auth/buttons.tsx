import { lucia, validateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { Icons } from '../global/icons'
import { Button, buttonVariants } from '../ui/button'

export function SignOut() {
  return (
    <form action={logout}>
      <Button
        variant="ghost"
        size="sm"
      >
        Sign Out
      </Button>
    </form>
  )
}

async function logout() {
  'use server'
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  revalidatePath('/wall')
}

export function SignIn() {
  return (
    <a
      className={buttonVariants({ variant: 'outline' })}
      href="/auth"
    >
      <Icons.linkedin className="h-4 w-4" />
      <span className="ml-2">Sign in with LinkedIn</span>
    </a>
  )
}
