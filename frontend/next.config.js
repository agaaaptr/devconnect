/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for production
  output: 'standalone',
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  
  // Rewrites for API proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
        }/:path*`,
      },
    ];
  },
  
  // Optional: Add experimental features if needed
  experimental: {
    // Add any experimental features here if needed
  },
};

module.exports = nextConfig;