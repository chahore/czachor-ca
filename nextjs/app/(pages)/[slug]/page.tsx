import { fetchPage, fetchPages } from '@/app/_api/fetchCollections'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

interface PageParams {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug = 'home' } = params
  const page = await fetchPage(slug, false)
  return {
    title: page?.meta?.title,
    description: page?.meta?.description,
  }
}

export default async function Page({ params: { slug = 'home' } }: PageParams) {
  const { isEnabled: isDraftMode } = draftMode()

  const page = await fetchPage(slug, isDraftMode)

  if (page === null) {
    return notFound()
  }

  return <main>{page?.title}</main>
}

export async function generateStaticParams() {
  const pages = await fetchPages()

  return pages.map(({ slug }) =>
    slug !== 'home'
      ? {
          slug,
        }
      : {}
  )
}
