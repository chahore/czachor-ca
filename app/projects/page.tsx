import ListView from '@/components/pages/list-view'
import { projects } from '@/site.config'

export default function Page() {
  return (
    <main>
      <h1 className="track-tighter mb-4 font-sans text-lg">
        Building projects <em className="font-serif italic">with a passion.</em>
      </h1>

      <ListView listItems={projects} />
    </main>
  )
}
