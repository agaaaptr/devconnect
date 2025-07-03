/** @type {import('next').NextConfig} */
const nextConfig = {
  // <— no experimental.serverActions here
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
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
};

module.exports = nextConfig;
