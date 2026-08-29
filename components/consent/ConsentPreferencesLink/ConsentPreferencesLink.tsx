"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { consentContent } from "@/content/consent.content";

/**
 * The footer control that reopens the cookie preferences dialog.
 *
 * A visitor who accepted or refused once has no other way back to the choice —
 * the banner is gone by design, and the only remaining route would be clearing
 * site data. That is not a withdrawal mechanism. Data protection law requires
 * withdrawing consent to be as easy as giving it, and a persistent link in the
 * footer of every page is what makes that true here rather than only claimed in
 * the Cookie Policy.
 *
 * A `button`, not a link, because it opens a dialog rather than navigating. A
 * styled anchor with no `href` would be announced as a link, would not respond to
 * the space bar, and would offer a context menu full of navigation actions that
 * do nothing.
 *
 * Rendered only once consent state has been read, so it does not appear during
 * the pass where the banner is also about to appear — the two controls would
 * otherwise both be on screen offering the same choice.
 */
export function ConsentPreferencesLink() {
  const { isReady, openPreferences } = useConsent();

  if (!isReady) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      data-underline
      className="text-left font-sans text-main text-on-dark focus-ring transition-standard hover:text-secondary"
    >
      {consentContent.reopenLabel}
    </button>
  );
}
