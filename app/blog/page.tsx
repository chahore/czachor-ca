import { blogPageConfig } from '@/site.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: blogPageConfig.title,
  description: blogPageConfig.description,
}

export default function Page() {
  return <main>Blog</main>
}
