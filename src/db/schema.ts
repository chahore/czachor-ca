import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const wallEntries = sqliteTable('wall_entires', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  user_name: text('user_name'),
  user_pic: text('user_pic'),
  user_email: text('user_email'),
  user_message: text('user_message').notNull(),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
