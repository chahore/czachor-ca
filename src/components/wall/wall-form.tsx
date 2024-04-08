'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { saveWallEntry } from '@/db/actions'
import { saveWallEntrySchema } from '@/lib/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Input as Infer } from 'valibot'

import { buttonVariants } from '../ui/button'

export default function WallForm() {
  const form = useForm<Infer<typeof saveWallEntrySchema>>({
    resolver: valibotResolver(saveWallEntrySchema),
    defaultValues: {
      user_message: '',
    },
  })

  function onSubmit(entry: Infer<typeof saveWallEntrySchema>) {
    saveWallEntry(entry).then(() => form.reset())
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
