import { ImageResponse } from "next/og";
import { BRAND } from "@/data/site";

/**
 * Social share card, generated at build time and served from /opengraph-image.
 *
 * Next emits the og:image, twitter:image, dimension and alt tags from the
 * exports below, so nothing needs adding to the `metadata` object in layout.
 * Colours mirror `.theme-ultimate` in globals.css.
 */
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#2b6bff";
const ACCENT_2 = "#38d6f5";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07090f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_2})`,
            }}
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: "#fff", letterSpacing: "0.14em" }}>
              {BRAND.wordmark}
            </span>
            <span style={{ fontSize: 34, fontWeight: 700, color: ACCENT_2, letterSpacing: "0.14em" }}>
              {BRAND.suffix}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 68, fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Medical Billing &amp;
          </span>
          <span style={{ fontSize: 68, fontWeight: 700, color: ACCENT_2, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Revenue Cycle Intelligence
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: ACCENT }} />
          <span style={{ fontSize: 26, color: "#9aa4b8" }}>mindlox.ai</span>
        </div>
      </div>
    ),
    size,
  );
}
