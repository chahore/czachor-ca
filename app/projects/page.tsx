import Projects from '@/components/home/projects'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects',
    description: 'David Czachor description',
  }
}

export default function Page() {
  return <Projects />
}
