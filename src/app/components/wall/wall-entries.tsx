import { fetchWallEntries } from '@/db/actions'
import { validateRequest } from '@/lib/auth'
import Image from 'next/image'

import { DeleteEntry } from './wall-form'

export async function WallEntries() {
  const entries = await fetchWallEntries()
  const data = await validateRequest()

  if (entries === null) {
    return null
  }
  console.log(data)

  // const isUserAuthorizedToDelete = (entry: (typeof entries)[0]) => {
  //   return (
  //     session?.user?.email === entry. ||
  //     session?.user?.email === 'david@czachor.ca'
  //   )
  // }
  return (
    <div className="pt-5">
      {entries?.map((entry) => (
        <article
          key={entry.id}
          className="mb-2 space-x-1.5 text-sm "
        >
          {/* {isUserAuthorizedToDelete(entry) && <DeleteEntry id={entry.id} />} */}

          <span className="min-w-fit pr-1.5 text-muted-foreground">
            <Image
              src={entry.user_pic!}
              alt={`Profile picture of ${entry.user_name}`}
              width={16}
              height={16}
              className="mr-1.5 inline h-4 w-4 rounded-full"
            />
            {entry.user_name}:
          </span>
          {entry.user_message}
        </article>
      ))}
    </div>
  )
}
