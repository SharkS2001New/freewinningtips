/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "www.freewinningtips.com",
      "freewinningtips.com",
      "www.pitchpredictions.com",
      "pitchpredictions.com",
      "api.pitchpredictions.com",
    ],
  },
};

module.exports = nextConfig;
