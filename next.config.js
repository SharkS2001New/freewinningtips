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
      {
        source: '/predictions/betnumbers',
        destination: '/predictions/betnumbers-prediction',
        permanent: true,
      },
      {
        source: '/predictions/betnumbers/',
        destination: '/predictions/betnumbers-prediction',
        permanent: true,
      },
      // Legacy Pitch Predictions league URLs → FreeWinningTips canonical paths
      {
        source: '/league/football-predictions-for-:country/:league/fixtures',
        destination: '/league/football-tips-and-predictions-for-:country/:league',
        permanent: true,
      },
      {
        source: '/league/football-predictions-for-:country/:league/results',
        destination: '/league/football-tips-and-predictions-for-:country/:league?tab=results',
        permanent: true,
      },
      {
        source: '/league/football-predictions-for-:country/:league/standings',
        destination: '/league/football-tips-and-predictions-for-:country/:league?tab=standings',
        permanent: true,
      },
      {
        source: '/league/football-predictions-for-:country/:league/trends',
        destination: '/league/football-tips-and-predictions-for-:country/:league?tab=trends',
        permanent: true,
      },
      {
        source: '/league/football-predictions-for-:country/:league',
        destination: '/league/football-tips-and-predictions-for-:country/:league',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
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
