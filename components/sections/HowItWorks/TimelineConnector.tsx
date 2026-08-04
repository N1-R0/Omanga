// `w-0.75` is 3px from the 4px spacing base, not an arbitrary value.
const RAIL_CLASS =
  "pointer-events-none absolute inset-y-0 left-0 w-0.75 bg-surface-light desktop:left-1/2 desktop:-translate-x-1/2";

// design-system.md § Motion principles: "Rail fade | Static gradient mask at the timeline
// rail head, not animated." Painted as the page colour fading out over the rail head.
const HEAD_FADE_CLASS =
  "pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-surface-page to-transparent";

export function TimelineConnector() {
  return (
    <div aria-hidden className={RAIL_CLASS}>
      <div className={HEAD_FADE_CLASS} />
    </div>
  );
}
