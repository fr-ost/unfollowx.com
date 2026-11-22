import { djb2Hash } from 'next/dist/shared/lib/hash.js';

// English pages live in the app/(en) route group (see app/(en)/layout.jsx).
// Next.js adds a hash suffix to metadata images inside route groups
// (/features/opengraph-image → /features/opengraph-image-sby49y). Same hash
// function Next uses, so these rewrites keep every original
// …/opengraph-image URL working (shared links, BlogPosting.image).
const ogSuffix = (parent) => djb2Hash(parent).toString(36).slice(0, 6);
const OG_SEGMENTS = ['/about', '/alternatives/circleboom', '/blog', '/faq', '/features', '/guides', '/mass-unfollow-twitter', '/privacy', '/setup', '/twitter-non-followers-checker', '/x-follower-tracker'];
const ogRewrites = [
  ...OG_SEGMENTS.map((seg) => ({ source: `${seg}/opengraph-image`, destination: `${seg}/opengraph-image-${ogSuffix(`/(en)${seg}`)}` })),
  { source: '/blog/:slug/opengraph-image', destination: `/blog/:slug/opengraph-image-${ogSuffix('/(en)/blog/[slug]')}` }
];

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' }
];

const nextConfig = {
  poweredByHeader: false,
  // Two root layouts (English pages and /[lang] pages, so each renders its own
  // <html lang>) need app/global-not-found.jsx for unmatched URLs.
  experimental: { globalNotFound: true },
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    minimumCacheTTL: 2678400
  },
  // Article Markdown and OG fonts are read with fs at build time; include
  // them in traced output in case a route is ever rendered on demand.
  outputFileTracingIncludes: {
    '/**': ['./content/articles/*.md', './lib/og-fonts/*', './public/assets/logo.svg']
  },
  async rewrites() {
    return ogRewrites;
  },
  async redirects() {
    return [
      // Canonical host is www.unfollowx.com. Make sure the Vercel domain
      // settings do not redirect www → apex, or this would loop.
      { source: '/:path*', has: [{ type: 'host', value: 'unfollowx.com' }], destination: 'https://www.unfollowx.com/:path*', permanent: true },
      // Default Vercel production alias → canonical host. Exact match only, so
      // preview deployments (other *.vercel.app hostnames) stay reachable.
      { source: '/:path*', has: [{ type: 'host', value: 'unfollowx-com.vercel.app' }], destination: 'https://www.unfollowx.com/:path*', permanent: true },
      // Legacy static-site URLs (pre-Next.js) keep their link equity.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/features.html', destination: '/features', permanent: true },
      { source: '/faq.html', destination: '/faq', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/setup.html', destination: '/setup', permanent: true },
      { source: '/blog/index.html', destination: '/blog', permanent: true },
      { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true }
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] }
    ];
  }
};

export default nextConfig;
