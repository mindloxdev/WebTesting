"use client";

import Script from "next/script";

/**
 * Tawk.to property/widget pair from the dashboard embed code. Both IDs are
 * public by design — they ship in the client HTML of every tawk.to site — so
 * they live here rather than in an env var.
 */
const TAWK_SRC = "https://embed.tawk.to/6aa9932bd07e5e344292030e/1k2j6doi6";

/**
 * Tawk.to live chat launcher.
 *
 * `lazyOnload` keeps the widget off the critical path: it loads during browser
 * idle, after hydration, so it moves neither LCP nor INP — both of which
 * <SpeedInsights /> reports on from real visitors.
 *
 * This mirrors tawk.to's own snippet as one inline block on purpose. The
 * config and the injector must run in that order, and two separate <Script>
 * tags sharing a strategy have no guaranteed ordering between them.
 *
 * `customStyle` lifts the launcher clear of <MobileCTABar />, which is fixed to
 * bottom-0 below `lg` and would otherwise sit under the chat bubble.
 *
 * Requires the tawk.to hosts in the CSP in next.config.ts — without them the
 * widget fails silently.
 */
export function LiveChat() {
  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        Tawk_API.customStyle = {
          visibility: {
            desktop: { position: "br", xOffset: 20, yOffset: 20 },
            mobile:  { position: "br", xOffset: 12, yOffset: 96 }
          }
        };
        (function () {
          var s1 = document.createElement("script"),
              s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = ${JSON.stringify(TAWK_SRC)};
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
