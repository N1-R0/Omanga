import type { Metadata } from "next";

import { ConsentManager } from "@/components/consent/ConsentManager";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentedAnalytics } from "@/components/consent/ConsentedAnalytics";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { fontVariables } from "@/config/fonts";
import { SITE_NAME } from "@/config/site";
import { footerContent, formatCopyright } from "@/content/footer.content";
import { languageContent } from "@/content/language.content";
import { navigationContent } from "@/content/navigation.content";
import { notFoundContent } from "@/content/not-found.content";
import "@/styles/globals.css";

/**
 * The 404 page.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE IS AT THE ROOT AND CARRIES ITS OWN `<html>`
 *
 * This app has no `app/layout.tsx`. `(redesign)` and `(legacy)` each own a root
 * layout so the two design systems cannot leak into one another — which is the
 * right call, and it has one consequence that matters here.
 *
 * A `not-found.tsx` inside a route group only handles `notFound()` calls from
 * routes in that group. An unmatched URL — `/careers`, a mistyped path, a stale
 * inbound link — belongs to no segment, so Next resolves it against the *root*,
 * where there is no layout at all. A group-scoped file is never reached, and the
 * first attempt at this page proved it: the file existed, the status was
 * correctly 404, and the served HTML was a bare shell with no header, no footer
 * and no stylesheet.
 *
 * So this file supplies the document itself. That is the documented arrangement
 * for an app with multiple root layouts, and it is why the `<html>`, the font
 * class and the stylesheet import appear here and nowhere else outside the two
 * layouts.
 *
 * ---------------------------------------------------------------------------
 * WHY IT MATTERS MORE THAN A 404 PAGE USUALLY DOES
 *
 * Before this, every broken link on the site — and the audit found twelve, most
 * of them in the footer that renders on every page — landed on Next's built-in
 * default: a centred "404" on a white page with no navigation of any kind.
 *
 * That is a dead end in the literal sense. A visitor who clicked "Careers" had no
 * route onward but the back button, and a crawler that followed one had left the
 * site, because nothing on that page linked anywhere. Rendering the real header
 * and footer turns every one of those into a recoverable stop.
 *
 * The broken links are fixed too — this is the safety net for the ones that will
 * appear later, and for inbound links to URLs that never existed.
 *
 * Next sets a genuine HTTP 404 for this file, so it is not a soft 404.
 */

export const metadata: Metadata = {
  title: { absolute: notFoundContent.meta.title },
  description: notFoundContent.meta.description,
  /*
    `noindex`, and `follow` deliberately rather than incidentally: the page
    renders the full footer, and those links are worth following even from here.
  */
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const copyright = formatCopyright(new Date().getFullYear());

  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-full flex-col pt-header">
        {/*
          The footer renders the cookie-preferences control, which reads consent
          state — so this page needs the provider like every other page does.
          Without it `useConsent` throws and the 404 becomes a 500.
        */}
        <ConsentProvider>
        <Header
          items={navigationContent.items}
          action={navigationContent.action}
          landmarkLabel={navigationContent.landmarkLabel}
          wordmark={SITE_NAME}
          homeLabel={navigationContent.homeLabel}
          openLabel={navigationContent.menuOpenLabel}
          closeLabel={navigationContent.menuCloseLabel}
          language={languageContent}
        />

        <main className="flex-1">
          <div className="section-rhythm-loose bg-surface-page text-ink focus-ring-on-light">
            <Container>
              <div className="flex max-w-form flex-col gap-fluid-5">
                <p className="font-sans text-h6 text-brand">
                  {notFoundContent.eyebrow}
                </p>

                <Heading id="not-found-heading" level="h1" role="hero">
                  {notFoundContent.heading}
                </Heading>

                <Text role="lead" measure="body" isSecondary>
                  {notFoundContent.intro}
                </Text>

                <div className="flex flex-col gap-fluid-3 tablet:flex-row tablet:items-center">
                  <Button
                    as="link"
                    variant="primary"
                    tone="light"
                    href={notFoundContent.action.href}
                  >
                    {notFoundContent.action.label}
                  </Button>
                </div>

                {/*
                  Named routes rather than a bare "go home".

                  Someone arrives here having wanted something specific, and the
                  footer's four columns are a lot to scan. These are the pages the
                  broken links were most likely reaching for, so this doubles as
                  the recovery path for the footer entries that have no
                  destination yet.
                */}
                <div className="flex flex-col gap-fluid-2 border-t border-border-hairline pt-fluid-4">
                  <h2 className="font-sans text-h6">
                    {notFoundContent.linksHeading}
                  </h2>

                  <ul className="flex flex-col gap-fluid-2">
                    {notFoundContent.links.map((link) => (
                      <li key={link.href}>
                        <TextLink href={link.href} tone="light">
                          {link.label}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </div>
        </main>

        <Footer
          columns={footerContent.columns}
          brandParagraph={footerContent.brandParagraph}
          contact={footerContent.contact}
          copyright={copyright}
          wordmark={SITE_NAME}
          homeLabel={navigationContent.homeLabel}
        />

        <ConsentManager />
        <ConsentedAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
