import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core'

export const wallEntries = pgTable('wall_entires', {
  id: serial('id').primaryKey().notNull(),
  user_name: text('user_name').notNull(),
  user_email: text('user_email').notNull(),
  user_pic: text('user_pic').notNull(),
  user_message: text('user_message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})
