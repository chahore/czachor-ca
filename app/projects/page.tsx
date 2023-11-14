import ListView from '@/components/pages/list-view'
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

      <ListView listItems={projects} />
    </main>
  )
}
