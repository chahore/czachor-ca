import { guestbookPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { auth } from 'app/auth'
import { SignIn, SignOut } from '@/components/auth/buttons'
import Image from 'next/image'

export const metadata: Metadata = {
  title: guestbookPageConfig.title,
  description: guestbookPageConfig.description,
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        sign my guestbook
      </h1>
      <Suspense>
        <GuestbookForm />
      </Suspense>
    </section>
  )
}

async function GuestbookForm() {
  let session = await auth()

  return session?.user ? (
    <>
      <SignOut />
      <Image
        src={session.user.image!}
        alt="test"
        width={100}
        height={100}
      />
    </>
  ) : (
    <SignIn />
  )
}
