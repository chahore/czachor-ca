import { SessionProvider } from '@/app/components/auth/session-provider'
import SiteFooter from '@/app/components/global/site-footer'
import SiteHeader from '@/app/components/global/site-header'
import '@/app/globals.css'
import { validateRequest } from '@/lib/auth'
import { fontSerif } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/site.config'
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await validateRequest()
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
        <SessionProvider value={session}>
          <Analytics />
          <SpeedInsights />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  )
}
