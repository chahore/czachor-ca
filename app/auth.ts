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
      client: { token_endpoint_auth_method: 'client_secret_post' },
      authorization: {
        url: 'https://www.linkedin.com/oauth/v2/authorization',
        params: { scope: 'openid profile email' },
      },
      wellKnown:
        'https://www.linkedin.com/oauth/.well-known/openid-configuration',
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
})
