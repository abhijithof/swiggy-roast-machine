/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Expose Reclaim credentials for client-side usage
    NEXT_PUBLIC_RECLAIM_APP_ID: process.env.NEXT_PUBLIC_RECLAIM_APP_ID,
    NEXT_PUBLIC_RECLAIM_APP_SECRET: process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET,
    NEXT_PUBLIC_RECLAIM_PROVIDER_ID: process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID,
  },
  images: {
    domains: [],
  },
  typescript: {
    // Allow production builds to succeed even with TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow production builds to succeed even with ESLint errors
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;

