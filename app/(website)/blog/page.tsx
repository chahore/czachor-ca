import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog',
    description: 'David Czachor description',
  }
}

export default function Page() {
  return <div>Blog</div>
}
