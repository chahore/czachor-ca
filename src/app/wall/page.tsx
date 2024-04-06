import { SignIn, SignOut } from '@/app/components/auth/buttons'
import { EntrySkeleton } from '@/app/components/skeletons/entry-skeleton'
import { WallEntries } from '@/app/components/wall/wall-entries'
import MessageForm from '@/app/components/wall/wall-form'
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
