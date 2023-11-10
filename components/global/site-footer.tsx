import Socials from './socials'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex h-16 items-center justify-start">
      <text className="text-foreground/60">{year} © All rights reserved.</text>
    </footer>
  )
}
