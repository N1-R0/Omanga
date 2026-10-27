
/**
 * Global content — strings that appear on more than one page.
 *
 * Section modules sit beside it as `<section-name>.content.ts`.
 *
 * Everything below is verbatim from the CEO-approved copy document via
 * project-context.md § Non-negotiable copy facts. Nothing here is drafted,
 * paraphrased, or inferred. If a string is not in the approved doc, it does
 * not belong in this file.
 */

/**
 * Approved factual constants.
 *
 * Exporting the count as a constant means no section can type the wrong number
 * without deleting this line first.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] 43 → 50, and the rendered figure is now open-ended.
 *
 * The previous value came from the CEO-approved copy document's tracked changes,
 * which replaced every "52" the redesign spec carried with "43". That figure was
 * shipped across ten content modules, the homepage meta description, the footer's
 * coverage label and `Organization.areaServed`.
 *
 * Superseded on instruction: the count is **50+**. Two consequences worth
 * recording, because both are departures from how this constant behaved:
 *
 *   1. The rendered figure is no longer the bare number. "50" and "50+" are
 *      different claims — one is exact, the other is a floor — and every place
 *      this appears in copy means the floor. `COUNTRIES_SERVED_DISPLAY` is
 *      therefore what copy interpolates, and the bare number stays for the one
 *      consumer that needs arithmetic rather than a label.
 *
 *   2. The payments content spec's own "52+" is *not* what shipped either. It
 *      was raised alongside this change and 50+ was confirmed over it, so a
 *      later reader finding 52 in that document is finding the superseded value,
 *      not an unapplied correction.
 */
export const COUNTRIES_SERVED = 50 as const;

/**
 * The count as copy renders it.
 *
 * A separate constant rather than a `+` typed at each site, for the reason every
 * other duplicated fact on this site has one owner: eleven interpolations that
 * each append their own suffix is eleven places for one of them to say "50
 * countries" when the claim is "50 or more".
 *
 * Every user-facing string interpolates this. `COUNTRIES_SERVED` itself is only
 * for a consumer that needs the number as a number.
 */
export const COUNTRIES_SERVED_DISPLAY = `${COUNTRIES_SERVED}+` as const;

/*
 * Product vocabulary: tracked changes removed every "card" claim from the
 * approved copy ("one card" became "a customized payment solution").
 * Physical-card language must not reappear in copy, alt text or component
 * names.
 */
