import { siteConfig } from '@/site.config'
import Socials from './socials'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex items-center justify-between py-5">
      <text className="text-sm text-foreground/50">
        {year} © {siteConfig.title}
      </text>
      <Socials />
    </footer>
  )
}
