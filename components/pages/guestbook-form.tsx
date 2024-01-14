'use client'

import { deleteGuestbookEntry, saveGuestbookEntry } from '@/lib/actions'
import { useFormStatus } from 'react-dom'
import { buttonVariants } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const formSchema = z.object({
  entry: z
    .string()
    .min(2, {
      message: 'Message must be at least 2 characters.',
    })
    .max(80, {
      message: 'Message must be less than 80 characters.',
    }),
})

export default function MessageForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    saveGuestbookEntry(data.entry)
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full space-x-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your message..."
                  aria-label="Your message"
                  className="w-[500px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={buttonVariants({
            variant: 'secondary',
          })}
          type="submit"
        >
          Sign
        </Button>
      </form>
    </Form>
  )
}

export function DeleteEntry({ id }: { id: number }) {
  return (
    <button
      className={buttonVariants({
        variant: 'destructive',
        size: 'sm',
      })}
      onClick={() => deleteGuestbookEntry(id)}
    >
      Delete
    </button>
  )
}
