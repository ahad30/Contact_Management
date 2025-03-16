/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:"export",
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    serverExternalPackages: ['@acme/ui'],
    images: {
    domains: ['i.ibb.co.com'],
  }
    
};

export default nextConfig;
