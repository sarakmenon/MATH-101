/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Static export is optional. Remove 'output: export' if you want to use Next.js server features.
  // For Firebase Hosting with static export, uncomment the line below:
  // output: 'export',
  
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
