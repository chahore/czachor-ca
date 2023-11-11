import Nav from './nav'
import Socials from './socials'
import { getSettings } from '@/app/_api/fetchGlobals'

export default async function SiteHeader() {
  const settings = await getSettings()
  return (
    <header className="flex h-28 items-center bg-transparent pt-6">
      <Nav settings={settings} />
      <div className="flex flex-1 items-center justify-end space-x-1">
        <Socials />
      </div>
    </header>
  )
}
