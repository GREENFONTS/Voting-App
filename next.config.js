/** @type {import('next').NextConfig} */

const withPWA  = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig;
//  withPWA({
//   nextConfig,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   }
// })
