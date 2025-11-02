/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.miswa.ci',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.miswa.ci',
        port: '',
        pathname: '/**',
      },
      // Ajoutez d'autres domaines si nécessaire
      {
        protocol: 'https',
        hostname: 'image.example',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.storage.mahoufarm.bio',
        port: '',
        pathname: '/**',
      },

      {

        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',


      }
    ],
  },
}

module.exports = nextConfig