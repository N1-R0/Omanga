import type { Metadata, Viewport } from "next";

import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { ConsentPreferences } from "@/new-redesign/components/consent/ConsentPreferences";
import { CookieBanner } from "@/new-redesign/components/consent/CookieBanner";
import { fontVariables } from "@/new-redesign/config/fonts";
import { Footer } from "@/new-redesign/components/layout/Footer";
import { Header } from "@/new-redesign/components/layout/Header";
import { SmoothScroll } from "@/new-redesign/components/layout/SmoothScroll";
import { BRAND_COLOR, SITE_NAME, SITE_URL } from "@/config/site";
import "lenis/dist/lenis.css";
import "@/new-redesign/styles/globals.css";

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
          <SmoothScroll />
        </ConsentProvider>
      </body>
    </html>
  );
}
