import { cx } from "@/lib/cx";

/**
 * The timeline's rail, and the fill that tracks the reader down it.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from the structural benchmark] `claritybusinesstravel.com/about`
 * builds its timeline progress with no JavaScript at all — no scroll listener, no
 * IntersectionObserver, no GSAP ScrollTrigger. Four elements and one `position:
 * sticky` do the whole thing:
 *
 *   base       a static 3px column at the rail's full height
 *   progress   3px, 50vh tall, `margin-top: -50vh`, `position: sticky; top: 0`
 *   fades      4px x 64 gradients from the page colour at each end of the rail
 *
 * The trick is the matched pair on the fill. Pulled up by exactly its own height,
 * the bar's *bottom* edge starts on the rail's top edge, so nothing reads as
 * filled. Once the rail's top passes the top of the viewport the bar sticks there,
 * which puts its bottom edge 50vh down the viewport — the vertical centre. From
 * then on that edge is pinned to the middle of the screen and the fill above it is
 * everything the reader has already passed. When the rail's bottom reaches the
 * centre the sticky element runs out of containing block and stops, so the rail
 * finishes full.
 *
 * The reader's own scrolling is the only input. There is no interpolation, no
 * easing and no lag, which is why this is not the scroll-hijacking the measured
 * reference spec rules out ("Do NOT add a scroll-hijack dependency") — the fill is
 * a position readout, in the same class as a scrollbar.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATES FROM animations.css rule 2] "Entrances are one-shot on intersection,
 * never scroll-linked." This is scroll-linked by definition. Taken deliberately,
 * on request, and narrower than the rule's target in three ways worth stating
 * rather than leaving to review:
 *
 *   - It animates nothing. No keyframes, no transition, no transform, so rule 1
 *     ("transform and opacity only") is not in play either. Sticky positioning is
 *     layout the engine already resolves every frame for the header; the cost here
 *     is repainting a 3px column.
 *   - It gates no content. Every step's heading and body sit outside the rail and
 *     read the same whether or not the fill ever moves.
 *   - It carries no meaning of its own, which is also why it is left running under
 *     `prefers-reduced-motion`. That media query targets vestibular triggers —
 *     parallax, and motion that continues after the user has stopped. This stops
 *     the instant they do, and freezing it would remove a position cue from
 *     exactly the readers most likely to want one.
 *
 * ---------------------------------------------------------------------------
 * Paint order is DOM order, on purpose, and there is not a single z-index here.
 * The base is a static block so it paints in the in-flow step; the fill and the
 * fades are positioned so they paint after it, in the order written. Naming a rung
 * of the z-ladder for three elements inside one 32px column would put page-level
 * layering values into a decorative detail.
 */

/**
 * The rail column. 32 wide, which is `--spacing-rail` — the same token the item
 * grid reserves for it, so the rail and the markers cannot drift apart.
 *
 * Centred on the leading edge at narrow widths and on the content block's centre
 * from desktop up, matching where the grid puts the marker column at each width.
 *
 * `clip-rail` is what removes the fill's 50vh overhang above the rail. See the
 * utility for why it is `clip-path` and not `overflow: hidden`.
 */
const RAIL_CLASS =
  "clip-rail pointer-events-none absolute inset-y-0 left-0 flex w-rail flex-col items-center desktop:left-1/2 desktop:-translate-x-1/2";

// `w-0.75` is 3px from the 4px spacing base, not an arbitrary value.
const BASE_CLASS = "h-full w-0.75 bg-surface-light";

/**
 * The fill. Brand over the rail's own #F6F6F6, which is the benchmark's
 * accent-over-neutral relationship expressed in Omanga's palette.
 *
 * design.md § 8 reserves brand for interaction and emphasis and
 * names "active underline" among the five things it is for. This is the same kind
 * of mark — a 3px brand rule that says where you are.
 */
const PROGRESS_CLASS =
  "sticky top-0 -mt-rail-progress h-rail-progress w-0.75 bg-brand";

/**
 * The rail's ends, softened into the page rather than stopping square.
 *
 * 4px wide against the rail's 3 — the benchmark's own overhang, which is what
 * stops a 1px seam of unfaded rail showing at fractional device pixel ratios.
 */
const FADE_CLASS = "absolute h-16 w-1";
const FADE_TOP_CLASS = "top-0 bg-linear-to-b from-surface-page to-transparent";
const FADE_BOTTOM_CLASS =
  "bottom-0 bg-linear-to-t from-surface-page to-transparent";

export function TimelineConnector() {
  return (
    <div aria-hidden className={RAIL_CLASS}>
      {/*
        The fill is written first because flex lays items out in order and its
        negative margin has to resolve against the top of the column — first, it
        occupies -50vh to 0 and the base starts at 0; second, the base would have
        already consumed the full height and pushed it off the end.

        Paint order is unaffected by the swap: the base is a static block and the
        fill is positioned, so the fill paints above it either way.
      */}
      <div className={PROGRESS_CLASS} />
      <div className={BASE_CLASS} />
      <div className={cx(FADE_CLASS, FADE_TOP_CLASS)} />
      <div className={cx(FADE_CLASS, FADE_BOTTOM_CLASS)} />
    </div>
  );
}
