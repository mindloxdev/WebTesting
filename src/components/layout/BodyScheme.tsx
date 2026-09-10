"use client";

import { useEffect } from "react";

/**
 * Mirrors the page's color scheme onto <body> so the area outside the frame
 * (overscroll, late-loading regions) matches — no white flash behind a dark page.
 */
export function BodyScheme({ scheme }: { scheme: "dark" | "light" }) {
  useEffect(() => {
    document.body.dataset.scheme = scheme;
    return () => {
      delete document.body.dataset.scheme;
    };
  }, [scheme]);
  return null;
}
