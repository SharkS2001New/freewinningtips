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
  async headers() {
    return [
      {
        source: "/api/site-content/footer-sponsors",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: '/blogscache/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
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
