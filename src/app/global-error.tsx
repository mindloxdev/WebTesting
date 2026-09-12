"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, so it
 * must render its own <html> and <body> and cannot rely on app styles or fonts.
 * Nothing internal is shown to the visitor.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(`[app] root error${error.digest ? ` (digest ${error.digest})` : ""}: ${error.name}`);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#06091a",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8a93ab", margin: 0 }}>
            Mindlox AI
          </p>
          <h1 style={{ fontSize: "1.875rem", lineHeight: 1.2, margin: "0.75rem 0 0", fontWeight: 700 }}>
            Something went wrong on our end.
          </h1>
          <p style={{ color: "#4a5470", lineHeight: 1.6, marginTop: "1rem" }}>
            Please try again. If the problem continues, email info@mindlox.ai or call 817-256-4378 and a person will help.
          </p>
          <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#2b6bff",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A plain anchor on purpose: the root layout has crashed, so a full
                document load is the only reliable way back. next/link would try to
                reuse the broken router tree. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                border: "1px solid rgba(6,9,26,0.16)",
                borderRadius: "999px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "#06091a",
                textDecoration: "none",
              }}
            >
              Go to the home page
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
