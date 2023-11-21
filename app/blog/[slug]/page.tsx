import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const generateStaticParams = async () =>
  allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)
  if (!blog) throw new Error(`blog not found for slug: ${params.slug}`)
  return { title: blog.title, description: blog.description }
}

export default function Blog({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)

  if (!blog) notFound()

  const MDXContent = useMDXComponent(blog.body.code)
  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time
          dateTime={blog.date}
          className="mb-1 text-xs text-gray-600"
        >
          {new Date(blog.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>
      <div className="prose dark:prose-invert prose-headings:font-display prose-a:text-cyan-500 prose-img:rounded-2xl mt-8">
        <MDXContent components={{ Image }} />
      </div>
    </article>
  )
}
