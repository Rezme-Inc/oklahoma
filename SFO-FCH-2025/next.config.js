/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Ensure webpack properly handles caching
  webpack: (config, { dev, isServer }) => {
    // Force clear cache in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;