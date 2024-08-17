'use server';

import { db } from '@/db';
import { lucia, validateRequest } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { userTable, wallEntries } from './schema';

export async function saveWallEntry({
  user_message,
}: {
  user_message: string;
}) {
    const { session } = await validateRequest();

    if (!session) {
      return { error: 'Unauthorized' };
    }

    await db.insert(wallEntries).values({
      user_message,
      user_id: session.userId,
    });

    revalidateTag('wall-entries');
}

export async function getWallEntries() {
    return await db
      .select({
        id: wallEntries.id,
        user_message: wallEntries.user_message,
        user_name: userTable.user_name,
        user_pic: userTable.user_pic,
      })
      .from(wallEntries)
      .leftJoin(userTable, eq(wallEntries.user_id, userTable.id))
      .orderBy(desc(wallEntries.id))
}

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  revalidatePath('/wall');
}
