import { Page, Project } from '@/payload-types'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const getProjects = async (): Promise<Project[]> => {
  const res: {
    docs: Project[]
  } = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/projects`, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
    next: { tags: ['projects'] },
  }).then((res) => res.json())

  return res?.docs ?? []
}

export const fetchPages = async (): Promise<Page[]> => {
  const res: {
    docs: Page[]
  } = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/pages?depth=0&limit=100`,
    {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
      next: { tags: ['pages'] },
    }
  ).then((res) => res.json())

  return res?.docs ?? []
}

export const fetchPage = async (
  slug: string,
  draft?: boolean
): Promise<Page | undefined | null> => {
  let payloadToken: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    payloadToken = cookies().get('payload-token')
  }

  const res: {
    docs: Page[]
  } = await fetch(
    `${
      process.env.PAYLOAD_PUBLIC_SERVER_URL
    }/api/pages?where[slug][equals]=${slug}${
      draft && payloadToken ? '&draft=true' : ''
    }`,
    {
      method: 'GET',
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
      next: { tags: [`pages_${slug}`] },
      ...(draft && payloadToken
        ? {
            headers: {
              Authorization: `JWT ${payloadToken?.value}`,
            },
          }
        : {}),
    }
  ).then((res) => res.json())

  return res?.docs?.[0] ?? null
}
