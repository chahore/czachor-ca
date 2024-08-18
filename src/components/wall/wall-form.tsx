'use client';

import { Button } from '@/components/ui/button';
import { saveWallEntry } from '@/db/actions';
import { useFormStatus } from 'react-dom';
import { buttonVariants } from '../ui/button';
import { Input } from '../ui/input';

export default function WallForm() {
  const { pending } = useFormStatus();
  return (
    <form action={saveWallEntry} className="relative max-w-[500px]">
      <Input
        type="text"
        name="entry"
        autoFocus
        maxLength={60}
        required
        placeholder="Your message..."
      />

      <Button
        className={
          buttonVariants({ variant: 'outline' }) +
          ' absolute right-0 top-0 rounded-l-none'
        }
        disabled={pending}
        type="submit"
      >
        Sign
      </Button>
    </form>
  );
}
