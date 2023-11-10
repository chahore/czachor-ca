import { getProjects } from '@/payload/queries'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Title from '../global/title'

export default async function Projects() {
  const projects = await getProjects()
  return (
    <>
      <Title title="projects" />
      {projects.map((project) => (
        <div
          key={project.id}
          className="pb-2"
        >
          <Link
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'link',
              size: 'link',
            })}
          >
            <h2 className="font-medium underline underline-offset-4">
              {project.title}
            </h2>
          </Link>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      ))}
    </>
  )
}
