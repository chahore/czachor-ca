'use client'

import { deleteWallEntry, saveWallEntry } from '@/server/lib/actions'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { buttonVariants } from '../ui/button'
import { Input } from '../ui/input'

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="relative max-w-[500px]"
      ref={formRef}
      action={async (formData) => {
        await saveWallEntry(formData)
        formRef.current?.reset()
      }}
    >
      <Input
        aria-label="Your message"
        placeholder="Your message..."
        name="entry"
        type="text"
        required
        className="pr-14"
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className={
        buttonVariants({ variant: 'outline' }) +
        ' absolute right-0 top-0 rounded-l-none'
      }
      disabled={pending}
      type="submit"
    >
      Sign
    </button>
  )
}

export function DeleteEntry({ id }: { id: number }) {
  return (
    <button
      className={buttonVariants({
        variant: 'destructive',
        size: 'sm',
      })}
      onClick={() => deleteWallEntry(id)}
    >
      Delete
    </button>
  )
}
