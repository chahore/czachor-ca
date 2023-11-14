import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from '../global/icons'

type ListViewProps = {
  title: string
  description: string
  href: string
}[]

export default async function ListView({
  listItems,
}: {
  listItems: ListViewProps
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
            target="_blank"
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
          <Icons.arrow
            className="ml-1 inline h-5 w-5 text-muted-foreground"
            aria-hidden={true}
          />
          <p className="block text-muted-foreground">{description}</p>
        </article>
      ))}
    </>
  )
}
