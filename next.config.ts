import type { NextConfig } from "next";

// CSP tuned for this portfolio and the embedded Alfred widget
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // Allow GTM, Alfred widget, and socket.io CDN
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://alfred-portfolio-bot.vercel.app https://cdn.socket.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  // Allow HTTPS and WSS connections (widget/socket, analytics)
  "connect-src 'self' https: wss:",
  // Allow web fonts over HTTPS (e.g., r2cdn.perplexity.ai)
  "font-src 'self' data: https:",
  // Allow Alfred widget if it uses iframes
  "frame-src 'self' https://alfred-portfolio-bot.vercel.app",
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
