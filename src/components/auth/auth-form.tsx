import { validateRequest } from '@/lib/auth';
import WallForm from '../wall/wall-form';
import { SignIn, SignOut } from './buttons';

export default async function AuthForm() {
  const { user } = await validateRequest();

  return user ? (
    <>
      <WallForm />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}
