/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.boohee.cn',
        pathname: '/house/upload_food/**',
      },
      {
        protocol: 'https',
        hostname: 's.boohee.cn',
        pathname: '/house/new_food/small/**',
      },
    ],
  },
};

export default nextConfig;
