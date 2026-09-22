import { NextResponse } from "next/server";

/**
 * Keeps non-production deployments out of search results.
 *
 * This runs per request rather than at build time on purpose. Vercel's
 * "Promote to Production" reuses an existing preview build, so a noindex
 * decision baked in at build time would follow that build into production and
 * quietly deindex the live site. Reading VERCEL_ENV here means the same build
 * artifact behaves correctly in whichever environment it is serving.
 *
 * Static security headers stay in next.config.ts, where they cost nothing.
 *
 * Named `proxy` because Next 16 deprecated the `middleware` file convention;
 * the behaviour is unchanged.
 */
export function proxy() {
  const res = NextResponse.next();
  if (process.env.VERCEL_ENV !== "production") {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return res;
}

export const config = {
  // Everything except Next's static output and common asset files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)$).*)"],
};
