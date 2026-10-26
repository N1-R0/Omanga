import type { Metadata, Viewport } from "next";

import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { SkipLink } from "@/components/layout/SkipLink";
import { fontVariables } from "@/config/fonts";
import { fontVariables as chromeFontVariables } from "@/new-redesign/config/fonts";
import { Footer } from "@/new-redesign/components/layout/Footer";
import { ConsentPreferences } from "@/new-redesign/components/consent/ConsentPreferences";
import { CookieBanner } from "@/new-redesign/components/consent/CookieBanner";
import { Header } from "@/new-redesign/components/layout/Header";
import { BRAND_COLOR, SITE_NAME, SITE_URL } from "@/config/site";
import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from "@/content/site.content";
// The header and footer's styles first, so the old stylesheet wins where the
// two share a token name (new-redesign/styles/chrome.css).
import "@/new-redesign/styles/chrome.css";
import "@/styles/globals.css";

/**
 * Root layout for the pages not yet rebuilt in the new design (about, plans,
 * safety, contact, blog, rates, get-started and the legal pages). They keep
 * the old design system for their content, under the new design's header and
 * footer (cutover, 2026-10-26). Home, Payments and Insurance use
 * app/(new-redesign)/layout.tsx.
 *
 * This is one of two root layouts; there is deliberately no app/layout.tsx,
 * so each owns its `<html>`, fonts and stylesheet. When a page is rebuilt it
 * moves to app/(new-redesign); when the last one has, this layout, the old
 * stylesheet and new-redesign/styles/chrome.css go.
 */

export const metadata: Metadata = {
  // Required for the Metadata API to resolve canonical and Open Graph URLs
  // from relative paths. Set once here rather than per page.
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  /*
    `publisher`, and deliberately not `keywords`.

    An SEO checker flagged three tags as missing. Two of them are not being
    added, and the reasoning is recorded here so it is not re-litigated the next
    time a tool reports them:

      keywords       Google stopped using it in 2009 and has said so publicly;
                     Bing treats a stuffed one as a spam signal. It ranks
                     nothing and publishes the target terms to competitors.
      X-Robots-Tag   An HTTP-header form of the meta robots tag this site
                     already emits as "index, follow". Two sources for one
                     instruction is a footgun: where they disagree the more
                     restrictive wins, so a stray header could deindex the site
                     while the HTML still claimed otherwise. It earns its place
                     on non-HTML files — PDFs and the like — and this site
                     serves none.

    `publisher` is cosmetic rather than load-bearing: it is not a standard tag
    and Google does not consume it. The real publisher signal is the
    `Organization` node in `lib/schema.ts` and the `publisher` reference on the
    `WebSite` node, both of which already shipped. This is here because it costs
    one line and answers the question a reader of the head would otherwise ask.
  */
  publisher: SITE_NAME,
  /*
    No `icons` entry. The three icon files at the top of `app/` — `favicon.ico`,
    `icon.svg` and `apple-icon.png` — are file conventions, so Next emits the
    links for them and a manual entry here would only duplicate or contradict
    that.

    It previously pointed both `icon` and `apple` at `/logo-omanga.svg`, which is
    the vertical lockup: mark above the word "OMANGA". At a 16px tab icon the
    word is four illegible pixels of noise and the mark is squeezed into the
    remaining third of the square. The icon files are cropped to the mark alone
    for that reason.
  */
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  colorScheme: "light",
};

export default function RedesignRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} ${chromeFontVariables}`}>
      {/*
        A flex column with `main` taking the remaining space, so a short page
        still puts the footer at the bottom of the viewport rather than halfway
        up it.
      */}
      {/* `pt-header` reserves the 76px bar: the header is absolute, over the page top. */}
      <body className="relative flex min-h-full flex-col pt-header">
        {/*
          Wraps everything, because two different consumers need the same
          decision: `ConsentedAnalytics` at the end of this body, and the Google
          map inside the Contact page's tree. A provider mounted lower would have
          to be mounted twice, and two providers means two copies of the state
          and a real chance of them disagreeing.

          It renders no markup of its own and holds no state on the server, so
          wrapping the document costs nothing.
        */}
        <ConsentProvider>
          {/*
          First in the document, therefore first in tab order. No `tabindex` is
          involved — a positive one here is the usual way this gets broken.
        */}
          <SkipLink label={SKIP_LINK_LABEL} targetId={MAIN_CONTENT_ID} />

          {/* The new design's chrome; `data-chrome` scopes its styles (new-redesign/styles/chrome.css). */}
          <div data-chrome style={{ display: "contents" }}>
            <Header opaque />
          </div>

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

          <div data-chrome style={{ display: "contents" }}>
            <Footer />
            <CookieBanner />
            <ConsentPreferences />
          </div>


          {/*
          Was a bare `<SpeedInsights />`, which loaded for everyone regardless of
          choice. It now mounts only while analytics consent is granted.
        */}
          <ConsentedAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
