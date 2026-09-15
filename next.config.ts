import type { NextConfig } from "next";

/**
 * Content-Security-Policy built from what this site actually loads.
 *
 * Almost everything is same-origin: fonts are self-hosted by next/font at
 * build time, and there is no analytics or tag manager. The one exception is
 * the tawk.to live chat widget (src/components/layout/LiveChat.tsx), whose
 * hosts are named explicitly on each directive it needs. If you add another
 * third party, widen the matching directive the same way rather than loosening
 * default-src. Removing the chat widget means removing these five hosts too.
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
  "script-src 'self' 'unsafe-inline' https://*.tawk.to",
  "style-src 'self' 'unsafe-inline' https://*.tawk.to",
  "img-src 'self' data: blob: https://*.tawk.to https://tawk.link",
  "font-src 'self' data: https://*.tawk.to",
  // wss: is the chat's live socket — without it the widget renders but never connects.
  "connect-src 'self' https://*.tawk.to wss://*.tawk.to",
  "manifest-src 'self'",
  // The widget renders its panel in an iframe and plays a new-message sound.
  "frame-src 'self' https://*.tawk.to",
  "media-src 'self' https://*.tawk.to",
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
