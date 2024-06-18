/* eslint-disable @next/next/no-img-element */
import { getWallEntries } from '@/db/actions';
import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

const getCachedWallEntries = unstable_cache(
  async () => getWallEntries(),
  ['wall-entries'],
  {
    tags: ['wall-entries'],
  },
);

export async function WallEntries() {
  const entries = await getCachedWallEntries();

  return (
    <div className="pt-5">
      {entries?.map((entry) => {
        return (
          <article key={entry.id} className="mb-2 space-x-1.5 text-sm">
            <span className="min-w-fit pr-1.5 text-muted-foreground">
              {entry.user_pic ? (
                <Suspense
                  fallback={<Skeleton className="h-4 w-4 rounded-full" />}
                >
                  <img
                    src={entry.user_pic}
                    alt={`Profile picture of ${entry.user_name}`}
                    width={15}
                    height={15}
                    className="mb-0.5 mr-1.5 inline h-4 w-4 rounded-full"
                  />
                </Suspense>
              ) : null}
              {entry.user_name}:
            </span>
            {entry.user_message}
          </article>
        );
      })}
    </div>
  );
}
