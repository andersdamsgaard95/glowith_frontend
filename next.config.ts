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
      {
        protocol: 'https',
        hostname: 'usable-melody-a7932d7cee.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
