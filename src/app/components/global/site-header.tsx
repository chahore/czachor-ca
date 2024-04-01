import Nav from './nav'
import Socials from './socials'

export default async function SiteHeader() {
  return (
    <header className="flex h-28 items-center bg-transparent pt-6">
      <Nav />
    </header>
  )
}
