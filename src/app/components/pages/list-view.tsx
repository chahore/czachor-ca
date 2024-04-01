import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from '../global/icons'

export type ListViewProps = {
  title: string
  description: string
  href: string
}[]

export default async function ListView({
  listItems,
  external = false,
}: {
  listItems: ListViewProps
  external?: boolean
}) {
  return (
    <>
      {listItems.map(({ title, description, href }) => (
        <article
          key={title}
          className="mb-1"
        >
          <Link
            href={href}
            target={external ? '_blank' : '_self'}
            prefetch={external ? false : true}
            rel="noreferrer"
            aria-label={`Open ${title}`}
            className={buttonVariants({
              variant: 'link',
              size: 'link',
            })}
          >
            <h2 className="text-foreground underline decoration-muted-foreground underline-offset-4 transition-colors hover:decoration-foreground">
              {title}
            </h2>
          </Link>
          {external && (
            <Icons.arrow
              className="ml-1 inline h-5 w-5 text-muted-foreground"
              aria-hidden={true}
            />
          )}
          <p className="block text-muted-foreground">{description}</p>
        </article>
      ))}
    </>
  )
}
