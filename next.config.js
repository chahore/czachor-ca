const { withPayload } = require('@payloadcms/next-payload')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = withPayload(
  {
    // transpilePackages: ["@payloadcms/plugin-seo"],
    // images: {
    //   domains: [
    //     "localhost",
    //     "nextjs-vercel.payloadcms.com",
    //     process.env.NEXT_PUBLIC_APP_URL,
    //     `${process.env.NEXT_PUBLIC_S3_ENDPOINT}`.replace("https://", ""),
    //   ],
    // },
  },
  {
    configPath: path.resolve(__dirname, './payload/payload.config.ts'),
    payloadPath: path.resolve(process.cwd(), './payload/payloadClient.ts'),
  }
)

module.exports = nextConfig
