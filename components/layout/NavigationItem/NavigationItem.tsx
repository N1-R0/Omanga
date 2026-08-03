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
 * design-system.md gives the nav link Inter Regular 14/17 and reserves brand
 * for "primary buttons, active tab pill, active underline, emphasis border, CTA
 * band". The active state therefore uses brand for both the label and a 3px
 * rule; hover uses brand for the label only. That keeps active distinguishable
 * from hover at rest, which a colour-only difference would not.
 *
 * State is never colour alone: the current page also carries `aria-current`,
 * and the underline is a second visual signal for anyone who cannot separate
 * ink from brand.
 */

/**
 * The bottom rule is declared in both states and only its colour changes, so
 * becoming current cannot alter the element's height. A border that appears on
 * hover is one of the most common sources of a one-pixel layout jitter in a
 * header.
 */
const BASE_CLASS =
  "inline-flex items-center justify-center border-active border-transparent font-ui text-nav hit-area focus-ring transition-standard";

/**
 * State × tone.
 *
 * `light` is the opaque header: ink label, brand on hover, brand label and brand
 * underline for the current page.
 *
 * `dark` is the header transparent over the hero photograph, and it is not the
 * light treatment with different colours — it is a different treatment, because
 * brand does not survive on that surface. Measured against the scrimmed top strip,
 * `#AE2448` sits at 1.32:1 against the lightest pixels, well under the 3:1 a UI
 * boundary needs. So the label stays white throughout, which is the highest
 * contrast available, and the underline carries the state in white.
 *
 * [KNOWN LIMITATION] On the dark tone, hover and current therefore look alike.
 * `aria-current` still distinguishes them programmatically, hover is transient,
 * and the header is only ever dark while sitting at the top of the hero. Making
 * them visually distinct would need a token that does not exist — there is no
 * lighter step than white, and brand fails the contrast bar here.
 *
 * `brand` is unreachable today: the header is never rendered on the brand band.
 * It maps to the dark treatment rather than being omitted, so `Tone` stays a
 * closed union that every consumer can satisfy.
 */
const STATE_CLASS: Readonly<Record<Tone, { current: string; default: string }>> =
  {
    light: {
      current: "border-brand text-brand",
      default: "text-ink hover:text-brand",
    },
    dark: {
      current: "border-on-dark text-on-dark",
      default: "text-on-dark hover:border-on-dark",
    },
    brand: {
      current: "border-on-dark text-on-dark",
      default: "text-on-dark hover:border-on-dark",
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

  if (link.isExternal === true) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...currentAttribute}
        {...pendingAttribute}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      {...currentAttribute}
      {...pendingAttribute}
    >
      {link.label}
    </Link>
  );
}
