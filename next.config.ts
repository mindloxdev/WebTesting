import type { NextConfig } from "next";

/**
 * Content-Security-Policy built from what this site actually loads.
 *
 * Everything is same-origin: fonts are self-hosted by next/font at build time,
 * and there is no analytics, tag manager, or social embed. If you later add
 * one, widen the matching directive here rather than loosening default-src.
 *
 * Two deliberate allowances:
 *   script-src 'unsafe-inline'  — Next.js inlines its bootstrap and streams
 *     RSC payloads through inline scripts. Removing this requires per-request
 *     nonces via middleware, which is a larger change.
 *   style-src 'unsafe-inline'   — Framer Motion writes animated styles inline.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: ["camera=()", "microphone=()", "geolocation=()", "payment=()", "usb=()", "interest-cohort=()"].join(", "),
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  /** Never ship browser source maps: they hand readers the unminified app. */
  productionBrowserSourceMaps: false,

  /** Do not advertise the framework. */
  poweredByHeader: false,

  async headers() {
    // Static for every environment. The per-environment noindex header is set
    // at request time in src/middleware.ts so that promoting a preview build
    // to production cannot carry a stale noindex with it.
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
