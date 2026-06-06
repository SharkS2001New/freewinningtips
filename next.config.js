/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freewinningtips.com' }],
        destination: 'https://www.freewinningtips.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.freewinningtips.com', pathname: '/**' },
      { protocol: 'https', hostname: 'freewinningtips.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.pitchpredictions.com', pathname: '/**' },
      { protocol: 'https', hostname: 'pitchpredictions.com', pathname: '/**' },
      { protocol: 'https', hostname: 'api.pitchpredictions.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.api-sports.io', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
