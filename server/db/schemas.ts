import { serial, text, pgTable, pgSchema } from 'drizzle-orm/pg-core'

export const wallEntries = pgSchema('wall_entries')
export const mySchemaUsers = wallEntries.table('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})
