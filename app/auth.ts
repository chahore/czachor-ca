import NextAuth from 'next-auth'
import linkedin from 'next-auth/providers/linkedin'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    linkedin({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
})
