/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   loader: 'akamai',
  //   path: '/',
  // }
  async rewrites() {
    return [
      {
        destination: 'http://10.20.11.94:8080/:path*',
        source: '/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
