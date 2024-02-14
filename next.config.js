/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});
const settings = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cbteungwangnestjs961203.s3.amazonaws.com','dxw2azlbq2ays.cloudfront.net'],
  },
  webpack: (config) => {
    // 아래를 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
const nextConfig = withPWA(settings);

module.exports = nextConfig;

