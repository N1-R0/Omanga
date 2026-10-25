import type { Metadata, Viewport } from "next";

import { fontVariables } from "@/new-redesign/config/fonts";
import { Footer } from "@/new-redesign/components/layout/Footer";
import { Header } from "@/new-redesign/components/layout/Header";
import { PreviewBadge } from "@/new-redesign/components/layout/PreviewBadge";
import { BRAND_COLOR, SITE_NAME, SITE_URL } from "@/config/site";
import "@/new-redesign/styles/globals.css";

/**
 * Root layout for the new redesign, served under /new while it is built.
 *
 * Its own <html>, fonts and stylesheet, beside the live site's root layout in
 * app/(redesign). There is no app/layout.tsx, so the two never share CSS. Moving
 * between /new and a live page is a full page load; that ends at cutover.
 *
 * Kept out of search until cutover: `noindex` here (the page stays crawlable so
 * the tag is read, per the note in app/robots.ts), and /new is not in
 * config/routes.ts, so the sitemap never lists it.
 *
 * The header is positioned over the top of the page (the home hero). The
 * footer closes every page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} (preview)`, template: `%s | ${SITE_NAME} (preview)` },
  robots: { index: false, follow: false },
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
        <Header />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <PreviewBadge />
      </body>
    </html>
  );
}
