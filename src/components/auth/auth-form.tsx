import { auth } from '@/auth';
import WallForm from '../wall/wall-form';
import { SignIn, SignOut } from './buttons';

export default async function AuthForm() {
  const session = await auth();

  return session?.user ? (
    <>
      <WallForm />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}
