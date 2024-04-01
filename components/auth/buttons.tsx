'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button, buttonVariants } from '../ui/button'
import { Icons } from '../global/icons'

export function SignOut() {
  return (
    <Button
      onClick={() => signOut()}
      className={buttonVariants({
        variant: 'ghost',
        size: 'sm',
      })}
    >
      Sign Out
    </Button>
  )
}

export function SignIn() {
  return (
    <button
      className={buttonVariants({ variant: 'outline' })}
      onClick={() => signIn('linkedin')}
    >
      <Icons.linkedin className="h-4 w-4" />
      <div className="ml-2">Sign in with LinkedIn</div>
    </button>
  )
}
