import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Guestbook',
    description: 'David Czachor description',
  }
}

export default function Page() {
  return <div>Guestbook</div>
}
