import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload/config'
import Users from './collections/users'
import { Blogs } from './collections/blogs'
import { Projects } from './collections/projects'
import { Settings } from './globals/settings'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import seo from '@payloadcms/plugin-seo'
import { Pages } from './collections/pages'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  editor: lexicalEditor({}),
  collections: [Pages, Projects, Blogs, Users],
  globals: [Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    seo({
      collections: ['pages', 'blogs'],
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
