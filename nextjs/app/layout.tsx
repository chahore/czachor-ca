import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import '@/app/globals.css'
import SiteHeader from '@/components/global/site-header'
import SiteFooter from '@/components/global/site-footer'
import { TailwindIndicator } from '@/components/global/tailwind-indicator'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `%s | David Czachor`,
      default: 'David Czachor',
    },
    description: 'David Czachor description',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="mx-auto min-h-screen max-w-2xl bg-background antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <TailwindIndicator />
      </body>
    </html>
  )
}
