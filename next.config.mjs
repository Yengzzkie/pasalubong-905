/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        // Prevent Prisma from being bundled by Webpack
        config.externals.push('.prisma/client');
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  