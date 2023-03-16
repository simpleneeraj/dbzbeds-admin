/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "www.bedsdivans.co.uk",
      "cdn.shopify.com",
      "localhost",
      "avatars.dicebear.com",
    ],
  },
};

module.exports = nextConfig;
