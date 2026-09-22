import type { NextConfig } from "next";

/**
 * Content-Security-Policy built from what this site actually loads.
 *
 * Every directive is same-origin: fonts are self-hosted by next/font at build
 * time, and there is no analytics, tag manager, or chat widget. If you add a
 * third party, name its hosts on the specific directives it needs rather than
 * loosening default-src.
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
  "frame-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Keystatic's editor is a self-hosted React app, so it stays same-origin for
 * scripts and styles — but in GitHub storage mode the browser talks to the
 * GitHub API directly and renders contributor avatars from its CDN. Those two
 * origins are the whole difference from the site policy above.
 *
 * This is a separate header rather than a loosening of `csp`, and the site
 * rule below explicitly does not match /keystatic: two Content-Security-Policy
 * headers on one response are intersected by the browser, so an admin screen
 * that inherited both would silently fail to load.
 */
const keystaticCsp = csp
  .replace("connect-src 'self'", "connect-src 'self' https://api.github.com https://github.com")
  .replace("img-src 'self' data: blob:", "img-src 'self' data: blob: https://avatars.githubusercontent.com");

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
  /**
   * <LogoMark /> asks for quality 95 so the mark stays crisp at 3x. Next only
   * serves qualities named here, and warns on every render for any that are
   * not — so the logo's value sits alongside the 75 default everything else uses.
   */
  images: { qualities: [75, 95] },

  /** Never ship browser source maps: they hand readers the unminified app. */
  productionBrowserSourceMaps: false,

  /**
   * src/data/blog.ts reads the posts off disk at module load. Today every
   * route that imports it prerenders, so nothing touches the filesystem at
   * request time and this is belt-and-braces. It is here because the tracer
   * cannot see through a runtime `path.join` to know the .md files are
   * needed: the day one of these routes turns dynamic, it would 500 in
   * production and build clean locally. Cheaper to name the files now.
   */
  outputFileTracingIncludes: {
    "/sitemap.xml": ["./src/content/blog/**/*.md"],
    "/blog/**": ["./src/content/blog/**/*.md"],
  },

  /** Do not advertise the framework. */
  poweredByHeader: false,

  /**
   * The calculator briefly lived at /calculator, and the denial explorer at
   * /revenue-leakage-calculator — a slug that described the other tool. Each
   * page now sits at the URL that names it; these keep the old paths alive.
   */
  async redirects() {
    return [
      { source: "/calculator", destination: "/revenue-leakage-calculator", permanent: true },
    ];
  },

  async headers() {
    // Static for every environment. The per-environment noindex header is set
    // at request time in src/proxy.ts so that promoting a preview build
    // to production cannot carry a stale noindex with it.
    const keystatic = [
      { key: "Content-Security-Policy", value: keystaticCsp },
      // Never index the editor, and never let it be framed.
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ...securityHeaders.filter((h) => h.key !== "Content-Security-Policy"),
    ];

    return [
      { source: "/keystatic/:path*", headers: keystatic },
      { source: "/keystatic", headers: keystatic },
      { source: "/api/keystatic/:path*", headers: keystatic },
      // Everything that is not the editor gets the strict site policy.
      { source: "/((?!keystatic|api/keystatic).*)", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
