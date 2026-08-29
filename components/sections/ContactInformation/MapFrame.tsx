"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { consentContent } from "@/content/consent.content";
import { OFFICE_MAP_EMBED_URL } from "@/config/site";

/**
 * The Google map frame, behind the functional-cookie gate.
 *
 * ---------------------------------------------------------------------------
 * [RESOLVES the privacy blocker recorded in `OfficeMap`]
 *
 * That note raised the frame as "the site's first third-party request that
 * carries identifiers" with "no cookie banner or consent mechanism anywhere in
 * the application", and listed two ways to close it: gate it behind a consent
 * choice, or replace it with a static image. This is the first of the two.
 *
 * The gate is the absence of the element, not an attribute on it. Until
 * functional consent exists the `<iframe>` is not rendered, so no request
 * reaches `maps.google.com` and Google is given no opportunity to set anything.
 * `loading="lazy"` narrowed that exposure to visitors who scrolled; this removes
 * it for visitors who declined.
 *
 * ---------------------------------------------------------------------------
 * The placeholder is a real control, not a notice.
 *
 * A visitor who refused everything and then wants the map can grant this one
 * category from here, in one press, without hunting for the preferences dialog.
 * That is still specific, informed consent — the placeholder says who the third
 * party is and what loading it allows before the press, not after.
 *
 * Consent granted here persists like any other: it is written to the same record
 * and is revocable from the same dialog.
 */

const FRAME_CLASS = "size-full border-0";

const PLACEHOLDER_CLASS =
  "flex size-full flex-col items-center justify-center gap-fluid-3 p-fluid-4 text-center";

export function MapFrame({ title }: { title: string }) {
  const { hasConsent, save, decisions } = useConsent();

  if (hasConsent("functional")) {
    return (
      <iframe
        src={OFFICE_MAP_EMBED_URL}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={FRAME_CLASS}
      />
    );
  }

  const { mapPlaceholder } = consentContent;

  return (
    <div className={PLACEHOLDER_CLASS}>
      <div className="flex flex-col gap-fluid-1">
        <p className="font-sans text-h6 text-ink">{mapPlaceholder.heading}</p>
        <p className="font-sans text-small text-secondary measure-narrow">
          {mapPlaceholder.body}
        </p>
      </div>

      <Button
        as="button"
        variant="secondary"
        tone="light"
        onClick={() => {
          save({ ...decisions, functional: true });
        }}
      >
        {mapPlaceholder.actionLabel}
      </Button>
    </div>
  );
}
