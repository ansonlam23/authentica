// @ts-ignore
const nextConfig = {
  // Allow ngrok domain for development
  allowedDevOrigins: ['78b6-2607-ac80-40b-5-2c21-1d79-3d21-ba07.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'api.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
