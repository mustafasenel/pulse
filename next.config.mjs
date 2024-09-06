/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          }
          ,
          {
            protocol: 'https',
            hostname: 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
          }
        ],
      },
      transpilePackages: ['highlight.js'],
};

export default nextConfig;
