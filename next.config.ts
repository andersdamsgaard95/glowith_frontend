import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // if you're using Strapi locally
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
