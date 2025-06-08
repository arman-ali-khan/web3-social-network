const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['via.placeholder.com', 'images.unsplash.com']
  },
  experimental: {
    appDir: true,
  },
  // Remove headers configuration when using output: 'export'
  // Headers are not supported with static export
};

module.exports = withPWA(nextConfig);