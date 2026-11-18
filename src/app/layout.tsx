import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { JsonLd, ORGANIZATION_LD, WEBSITE_LD } from "@/components/seo/JsonLd";
import { BRAND, SITE_URL } from "@/data/site";
import { OG_IMAGE, TITLE_SUFFIX } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | AI-Assisted Medical Billing & RCM Company`,
    // Any page that does not go through pageMetadata() still ends up with the
    // one suffix. Keywords are gone on purpose: no search engine has used the
    // meta keywords tag for ranking in over a decade.
    template: `%s${TITLE_SUFFIX}`,
  },
  description:
    "Mindlox AI combines experienced medical billing specialists, intelligent automation, and AI-assisted revenue-cycle intelligence to help U.S. healthcare organizations get paid faster, reduce denials, and recover lost revenue.",
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: SITE_URL,
    title: `${BRAND.name} | AI-Assisted Medical Billing & RCM Company`,
    description:
      "Mindlox AI combines experienced medical billing specialists, intelligent automation, and AI-assisted revenue-cycle intelligence to help U.S. healthcare organizations get paid faster, reduce denials, and recover lost revenue.",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Organization and WebSite are sitewide facts, so they are declared
            once here. Pages add only what is theirs: breadcrumbs, Service,
            Article, FAQPage. */}
        <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />
        <Providers>{children}</Providers>
        {/* Core Web Vitals from real visitors. Same-origin, so the strict CSP
            in next.config.ts already permits it, and it no-ops off Vercel. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
