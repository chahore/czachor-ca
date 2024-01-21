export const runtime = 'edge'

import { createClient } from '@libsql/client/web'

const config = {
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
}
export const db = createClient(config)
