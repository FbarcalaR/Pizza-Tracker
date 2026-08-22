/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pizza-calculator',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
