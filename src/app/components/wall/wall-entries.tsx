'use client'

import { getWallEntries } from '@/db/actions'
import { WallEntry } from '@/lib/types'
import Image from 'next/image'
import useSWR from 'swr'

import { useSession } from '../auth/session-provider'
import { EntrySkeleton } from '../skeletons/entry-skeleton'
import { DeleteEntry } from './wall-form'

export function WallEntries() {
  const { session } = useSession()
  const isUserAuthorizedToDelete = (entry: WallEntry) => {
    return (
      session?.email === entry.user_email ||
      session?.email === 'david@czachor.ca'
    )
  }

  const { data: entries, isLoading } = useSWR('wall-entries', getWallEntries)

  if (isLoading) {
    return <EntrySkeleton />
  }
  return (
    <div className="pt-5">
      {entries?.map((entry) => {
        const isAuthorized = isUserAuthorizedToDelete(entry)
        return (
          <article
            key={entry.id}
            className="mb-2 space-x-1.5 text-sm "
          >
            {isAuthorized && <DeleteEntry id={entry.id} />}
            <span className="min-w-fit pr-1.5 text-muted-foreground">
              {entry.user_pic ? (
                <Image
                  src={entry.user_pic}
                  alt={`Profile picture of ${entry.user_name}`}
                  width={16}
                  height={16}
                  className="mr-1.5 inline h-4 w-4 rounded-full"
                />
              ) : null}
              {entry.user_name}:
            </span>
            {entry.user_message}
          </article>
        )
      })}
    </div>
  )
}
