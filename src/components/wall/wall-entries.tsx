import { getWallEntries } from '@/db/actions';
import Image from 'next/image';

export async function WallEntries() {
  const entries = await getWallEntries();

  return (
    <div className="pt-5">
      {entries?.map((entry) => {
        return (
          <article key={entry.id} className="mb-2 space-x-1.5 text-sm ">
            <span className="min-w-fit pr-1.5 text-muted-foreground">
              {entry.user_pic ? (
                <Image
                  src={entry.user_pic}
                  alt={`Profile picture of ${entry.user_name}`}
                  width={16}
                  height={16}
                  className="mr-1.5 inline h-4 w-4 rounded-full"
                />
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
