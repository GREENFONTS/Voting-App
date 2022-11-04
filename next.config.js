/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
}
// module.exports = withPWA({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   scope: "/app",
//   sw: "service-worker.js",
//   // next.js config
// });

module.exports = nextConfig;