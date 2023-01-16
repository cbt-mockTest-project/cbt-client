/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
});
const settings = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cbteungwangnestjs961203.s3.amazonaws.com'],
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
const nextConfig =
  process.env.NODE_ENV === 'development' ? settings : withPWA(settings);

module.exports = nextConfig;
