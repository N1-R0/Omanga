/**
 * A step's marker on the rail.
 *
 * design.md draws a 15px marker; 15 is off the 4px grid, so it normalises
 * to 16 — which is also the benchmark's `0.9375rem` normalised the same way.
 *
 * ---------------------------------------------------------------------------
 * No longer absolutely positioned. It is a cell of the item's grid now, sitting in
 * the same 32 column the rail runs down, so one template places both the marker
 * and the copy. Absolute positioning was what allowed the two to disagree.
 *
 * `mt-5` sits it on the optical centre of the step heading's first line: 20 against
 * the h3's 44 line box at the wide end. Horizontal centring is the cell's job — see
 * `TimelineItem` for why it is flex there and not `justify-self` here.
 *
 * `shrink-0` because the cell is a flex container: without it the 16 box is a
 * shrinkable flex item, and the ring is drawn from the box.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED] Two changes from the previous marker, both from the benchmark's
 * `about-timeline_circle`:
 *
 *   fill   #F6F6F6 -> ink. The old fill was the same token as the rail, so the
 *          markers were invisible against it and read only as a slight thickening
 *          of the line. The benchmark sets its markers in its text colour against
 *          a neutral rail for exactly this reason.
 *   ring   `shadow-rail-break`, a band of the page surface at 8px. It breaks the
 *          rail and the progress fill behind the dot rather than letting either run
 *          straight through it, which is what makes a marker read as a station on
 *          the line instead of a bead threaded onto it.
 */
/**
 * [FIXED] `relative z-raised`.
 *
 * The marker is a static element in the grid flow; the rail is an absolutely
 * positioned sibling in `TimelineConnector`. A positioned element paints above a
 * non-positioned one regardless of DOM order, so the rail was being drawn
 * straight through the dot — and `--shadow-rail-break`, whose entire job is to
 * punch a ring of page surface through the rail at the marker, was painting
 * underneath the thing it was meant to hide. The dot rendered as a dark circle
 * with a light slit through its middle.
 *
 * Giving the marker its own stacking position puts it back above the rail, which
 * is what makes the ring do its job.
 */
const MARKER_CLASS =
  "pointer-events-none relative z-raised mt-5 size-4 shrink-0 rounded-pill bg-ink shadow-rail-break";

export function TimelineMarker() {
  return <span aria-hidden className={MARKER_CLASS} />;
}
