'use client'

import { useAction } from 'next-safe-action/hooks'
import { buttonVariants } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/app/components/ui/form'
import { Input } from '@/src/app/components/ui/input'
import { Button } from '@/src/app/components/ui/button'
import { useForm } from 'react-hook-form'
import { saveWallEntrySchema } from '@/src/lib/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { deleteWallEntry, saveWallEntry } from '@/src/server/actions'

export default function WallForm() {
  const form = useForm<z.infer<typeof saveWallEntrySchema>>({
    resolver: zodResolver(saveWallEntrySchema),
    defaultValues: {
      user_message: '',
    },
  })

  const { execute, status, result } = useAction(saveWallEntry, {
    onSuccess: () => {
      form.reset()
    },
  })

  function onSubmit(entry: z.infer<typeof saveWallEntrySchema>) {
    execute(entry)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative max-w-[500px]"
      >
        <FormField
          control={form.control}
          name="user_message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your message..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={
            buttonVariants({ variant: 'outline' }) +
            ' absolute right-0 top-0 rounded-l-none'
          }
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
    <Button
      className={buttonVariants({
        variant: 'destructive',
        size: 'sm',
      })}
      onClick={() => deleteWallEntry({ id })}
    >
      Delete
    </Button>
  )
}
