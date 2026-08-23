import { Check } from "@/components/icons/Check";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type {
  InsurancePlan,
  InsurancePlansContent,
} from "@/content/insurance-plans.content";
import { cx } from "@/lib/cx";
import type { HeadingLevel, Tone } from "@/types/ui.types";

/**
 * One plan card.
 *
 * There is one of these, not a `SilverCard` and a `GoldCard`. The three tiers
 * are one structure with one surface difference, which is what card rules
 * require: "Repeated structures are one component with variants, never
 * duplicated per instance."
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] It does not use the `Card` primitive.
 *
 * `Card` fixes its region order — media, eyebrow, heading, body, action — and
 * documents that as the point: "slots make the order … unrepresentable any
 * other way." This card needs a labelled checklist *between* the copy and the
 * button, which is a region `Card` has no slot for, and the frame's 40 padding
 * is not one of `Card`'s four measured paddings.
 *
 * The shell is therefore built here, from the same tokens `Card` uses —
 * `bg-brand`, `bg-surface-light`, `rounded-sm`. Nothing about it is arbitrary.
 * The right resolution is a `pricing` shell inside the primitive once a second
 * pricing surface exists; one caller does not justify widening `Card`.
 *
 * ---------------------------------------------------------------------------
 * [NORMALISED from the Figma frame] Four values, each to the nearest token.
 *
 *   - Type is Inter ExtraBold 36 / Medium 13 / Bold 12. The system has one
 *     family and three weights: Kantumruy Pro at 400, 500 for headings, 600 for
 *     inline `strong`. The price takes the `h3` step (30 → 40) and the rows take
 *     `text-small` (14 → 16).
 *   - The badge is a 4-radius rectangle. `Badge` is the pill used as the eyebrow
 *     on every other section of the site.
 *   - The brand card's CTA is a white pill with a `#2f65f1` label. Neither value
 *     is a token and blue appears nowhere else on the site; `Button`'s `brand`
 *     tone gives the measured white-fill/brand-label treatment instead.
 *   - The frame puts the button above the feature list. It sits below it here,
 *     as the live card has it — the button is the card's conclusion, and five
 *     inclusions stranded beneath it read as an afterthought.
 *
 * design.md rule 6: "a raw value in a component is a bug, including one that
 * matches Figma."
 */

type Surface = {
  readonly card: string;
  /** Tone forwarded to every primitive on the card. */
  readonly tone: Tone;
};

const SURFACE: Readonly<Record<"featured" | "standard", Surface>> = {
  /*
    The brand fill is the frame's own treatment for the middle card, and it is
    the neutral visual lift spec § 5 asks for in place of an unevidenced "Most
    popular" tag.
  */
  featured: {
    card: "bg-brand text-on-dark focus-ring-on-dark",
    tone: "brand",
  },
  standard: {
    card: "bg-surface-light text-ink focus-ring-on-light",
    tone: "light",
  },
} as const;

export type PlanCardProps = {
  plan: InsurancePlan;
  /** Labels and block headings shared by all three cards. Owned by the section. */
  labels: Pick<
    InsurancePlansContent,
    "billingPeriod" | "accessLabel" | "includedHeading" | "cardFootnote"
  >;
  /** Passed in so the section owns the outline and no card skips a level. */
  headingLevel: HeadingLevel;
  headingId: string;
};

export function PlanCard({
  plan,
  labels,
  headingLevel,
  headingId,
}: PlanCardProps) {
  const surface = SURFACE[plan.isFeatured === true ? "featured" : "standard"];

  return (
    <div
      className={cx(
        // 40 padding and 32 between blocks, both from the frame and both landing
        // on the top end of a fluid step.
        "flex h-full flex-col gap-fluid-5 rounded-sm p-fluid-6",
        surface.card,
      )}
    >
      <Stack gap="lg" align="start">
        {/*
          The tier name is the card's heading, per spec § 11.2, which counts the
          three plan names among the page's headings. The pill is its
          presentation, not its semantics — so the `Badge` sits inside the
          heading element rather than replacing it, and the card region is named
          "Silver" rather than "$50".
        */}
        <Heading id={headingId} level={headingLevel} role="label">
          <Badge tone={surface.tone}>{plan.name}</Badge>
        </Heading>

        {/*
          The price is a value, not a heading — four headings reading "$50",
          "$85" and "$120" would put prices in the document outline. It takes the
          `h3` step directly for the same reason `ProofStats` does: `Heading`
          always renders a heading element and `Text` stops at 18 → 20, so there
          is no primitive for a large non-heading figure. Worth extracting if a
          third caller appears.
        */}
        <div className="flex items-baseline gap-fluid-1">
          <p className="font-sans text-h3">{formatPrice(plan.price)}</p>

          <Text role="body" as="span" isSecondary>
            {`/${labels.billingPeriod}`}
          </Text>
        </div>

        <Text role="body">{plan.description}</Text>

        {/*
          § 5's "primary benefit" — the one thing a traveller can evaluate at a
          glance. Labelled, because "Category A" alone means nothing outside
          Nigerian private healthcare, and defining the categories is still open.
        */}
        <Text role="small">
          {`${labels.accessLabel}: ${plan.hospitalAccess}`}
        </Text>
      </Stack>

      {/*
        What's included. `grow` is what pushes the button and its footnote to the
        foot of the card, so three cards with lists of different lengths still
        finish with their buttons on one line — the card rule "cards in a row are
        equal height with actions aligned across the row", produced by the
        content rather than by a fixed height.
      */}
      <div className="grow">
        <Stack gap="lg">
          <Text role="small">
            <strong>{labels.includedHeading}</strong>
          </Text>

          <ul role="list" className="flex flex-col gap-fluid-3">
            {plan.included.map((item) => (
              <li key={item} className="flex items-start gap-fluid-2">
                {/*
                  The mark carries no colour of its own and inherits the
                  surface's text colour — which is what keeps it legible on the
                  brand card as well as the light one. The live page's green
                  ticks measure 2.2:1 against brand.
                */}
                <Check size="md" />

                <Text role="small">{item}</Text>
              </li>
            ))}
          </ul>
        </Stack>
      </div>

      {/*
        `align="stretch"` is how a button goes full width — `Button` owns no
        layout and has no `fullWidth` prop, because "width is the parent's
        decision". Full width is what the frame draws, and it is what centres
        the label on the card's vertical axis.
      */}
      <Stack gap="md" align="stretch">
        <Button
          as="link"
          variant={plan.action.emphasis}
          tone={surface.tone}
          href={plan.action.href}
          isExternal={plan.action.isExternal}
        >
          {plan.action.label}
        </Button>

        <div className="text-center">
          <Text role="small" isSecondary>
            {labels.cardFootnote}
          </Text>
        </div>
      </Stack>
    </div>
  );
}

/**
 * The price as it is displayed.
 *
 * Composed here rather than stored as a string so the number stays a number in
 * the content module — which is what lets § 11.5's `Product`/`Offer` schema emit
 * `price` and `priceCurrency` separately when it lands, without parsing a label.
 *
 * [BLOCKER] USD is assumed and the symbol is hardcoded to match. Whether GBP and
 * CAD equivalents display is spec § 12 question 7 — a second currency turns this
 * into an `Intl.NumberFormat` call keyed off the content module's `currency`.
 */
function formatPrice(price: number): string {
  return `$${price}`;
}
