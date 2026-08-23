import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { fontVariables } from "@/config/fonts";
import { BRAND_COLOR, SITE_NAME, SITE_URL } from "@/config/site";
import { footerContent, formatCopyright } from "@/content/footer.content";
import { navigationContent } from "@/content/navigation.content";
import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from "@/content/site.content";
import "@/styles/globals.css";

/**
 * Root layout for the redesign.
 *
 * This is one of two root layouts. There is deliberately no `app/layout.tsx`:
 * that is what allows `(redesign)` and `(legacy)` to own separate `<html>`
 * shells, separate fonts and separate stylesheets, so the old design system
 * cannot leak into the new one. Navigating between the two groups triggers a
 * full page load; that goes away when `(legacy)` is deleted.
 *
 * Phase 2 adds the three landmarks that were missing: the skip link, the header
 * and the footer. The shared chrome lives here rather than in each page, per
 * "shared chrome in `layout.tsx`; pages hold section composition only" — which
 * is also what guarantees exactly one of each landmark per document.
 *
 * Content is read here and passed down as props. No layout component reaches
 * into a content module itself, so every user-facing string in the chrome is
 * traceable to one import in one file.
 *
 * Still outstanding for a later phase: `loading.tsx` and `error.tsx` for this
 * segment, and stub routes for the fourteen footer destinations flagged
 * `isRoutePending` in `content/footer.content.ts`.
 */

export const metadata: Metadata = {
  // Required for the Metadata API to resolve canonical and Open Graph URLs
  // from relative paths. Set once here rather than per page.
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  icons: {
    icon: "/logo-omanga.svg",
    apple: "/logo-omanga.svg",
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  colorScheme: "light",
};

export default function RedesignRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * The copyright year is resolved at render. project-context.md lists the
   * hardcoded year as a P0 defect on the current site.
   *
   * These routes render statically, so the year is fixed at build time — correct
   * for a site that redeploys, but worth knowing that a build left untouched
   * across New Year will show the previous year.
   */
  const copyright = formatCopyright(new Date().getFullYear());

  return (
    <html lang="en" className={fontVariables}>
      {/*
        A flex column with `main` taking the remaining space, so a short page
        still puts the footer at the bottom of the viewport rather than halfway
        up it.
      */}
      {/*
        `pt-header` reserves the bar's height.

        `Header` is `fixed` rather than `sticky` — see its own note for why, in
        short: sticky elements lag the scroll by a frame under Lenis and visibly
        jitter. Fixed takes it out of flow, so the space it used to occupy has to
        come from somewhere, and one declaration here is cheaper than every page
        compensating for a bar floating above it.
      */}
      <body className="flex min-h-full flex-col pt-header">
        {/*
          First in the document, therefore first in tab order. No `tabindex` is
          involved — a positive one here is the usual way this gets broken.
        */}
        <SkipLink label={SKIP_LINK_LABEL} targetId={MAIN_CONTENT_ID} />

        {/*
          Renders nothing. Mounted here rather than per page because scroll is a
          document-wide concern and one instance must own it — two would fight
          over the same scroll position. It sits after the skip link so it cannot
          come between that and the tab order.
        */}
        <SmoothScroll />

        <Header
          items={navigationContent.items}
          action={navigationContent.action}
          landmarkLabel={navigationContent.landmarkLabel}
          wordmark={SITE_NAME}
          homeLabel={navigationContent.homeLabel}
          openLabel={navigationContent.menuOpenLabel}
          closeLabel={navigationContent.menuCloseLabel}
        />

        {/*
          The `main` landmark lives in the layout, not in each page, so there
          is exactly one per document and the skip link has a stable target.

          `tabIndex={-1}` is what makes it a valid focus target. Without it,
          following the skip link moves the scroll position but leaves focus at
          the top of the document, so the next Tab returns to the header — the
          most common way a skip link silently fails while looking correct.
        */}
        <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1">
          {children}
        </main>

        <Footer
          columns={footerContent.columns}
          brandParagraph={footerContent.brandParagraph}
          contact={footerContent.contact}
          copyright={copyright}
          wordmark={SITE_NAME}
          homeLabel={navigationContent.homeLabel}
        />

        <SpeedInsights />
      </body>
    </html>
  );
}
