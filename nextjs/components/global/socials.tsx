import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from './icons'
import { getSettings } from '@/app/_api/fetchGlobals'

export default async function Socials() {
  const settings = await getSettings()
  return (
    <>
      {settings.linkedIn ? (
        <Link
          href={settings.linkedIn}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Icons.linkedIn className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </div>
        </Link>
      ) : null}
      {settings.github ? (
        <Link
          href={settings.github}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
      ) : null}
    </>
  )
}
