import type { NextConfig } from "next";

// CSP tuned for this portfolio and the embedded Alfred widget
const isDevelopment = process.env.NODE_ENV === 'development';
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "blob:",
  "https://www.googletagmanager.com",
  "https://alfred-portfolio-bot.vercel.app",
  "https://cdn.socket.io",
  // Allow localhost scripts in development
  ...(isDevelopment ? ["http://localhost:3000"] : []),
].join(' ');

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // Allow GTM, Alfred widget, and socket.io CDN
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  // Allow HTTPS and WSS connections (widget/socket, analytics)
  "connect-src 'self' https: http: wss: ws:",
  // Allow web fonts over HTTPS (e.g., r2cdn.perplexity.ai)
  "font-src 'self' data: https:",
  // Allow Alfred widget if it uses iframes
  "frame-src 'self' https://alfred-portfolio-bot.vercel.app",
  // Allow web workers from blob URLs
  "worker-src 'self' blob:",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  headers: async () => [
    // Security headers for all routes
    {
      source: '/:path*',
      headers: SECURITY_HEADERS,
    },
    // Cache Next.js build assets aggressively
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    // Cache public static assets aggressively
    {
      source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    // Ensure no caching for API routes
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' },
      ],
    },
  ],
};

export default nextConfig;
