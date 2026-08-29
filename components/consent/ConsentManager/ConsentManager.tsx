"use client";

import { CookieBanner } from "@/components/consent/CookieBanner";
import { ConsentPreferences } from "@/components/consent/ConsentPreferences";

/**
 * The consent UI, as one mount point.
 *
 * The banner and the dialog are separate components because they are separate
 * things — one is a region, one is a modal, and they have different visibility
 * rules — but they are always mounted together, so the layout takes one import
 * and cannot ship half of the pair.
 *
 * Mounted last in `body`, after the footer: it is `fixed`, so document order does
 * not affect where it paints, but it does affect the tab order. A visitor should
 * reach the page's own content and navigation before a banner about cookies.
 */
export function ConsentManager() {
  return (
    <>
      <CookieBanner />
      <ConsentPreferences />
    </>
  );
}
