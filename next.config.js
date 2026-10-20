/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.205'], // Allows your local network IP
  devIndicators: false, // Removes the Route/Bundler to
}


module.exports = nextConfig
