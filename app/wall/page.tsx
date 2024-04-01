import { wallPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { auth } from '../auth'
import { SignIn, SignOut } from '@/components/auth/buttons'
import MessageForm from '@/components/wall/wall-form'
import { EntrySkeleton } from '@/components/skeletons/entry-skeleton'
import { WallEntries } from '@/components/wall/wall-entries'

export const metadata: Metadata = {
  title: wallPageConfig.title,
  description: wallPageConfig.description,
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-4">Write on the wall.</h1>
      <Suspense>
        <WallForm />
      </Suspense>

      <Suspense fallback={<EntrySkeleton />}>
        <WallEntries />
      </Suspense>
    </section>
  )
}

const WallForm = async () => {
  const session = await auth()

  return session?.user ? (
    <>
      {/* <MessageForm /> */}
      <SignOut />
    </>
  ) : (
    <SignIn />
  )
}
