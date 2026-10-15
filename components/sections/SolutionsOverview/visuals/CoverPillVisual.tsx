/**
 * Insurance card media, modelled on Wise's "Send more, pay even less" card
 * (owner reference, 2026-10-15): one wide pill holding an icon disc, a label
 * and a value, with a small chip under it. Facts from the plans copy: every
 * plan covers hospital admission and emergency evacuation.
 *
 * Neutral (white pill, ink disc) until the section's colours are decided.
 * Decorative: the card's text says the same thing, so it is `aria-hidden`.
 */
export function CoverPillVisual() {
  return (
    <div aria-hidden className="flex w-full flex-col items-center gap-3 py-fluid-6">
      <div className="flex w-full items-center gap-4 rounded-pill bg-surface-page p-2 pr-6 shadow-glass-raised">
        <span className="grid size-14 shrink-0 place-items-center rounded-pill bg-ink text-on-dark">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="font-heading text-h5 font-medium text-ink">Hospital stay</span>
        <span className="ml-auto font-heading text-h5 font-medium text-ink">Covered</span>
      </div>
      <span className="inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-1.5 font-heading text-small font-medium text-on-dark">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5L20 7" />
        </svg>
        Emergency evacuation included
      </span>
    </div>
  );
}
