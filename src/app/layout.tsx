import '@/app/globals.css'
import SiteFooter from '@/src/app/components/global/site-footer'
import SiteHeader from '@/src/app/components/global/site-header'
import { fontSerif } from '@/src/lib/fonts'
import { cn } from '@/src/lib/utils'
import { siteConfig } from '@/src/site.config'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body
        className={cn(
          'container mx-auto bg-background font-sans antialiased sm:max-w-3xl',
          fontSerif.variable,
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Analytics />
        <SpeedInsights />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
