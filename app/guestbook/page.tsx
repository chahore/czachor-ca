import { guestbookPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { auth } from 'app/auth'
import { SignIn, SignOut } from '@/components/auth/buttons'
import Image from 'next/image'
import { getGuestbookEntries } from '@/lib/queries'
import Form, { DeleteEntry } from '@/components/pages/guestbook-form'
import { deleteGuestbookEntry } from '@/lib/actions'

export const metadata: Metadata = {
  title: guestbookPageConfig.title,
  description: guestbookPageConfig.description,
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-4">Guestbook.</h1>
      <Suspense>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  )
}

async function GuestbookForm() {
  let session = await auth()

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  )
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries()
  let session = await auth()

  if (entries.length === 0) {
    return null
  }

  const isUserAuthorizedToDelete = (entry) => {
    console.log(session?.user?.email)
    console.log(entry.user_email)
    return session?.user?.email === 'david@czachor.dev'
  }

  return entries.map((entry) => (
    <article
      key={entry.id}
      className="mb-2 flex items-center break-words text-sm"
    >
      {isUserAuthorizedToDelete(entry) && <DeleteEntry id={entry.id} />}
      <Image
        src={entry.user_profile}
        alt={`Profile picture of ${entry.user_name}`}
        width={10}
        height={10}
        className="h-5 w-5 rounded-full"
      />
      <h2 className="mx-2 min-w-fit text-muted-foreground">
        {entry.user_name}:
      </h2>
      <p>{entry.body}</p>
    </article>
  ))
}
