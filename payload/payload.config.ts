import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import { Blogs } from './collections/blogs'
import { Projects } from './collections/projects'
import seo from '@payloadcms/plugin-seo'
import { Settings } from './globals/settings'

export default buildConfig({
  collections: [Blogs, Projects],
  globals: [Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    seo({
      collections: ['blogs', 'projects'],
    }),
  ],
})
