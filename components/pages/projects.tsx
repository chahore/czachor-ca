import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { projects } from '@/site.config'

export default async function Projects() {
  return (
    <>
      <ul className="pb-2">
        {projects.map(({ title, description, href }) => (
          <li key={title}>
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Sends you to ${title} github repo`}
              className={buttonVariants({
                variant: 'link',
                size: 'link',
              })}
            >
              {title}
            </Link>
            <p className="text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
