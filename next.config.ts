/** @type {import('next').NextConfig} */
// import { createEnv } from './src/config/env';
// createEnv();
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
