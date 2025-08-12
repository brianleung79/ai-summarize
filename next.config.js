/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/ai-summarize',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
