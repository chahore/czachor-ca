/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: 'media.licdn.com',
      },
    ],
  },
  experimental: {
    ppr: true,
  },
}

module.exports = nextConfig
