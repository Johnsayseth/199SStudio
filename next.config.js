/** @type {import('next').NextConfig} */
const nextConfig = {
  // TỐI ƯU: Enable performance optimizations for Next.js 14
  experimental: {
    optimizePackageImports: ["bootstrap", "bootstrap-icons"],
    // TỐI ƯU: Thêm các experimental features để cải thiện performance
    optimizeCss: true,
  },

  // VERCEL DEPLOY: Loại bỏ serverRuntimeConfig vì Vercel không cần
  // serverRuntimeConfig: {
  //   hostname: "0.0.0.0",
  //   port: 3000,
  // },

  // Custom server configuration for better network display
  async rewrites() {
    return [
      {
        source: "/network-info",
        destination: "/api/network-info",
      },
    ];
  },

  // TỐI ƯU: Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // TỐI ƯU: Enable image optimization với cấu hình tốt hơn
  images: {
    unoptimized: false,
    // VERCEL DEPLOY: Thêm domains cho production
    domains: ["localhost", "127.0.0.1", "199sstudio.vn", "199sstudio.com"],
    formats: ["image/webp", "image/avif"],
    // Allow all image sources for development
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // TỐI ƯU: Thêm cấu hình để cải thiện performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // TỐI ƯU: Cải thiện image loading performance
    loader: "default",
    path: "/_next/image",
    // TỐI ƯU: Cải thiện image loading performance
    contentDispositionType: "attachment",
  },

  // TỐI ƯU: Enable compression and optimization
  compress: true,
  poweredByHeader: false,

  // Fix for Next.js 14 compatibility
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  // VERCEL DEPLOY: Tối ưu output cho production
  output: "standalone",

  // TỐI ƯU: Enable headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // TỐI ƯU: Thêm performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // TỐI ƯU: Thêm image optimization headers
          {
            key: "Accept-Encoding",
            value: "gzip, deflate, br",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net https://unpkg.com; connect-src 'self' https://sheets.googleapis.com; frame-src 'self' https://www.facebook.com https://www.tiktok.com https://*.facebook.com https://*.tiktok.com https://www.google.com https://maps.google.com https://*.google.com; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
