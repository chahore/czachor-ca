import NextAuth from 'next-auth'
import linkedin from 'next-auth/providers/linkedin'
import { type LinkedInProfile } from 'next-auth/providers/linkedin'

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
      token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
      },
      wellKnown:
        'https://www.linkedin.com/oauth/.well-known/openid-configuration',
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      async profile(profile: LinkedInProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    }),
  ],
})
