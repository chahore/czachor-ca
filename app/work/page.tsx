import { Icons } from '@/components/global/icons'
import ListView from '@/components/pages/list-view'
import Badge from '@/components/ui/badge'
import { projectPageConfig, projects } from '@/site.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectPageConfig.title,
  description: projectPageConfig.description,
}

export default function Page() {
  return (
    <main>
      <h1 className="mb-4">
        Building projects <em>with a passion.</em>
      </h1>
      <Badge href={'https://nextjs.org'}>
        <Icons.nextjs
          className="mr-1 inline h-4 w-4"
          aria-hidden={true}
        />
        Next.js
      </Badge>

      <ListView
        listItems={projects}
        external={true}
      />
    </main>
  )
}
