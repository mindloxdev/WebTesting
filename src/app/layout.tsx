import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { THEME_INIT_SCRIPT } from "@/components/ui/ThemeToggle";

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
  themeColor: "#060b1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Applies the visitor's saved theme before hydration — no flash. */}
        <Script id="mlx-theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
