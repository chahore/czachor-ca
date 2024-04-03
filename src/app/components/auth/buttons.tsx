'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

import { Icons } from '../global/icons'
import { Button, buttonVariants } from '../ui/button'

const supabase = createClient()

export function SignOut() {
  const router = useRouter()
  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
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
  const supabase = createClient()
  const signInWithLinkedIn = () =>
    supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

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
