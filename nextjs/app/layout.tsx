import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import '@/app/globals.css'
import SiteHeader from '@/components/global/site-header'
import SiteFooter from '@/components/global/site-footer'
import { TailwindIndicator } from '@/components/global/tailwind-indicator'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: `%s | David Czachor`,
    default: 'David Czachor',
  },
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
      <body className="container mx-auto min-h-screen bg-background antialiased sm:max-w-3xl">
        <Analytics />
        <SiteHeader />
        {children}
        <SiteFooter />
        <TailwindIndicator />
      </body>
    </html>
  )
}
