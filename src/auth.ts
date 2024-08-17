import NextAuth from 'next-auth';
import LinkedIn from 'next-auth/providers/linkedin';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn],
});
