"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { consentContent } from "@/content/consent.content";

/**
 * The first-visit consent banner.
 *
 * ---------------------------------------------------------------------------
 * WHEN IT SHOWS
 *
 * Only when `isReady` is true and there is no stored record. Both halves matter:
 * without `isReady` the banner renders on the server and flashes on every page
 * load for visitors who decided long ago, and without the record check it would
 * ask a question already answered.
 *
 * ---------------------------------------------------------------------------
 * THE THREE CONTROLS ARE DELIBERATELY EQUAL IN WEIGHT
 *
 * "Accept all" and "Reject all" are the same component with the same
 * prominence, side by side, both reachable in one press. The common dark pattern
 * — a filled Accept beside a grey link, or a Reject buried one level down in
 * "Manage preferences" — makes acceptance the path of least resistance, which is
 * the thing that makes the resulting consent not freely given.
 *
 * `Accept all` uses the primary variant only because a button group needs a
 * visual anchor; `Reject all` sits immediately beside it at the same
 * size, with the same hit area, in the same reading order. If a future change
 * moves Reject behind another control or shrinks it, that is a compliance
 * regression, not a design tweak.
 *
 * ---------------------------------------------------------------------------
 * NOT A MODAL, AND IT DOES NOT TRAP FOCUS
 *
 * A cookie wall that blocks the page until answered is a harder question than
 * this site needs to ask, and it makes "no answer" impossible — which is itself
 * a consent problem, because leaving is then the only refusal available. The
 * banner sits at the bottom of the viewport, the page stays readable and
 * scrollable behind it, and doing nothing leaves every optional category off.
 *
 * `role="region"` with a label rather than `role="dialog"`, for the same reason:
 * it is announced and reachable in the tab order, but it does not claim the
 * document's attention or make the content behind it inert.
 */

/*
  [CHANGED, 2026-10-15] Compact on mobile, a corner card on desktop (SEO audit,
  visual findings 1, 3 and 5). The full-width bar covered ~45% of a 375px
  viewport and hid every hero's CTAs; on desktop it sat over the fold content.
  Mobile drops the visible heading (kept for screen readers), sets Accept and
  Reject side by side in equal halves, and puts Manage on its own line below.
  The three controls keep equal reach — see the note above.
*/
const POSITION_CLASS =
  "fixed inset-x-0 bottom-0 z-overlay-content p-fluid-2 print:hidden desktop:left-auto desktop:w-[26rem] desktop:p-fluid-4";

const PANEL_CLASS =
  "flex w-full flex-col gap-fluid-2 rounded-md bg-ink p-fluid-3 text-on-dark shadow-glass-dark focus-ring-on-dark desktop:gap-fluid-3 desktop:p-fluid-4";

export function CookieBanner() {
  const { isReady, record, acceptAll, rejectAll, openPreferences } =
    useConsent();

  if (!isReady || record !== null) {
    return null;
  }

  const { banner } = consentContent;

  return (
    <div className={POSITION_CLASS}>
      <section aria-label={banner.landmarkLabel} className={PANEL_CLASS}>
        <div className="flex flex-col gap-fluid-1">
          <h2 className="sr-only font-sans text-h6 tablet:not-sr-only">
            {banner.heading}
          </h2>
          <p className="font-sans text-small text-on-dark/80">
            {banner.body}{" "}
            <a
              href={banner.policyLink.href}
              data-underline
              className="text-on-dark focus-ring transition-standard hover:text-secondary"
            >
              {banner.policyLink.label}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-fluid-2">
          <Button
            as="button"
            variant="primary"
            tone="dark"
            size="compact"
            onClick={acceptAll}
          >
            {banner.acceptLabel}
          </Button>
          <Button
            as="button"
            variant="secondary"
            tone="dark"
            size="compact"
            onClick={rejectAll}
          >
            {banner.rejectLabel}
          </Button>
          <div className="col-span-2">
            <Button
              as="button"
              variant="text"
              tone="dark"
              size="compact"
              onClick={openPreferences}
            >
              {banner.manageLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
