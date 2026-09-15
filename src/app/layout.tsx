import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

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
  metadataBase: new URL("https://mindlox.ai"),
  title: {
    default: "Mindlox AI — Medical Billing & Revenue Cycle Intelligence",
    template: "%s · Mindlox AI",
  },
  description:
    "Mindlox AI combines experienced medical billing specialists, intelligent automation, and AI-assisted revenue-cycle intelligence to help U.S. healthcare organizations get paid faster, reduce denials, and recover lost revenue.",
  applicationName: "Mindlox AI",
  keywords: [
    "medical billing",
    "revenue cycle management",
    "RCM",
    "denial management",
    "medical coding",
    "A/R recovery",
    "credentialing",
    "healthcare billing company",
  ],
  openGraph: {
    type: "website",
    siteName: "Mindlox AI",
    title: "Mindlox AI — Medical Billing & Revenue Cycle Intelligence",
    description:
      "Experienced billing humans + modern technology + AI-assisted intelligence. Built for U.S. healthcare organizations.",
  },
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
        <Providers>{children}</Providers>
        {/* Core Web Vitals from real visitors. Same-origin, so the strict CSP
            in next.config.ts already permits it, and it no-ops off Vercel. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
