import NextAuth from 'next-auth';
import LinkedIn from 'next-auth/providers/linkedin';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
