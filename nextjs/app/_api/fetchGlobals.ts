import { Settings } from '@/payload-types'

export const getSettings = async (): Promise<Settings> =>
  await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/settings`, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
    next: { tags: ['settings'] },
  }).then((res) => res.json())
