import type { Metadata, Viewport } from "next";

import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { ConsentPreferences } from "@/new-redesign/components/consent/ConsentPreferences";
import { CookieBanner } from "@/new-redesign/components/consent/CookieBanner";
import { fontVariables } from "@/new-redesign/config/fonts";
import { Footer } from "@/new-redesign/components/layout/Footer";
import { Header } from "@/new-redesign/components/layout/Header";
import { BRAND_COLOR, SITE_NAME, SITE_URL } from "@/config/site";
import "@/new-redesign/styles/globals.css";

/**
 * Root layout for the new design (live from 2026-10-26): home, Payments and
 * Insurance. The pages not rebuilt yet still use app/(redesign)/layout.tsx and
 * the old stylesheet, with this design's header and footer. Moving between the
 * two is a full page load until the last old page is rebuilt.
 *
 * Analytics load only with consent, through the same ConsentProvider as the
 * old pages, so a choice made on either side holds on both.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  publisher: SITE_NAME,
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  colorScheme: "light",
};

export default function NewRedesignRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="relative flex min-h-full flex-col">
        <ConsentProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <ConsentPreferences />
          <ConsentedAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
