import { CollectionConfig } from 'payload/types'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  typescript: {
    interface: 'Blogs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
  ],
}
