'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}

export function SignIn() {
  return <Button onClick={() => signIn('github')}>Sign In</Button>
}
