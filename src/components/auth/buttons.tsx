import { signIn, signOut } from '@/auth';
import { Icons } from '../global/icons';
import { Button } from '../ui/button';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button variant="ghost" size="sm" type="submit">
        Sign Out
      </Button>
    </form>
  );
}

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('linkedin');
      }}
    >
      <Button variant={'outline'} type="submit">
        <Icons.linkedin className="mr-2 h-4 w-4" />
        Sign in with LinkedIn
      </Button>
    </form>
  );
}
