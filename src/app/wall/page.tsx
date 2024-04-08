import { SignIn, SignOut } from '@/components/auth/buttons'
import { EntrySkeleton } from '@/components/skeletons/entry-skeleton'
import { WallEntries } from '@/components/wall/wall-entries'
import MessageForm from '@/components/wall/wall-form'
import { validateRequest } from '@/lib/auth'
import { wallPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: wallPageConfig.title,
  description: wallPageConfig.description,
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-4">Write on the wall.</h1>
      <WallForm />
      <Suspense fallback={<EntrySkeleton />}>
        <WallEntries />
      </Suspense>
    </section>
  )
}

const WallForm = async () => {
  const { user } = await validateRequest()

  return user ? (
    <>
      <MessageForm />
      <SignOut />
    </>
  ) : (
    <SignIn />
  )
}
