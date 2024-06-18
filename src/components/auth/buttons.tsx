import { logout } from '@/db/actions';
import { Icons } from '../global/icons';
import { Button, buttonVariants } from '../ui/button';

export function SignOut() {
  return (
    <form action={logout}>
      <Button variant="ghost" size="sm">
        Sign Out
      </Button>
    </form>
  );
}

export function SignIn() {
  return (
    <a className={buttonVariants({ variant: 'outline' })} href="/auth">
      <Icons.linkedin className="h-4 w-4" />
      <span className="ml-2">Sign in with LinkedIn</span>
    </a>
  );
}
