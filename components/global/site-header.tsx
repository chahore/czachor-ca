import { getSettings } from '@/payload/queries'
import MainNav from './nav'
import Socials from './socials'

export default async function SiteHeader() {
  const settings = await getSettings()
  return (
    <header className="flex h-28 items-center bg-transparent">
      <MainNav settings={settings} />
      <div className="flex flex-1 items-center justify-end space-x-1">
        <Socials />
      </div>
    </header>
  )
}
