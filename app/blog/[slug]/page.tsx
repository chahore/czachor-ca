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
    <article>
      <h1 className="">{blog.title}</h1>
      <h2 className="mb-4 text-sm text-muted-foreground">
        {blog.date.split('T')[0]}
      </h2>
      <MDXContent components={{ Image }} />
    </article>
  )
}
