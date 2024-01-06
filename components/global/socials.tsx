import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from './icons'
import { siteConfig } from '@/site.config'

export default async function Socials() {
  const iconClassName = 'h-4 w-4'

  const getSocialIcon: { [key: string]: JSX.Element } = {
    linkedin: <Icons.linkedin className={iconClassName} />,
    github: <Icons.github className={iconClassName} />,
    email: <Icons.email className={iconClassName} />,
  }
  return (
    <div>
      {siteConfig.socials.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className={buttonVariants({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          {getSocialIcon[title]}
          <span className="sr-only">{title}</span>
        </Link>
      ))}
    </div>
  )
}
