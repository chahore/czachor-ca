import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core'

export const wallEntries = pgTable('wall_entires', {
  id: serial('id').primaryKey(),
  user_name: text('user_name'),
  user_email: text('user_email'),
  user_pic: text('user_pic'),
  user_message: text('user_message').notNull(),
  created_at: timestamp('created_at').defaultNow(),
})
