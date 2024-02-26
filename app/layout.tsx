import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/app/globals.css'
import SiteHeader from '@/components/global/site-header'
import SiteFooter from '@/components/global/site-footer'
import { TailwindIndicator } from '@/components/global/tailwind-indicator'
import { Analytics } from '@vercel/analytics/react'
import { siteConfig } from '@/site.config'
import { fontSerif } from '@/lib/fonts'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    template: '%s | ' + siteConfig.title,
    default: siteConfig.title,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fontSerif.variable}`}
    >
      <body className="container mx-auto min-h-screen bg-background antialiased sm:max-w-3xl">
        <Analytics />
        <SpeedInsights />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
