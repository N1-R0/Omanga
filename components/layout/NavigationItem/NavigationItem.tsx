import Link from "next/link";

import { cx } from "@/lib/cx";
import type { LinkTarget } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

/**
 * One navigation link.
 *
 * Pure and stateless: it is told whether it is the current page rather than
 * working it out. That keeps it a Server Component, keeps it free of any
 * knowledge of routing, and means the desktop bar and the mobile panel render
 * the identical element from the identical props.
 *
 * design.md § 9 gives the nav link `text-main` at weight 400, and reserves
 * brand for "primary buttons, active tab pill, active underline, emphasis
 * border, CTA band". Hover takes the label to brand at weight 500 and slides a
 * rule in from the left; the current page holds that same rule at full width.
 *
 * State is never colour alone: the current page carries `aria-current`, which
 * is also what draws its rule, and hover adds a weight change on top of the
 * colour so the two are separable without relying on hue.
 *
 * ---------------------------------------------------------------------------
 * [KNOWN LIMITATION] Hover and current still resemble each other closely — both
 * end at brand with a full-width rule, differing only in weight. That is the
 * cost of an instructed hover treatment that borrows the active state's own
 * signal. `aria-current` keeps them distinct programmatically and hover is
 * transient, but a pointer user resting on the current item sees one state.
 */

/**
 * The rule and the hover weight reservation both live in `nav-link`; see
 * `styles/utilities.css` for why the label is stacked rather than styled
 * directly. `data-label` is required by it and is set below.
 */
const BASE_CLASS =
  "nav-link px-fluid-3 font-sans text-main hit-area focus-ring transition-standard";

/**
 * State × tone.
 *
 * Only colour and weight appear here. The rule is not in this map: it is drawn
 * by `nav-link` in `currentColor` and revealed by `:hover` or `aria-current`,
 * so it follows whatever the label is doing on any surface without a per-tone
 * entry — which is the whole reason it moved into the utility.
 *
 * `light` is the opaque header: ink label, brand at weight 500 on hover, brand
 * for the current page.
 *
 * `dark` is the header transparent over the hero photograph, and it is not the
 * light treatment with different colours — it is a different treatment, because
 * brand does not survive on that surface. Measured against the scrimmed top strip,
 * `#AE2448` sits at 1.32:1 against the lightest pixels, well under the 3:1 a UI
 * boundary needs. So the label stays white throughout, which is the highest
 * contrast available, and hover is carried by the weight change and the rule
 * alone.
 *
 * `brand` is unreachable today: the header is never rendered on the brand band.
 * It maps to the dark treatment rather than being omitted, so `Tone` stays a
 * closed union that every consumer can satisfy.
 */
const STATE_CLASS: Readonly<Record<Tone, { current: string; default: string }>> =
  {
    light: {
      current: "text-brand",
      default: "text-ink hover:text-brand hover:font-medium",
    },
    dark: {
      current: "text-on-dark",
      default: "text-on-dark hover:font-medium",
    },
    brand: {
      current: "text-on-dark",
      default: "text-on-dark hover:font-medium",
    },
  } as const;

export type NavigationItemProps = {
  link: LinkTarget;
  /** Whether this link points at the page being viewed. */
  isCurrent: boolean;
  /**
   * The surface the item sits on. Passed explicitly, never inferred — the header
   * changes tone on scroll, and a component that read its own background would
   * have to re-read it on every frame.
   */
  tone: Tone;
};

export function NavigationItem({ link, isCurrent, tone }: NavigationItemProps) {
  const state = STATE_CLASS[tone];
  const className = cx(BASE_CLASS, isCurrent ? state.current : state.default);

  /**
   * `data-route-pending` surfaces an approved label whose route does not exist
   * yet. It renders in the DOM on purpose: the outstanding stubs are then
   * auditable in a crawl or a Playwright assertion, not only in a handoff note.
   */
  const pendingAttribute = link.isRoutePending === true ? { "data-route-pending": "true" } : {};

  // `aria-current="page"` rather than `true` — the specific value tells a
  // screen reader *how* this item is current, and "page" is the accurate one.
  const currentAttribute = isCurrent ? { "aria-current": "page" as const } : {};

  /**
   * The label is wrapped so it and the hidden weight reservation are two grid
   * items in one cell. A bare text node would be an anonymous item that cannot
   * be placed, which is what would let the two sit side by side and double the
   * link's width instead of stacking.
   */
  const label = <span>{link.label}</span>;

  if (link.isExternal === true) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-label={link.label}
        {...currentAttribute}
        {...pendingAttribute}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      data-label={link.label}
      {...currentAttribute}
      {...pendingAttribute}
    >
      {label}
    </Link>
  );
}
