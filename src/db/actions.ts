'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { desc } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { wallEntries } from './schema';

export async function saveWallEntry({
  user_message,
}: {
  user_message: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: session ? 'No user id' : 'Unauthorized' };
  }

  await db.insert(wallEntries).values({
    user_message,
    user_id: session.user.id,
    user_name: session.user.name,
    user_pic: session.user.image,
  });

  revalidateTag('wall-entries');
}

export async function getWallEntries() {
  return await db.select().from(wallEntries).orderBy(desc(wallEntries.id));
}
