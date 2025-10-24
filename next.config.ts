import type { NextConfig } from "next";

// Tight but pragmatic CSP for a static portfolio. Adjust if embedding third-parties.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://alfred-portfolio-bot.vercel.app",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://alfred-portfolio-bot.vercel.app",
  "font-src 'self' data:",
  "frame-src 'self'",
].join('; ');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

export default nextConfig;
