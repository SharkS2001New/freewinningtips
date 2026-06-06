/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
    domains: [
      "www.freewinningtips.com",
      "freewinningtips.com",
      "www.pitchpredictions.com",
      "pitchpredictions.com",
      "api.pitchpredictions.com",
      "media.api-sports.io",
    ],
  },
};

module.exports = nextConfig;
