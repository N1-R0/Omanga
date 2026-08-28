import Link from "next/link";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ContactOption } from "@/content/contact-options.content";
import { CONTACT_ENQUIRY_PARAM } from "@/content/contact-options.content";

/**
 * One contact option — the whole card is the control.
 *
 * A link rather than a button, and a Server Component as a result: the selection
 * lives in the query string, so this card needs no state, no handler and no
 * hydration. See the content module for why that is the right reading of § 3's
 * "cards are semantically `<button>` elements" and § 4 note 8's URL requirement.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131893] The card.
 *
 * `#ffd200` fill at radius 8, 24 padding, a row with the copy block against a
 * 48px circle at the far end, 24 between them. The copy is a 24.5px heading with
 * a 16px paragraph 16 beneath it. Every one of those but the fill is a token:
 * `--radius-sm`, `--space-4`, `--text-h5`, `--text-main`, `--space-3`.
 *
 * The fill is the reference's brand and has no Omanga equivalent. `--color-brand`
 * takes it, which design.md § 8 sanctions — brand is for "interaction and
 * emphasis", and this is the page's primary conversion control.
 *
 * [MEASURED] The circle inverts against the reference's.
 *
 * The node draws an ink circle on a yellow fill. On Omanga's brand fill that
 * pairing measures 2.58:1, under the 3:1 a non-text boundary needs, and it reads
 * muddy. Reversed — a page-surface circle with a brand glyph — it is 6.70:1 both
 * ways and it is the same relationship the node has, just resolved for a dark
 * fill instead of a light one. It is also exactly `Button`'s `primary` treatment
 * on `tone="brand"`, so the card's affordance matches every other control that
 * sits on brand.
 */

/**
 * `group` is what lets the circle respond to a hover on the card rather than on
 * itself — the whole card is the control, so the whole card is the hover target.
 *
 * [DEVIATION] Hover inverts the fill to ink. § 3 asks for "lift + border-colour
 * shift to maroon" and a scale-down when pressed; design.md § 11 principle 5
 * forbids lifting, shadowing and scaling outright. The inversion is the
 * treatment every button on the site uses, and § 3's own reduced-motion fallback
 * is "colour change only" — so this is that fallback promoted to the default.
 */
const CARD_CLASS =
  "group flex items-center justify-between gap-fluid-4 rounded-sm bg-brand p-fluid-4 text-on-dark focus-ring transition-standard hover:bg-ink";

/**
 * `shrink-0` because the circle is a fixed 48 beside a paragraph that wraps —
 * without it the flex row steals from the circle before it wraps the text.
 *
 * The glyph colour follows the fill it sits on: brand on the resting card, ink
 * once the card's fill has inverted to ink, so the arrow never disappears.
 */
const CIRCLE_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-pill bg-surface-page text-brand transition-standard group-hover:text-ink";

export type OptionCardProps = {
  option: ContactOption;
  /**
   * The page's own path.
   *
   * Passed in rather than written as a query-only `?enquiry=…` href. Both resolve
   * to the same URL, but an explicit path is what lets this card sit on the
   * preview route today and on `/contact` after the move without either the
   * content module or this component knowing which — the page is the one place
   * that knows where it is mounted, so it is the one place that says.
   */
  path: string;
};

export function OptionCard({ option, path }: OptionCardProps) {
  return (
    /*
      `scroll={false}` is what makes this § 4's in-place reveal rather than a
      navigation: the URL changes, the panel re-renders on the server with the
      selected form, and the scroll position does not move. § 4: "the page does
      not navigate and the scroll position is preserved."
    */
    <Link
      href={`${path}?${CONTACT_ENQUIRY_PARAM}=${option.enquiry}`}
      scroll={false}
      className={CARD_CLASS}
    >
      <span>
        {/*
          `h3`, per § SEO's hierarchy — "H3 | Talk to us / Notifications | 3 —
          option cards" — under § 3's own `h2`. `measure="none"` because the card
          is already a narrow column and a `ch` cap inside it would be a second
          constraint on the same line length.

          The id is derived from the option rather than passed in: nothing names
          itself with `aria-labelledby` from a card heading, so it needs a stable
          id but not a shared one.
        */}
        <Heading
          id={`contact-option-${option.id}-heading`}
          level="h3"
          role="column"
          measure="none"
        >
          {option.heading}
        </Heading>

        {/*
          Not a `Stack`. The gap between a heading and its body is the one place
          the system uses a padding step instead — the same call `TimelineItem`
          and `ImpactPanel` make.
        */}
        <span className="block pt-fluid-3">
          <Text role="body" as="span" measure="none">
            {option.body}
          </Text>
        </span>
      </span>

      {/*
        Decorative, and correctly so: the card's accessible name is its heading
        and body, so the arrow carries no information a screen reader needs. § 3
        calls it the "arrow affordance" and § 3's table gives the arrow rather
        than the node's two distinct glyphs — there is no chat bubble or bell in
        `components/icons/`, and an icon has to come from a real exported asset
        rather than one authored here.
      */}
      <span aria-hidden className={CIRCLE_CLASS}>
        <ArrowRight size="md" />
      </span>
    </Link>
  );
}
