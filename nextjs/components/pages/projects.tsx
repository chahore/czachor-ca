import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Title from '../global/title'
import { getProjects } from '../../app/_api/fetchCollections'

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
            {project.title}
          </Link>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      ))}
    </>
  )
}
