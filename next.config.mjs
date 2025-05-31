/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@statsig/statsig-node-core'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig