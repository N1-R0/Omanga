// design-system.md draws a 15px marker; 15 is off the 4px grid, so it normalises to 16.
// `top-5` sits it on the optical centre of the step heading's first line.
const MARKER_CLASS =
  "pointer-events-none absolute top-5 left-2 size-4 -translate-x-1/2 rounded-dot bg-surface-light desktop:left-1/2";

export function TimelineMarker() {
  return <span aria-hidden className={MARKER_CLASS} />;
}
