import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const wallEntries = sqliteTable('wall_entires', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  user_name: text('user_name'),
  user_email: text('user_email'),
  user_pic: text('user_picture'),
  user_message: text('user_message').notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => userTable.id),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  linkedin_id: integer('linkedin').unique(),
  username: text('username'),
})

export const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at').notNull(),
})
