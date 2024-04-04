'use client'

import { useRouter } from 'next/navigation'

import { Icons } from '../global/icons'
import { Button, buttonVariants } from '../ui/button'

export function SignOut() {
  const router = useRouter()
  return (
    <Button
      onClick={() => {}}
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
      onClick={() => {}}
    >
      <Icons.linkedin className="h-4 w-4" />
      <div className="ml-2">Sign in with LinkedIn</div>
    </button>
  )
}
