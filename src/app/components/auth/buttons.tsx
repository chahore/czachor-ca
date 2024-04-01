'use client'

import { createClient } from '@/utils/supabase/client'

import { Icons } from '../global/icons'
import { Button, buttonVariants } from '../ui/button'

const supabase = createClient()

async function signInWithLinkedIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
  })
}

async function signOut() {
  await supabase.auth.signOut()
}

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
      onClick={() => signInWithLinkedIn()}
    >
      <Icons.linkedin className="h-4 w-4" />
      <div className="ml-2">Sign in with LinkedIn</div>
    </button>
  )
}
