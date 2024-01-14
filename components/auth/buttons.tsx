'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button, buttonVariants } from '../ui/button'

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
  return <Button onClick={() => signIn('github')}>Sign In</Button>
}
