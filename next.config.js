/** @type {import('next').NextConfig} */

const withPWA  = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA({
  nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {

      TOKEN_KEY : "comfort9",

      CLOUD_NAME : "elevio",
      API_KEY : "441632273511282",
      API_SECRET : "QZ_pdgzLjbs90_CinCMIkUYAxis"
  },
})
