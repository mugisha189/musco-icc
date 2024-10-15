import withBundleAnalyzer from '@next/bundle-analyzer';
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'cdn.discordapp.com' },
      { hostname: 'e0.365dm.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
};

export default bundleAnalyzer(nextConfig);
