import { guestbookPageConfig } from '@/site.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: guestbookPageConfig.title,
  description: guestbookPageConfig.description,
}

export default function Page() {
  return <main>Guestbook</main>
}
