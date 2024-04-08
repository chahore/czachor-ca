import { siteConfig } from '@/site.config'

import Socials from './socials'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="my-8 flex items-center justify-between">
      <text className="text-sm text-muted-foreground/75">
        {year} © {siteConfig.title}
      </text>
      <Socials />
    </footer>
  )
}
