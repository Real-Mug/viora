import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Analytics } from "@/components/analytics/analytics";
import { CookieBanner } from "@/components/analytics/cookie-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { rootMetadata } from "@/lib/seo/metadata";

import "./globals.css";

/**
 * Fonts are downloaded at build time and self-hosted by next/font, so there is
 * no render-blocking request to a third-party font host and no layout shift
 * from a late swap. Weights are limited to what the design actually uses.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // A variable font: no fixed weight list, so the display face can be optically
  // sized and softened without shipping several static files.
  weight: "variable",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf8f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        {/* Organization and WebSite schema belong on every page, once. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        <a href="#main" className="skip-link rounded-full bg-evergreen-900 px-5 py-2.5 text-sm font-medium text-linen-50 shadow-lifted">
          Skip to main content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
