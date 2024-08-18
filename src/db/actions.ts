'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { desc } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { wallEntries } from './schema';

export async function saveWallEntry(formData: FormData) {
  const session = await auth();
  const user_message = formData.get('entry') as string;

  if (!session?.user) {
    return { error: session ? 'No user' : 'Unauthorized' };
  }

  await db.insert(wallEntries).values({
    user_message,
    user_email: session.user.email,
    user_name: session.user.name,
    user_pic: session.user.image,
  });

  revalidateTag('wall-entries');
}

export async function getWallEntries() {
  return await db.select().from(wallEntries).orderBy(desc(wallEntries.id));
}
