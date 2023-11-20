import { blogPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { allBlogs, Blog } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import ListView, { ListViewProps } from '@/components/pages/list-view'

export const metadata: Metadata = {
  title: blogPageConfig.title,
  description: blogPageConfig.description,
}

function transformBlogsToListViewProps(blogs: Blog[]): ListViewProps {
  return blogs.map((blog) => ({
    title: blog.title,
    description: blog.date.split('T')[0],
    href: blog.url,
  }))
}

export default function Page() {
  const blogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <main>
      <h1 className="mb-4">
        Writing blogs <em>with a passion.</em>
      </h1>

      <ListView listItems={transformBlogsToListViewProps(blogs)} />
    </main>
  )
}
