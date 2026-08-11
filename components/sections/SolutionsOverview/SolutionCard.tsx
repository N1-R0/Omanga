import { Card } from "@/components/ui/Card";
import type { CardProps } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { SolutionContent } from "@/content/solutions.content";
import type { HeadingLevel, Tone } from "@/types/ui.types";

import { SolutionIllustration } from "./SolutionIllustration";
import { InsuranceVisual } from "./visuals/InsuranceVisual";
import { PaymentsVisual } from "./visuals/PaymentsVisual";

/**
 * One of the section's two product cards.
 *
 * There is one of these, not an `InsuranceCard` and a `PaymentCard`. The two
 * cards have identical internal structure — art, heading, body, one link — and
 * `design.md` § Card variants requires that of them: "Product cards are
 * equal-width and equal-height siblings; they differ by surface only, never by
 * internal structure or padding." `component-rules.md` then closes the question:
 * "Repeated structures are one component with variants, never duplicated per
 * section." Two files would be two places for the structure to drift.
 *
 * The name is also a rule rather than a preference. `project-context.md` forbids
 * "physical-card language in copy, image alt text, or component names", and
 * `coding-guidelines.md` § Naming repeats it as "no card-based names for wallet
 * features" — so `PaymentCard`, which is the industry term for exactly the
 * physical product Omanga does not issue, is not available as an identifier.
 * `SolutionCard` names the UI shell; the offerings are named by the section that
 * composes them.
 *
 * A Server Component. Nothing here hydrates: the action is a link, and every
 * state the card has — hover, focus-visible, active — is CSS on the `Button`
 * primitive.
 *
 * ---------------------------------------------------------------------------
 * The internal arrangement is the layout reference's, and it lives in `Card`
 * rather than here: art at the top, the whole copy block at the foot, free space
 * between them, 24 / 24 / 32 padding, 8 radius. `Card` owns "surface, radius,
 * padding, and border" by rule, so a section component cannot restate any of it
 * — which is also what guarantees the two cards cannot drift apart.
 *
 * One faithful-in-effect divergence, recorded rather than hidden: the reference
 * card is `align-items: flex-start`, and `Card` keeps the flex default and wraps
 * the pill in a block box instead. Same rendered result — a content-width pill —
 * but `items-start` on our version would also shrink the body paragraph to its
 * longest word instead of wrapping it at the card's edge.
 */

/**
 * Which of the two offerings this card is, expressed as hierarchy rather than
 * as a surface name. A closed union of two, because the section has two
 * offerings and speculative variants are forbidden.
 */
type Emphasis = "primary" | "secondary";

/**
 * Emphasis × surface.
 *
 * `emphasis` is hierarchy, not appearance: insurance is the emphasised offering
 * and takes the brand surface, payments takes the light one. The mapping to a
 * card variant and a button tone lives here so the section never names a
 * surface, and so the pairing cannot come apart — a brand card with a
 * light-surface button would be invisible.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED] The brand card's button takes `tone="brand"`, not `tone="dark"`.
 *
 * `design.md` § Card variants specifies a "secondary-on-dark button"
 * inside the primary product card, and § Button variants restricts
 * secondary-on-brand to "the CTA band only". Measured against the brand fill,
 * the first of those fails and the second passes:
 *
 *   secondary / dark   hover fills white @30% over #AE2448
 *                      -> white label at 3.75:1   FAIL
 *   secondary / brand  resting white @10%  -> 5.61:1   PASS
 *                      hover   white @20%  -> 4.61:1   PASS
 *
 * The label is 14px SemiBold, which is not WCAG "large text", so the full 4.5:1
 * applies in every state. `coding-guidelines.md` makes WCAG 2.1 AA "the
 * acceptance bar", which outranks the tone table — and `tone` is documented as
 * "the surface the button sits on", which on a brand-filled card is `brand`
 * anyway. Same failure mode and same resolution the `Button` primitive already
 * recorded for the hero's secondary over photography.
 *
 * Visible consequence, recorded rather than hidden: the frame draws this pill
 * unfilled, and it ships with a white @10% wash. At that opacity on brand it is
 * very close to unfilled, and it is the version that clears AA on hover.
 */
const EMPHASIS: Readonly<
  Record<Emphasis, { card: CardProps["variant"]; button: Tone }>
> = {
  primary: { card: "product-primary", button: "brand" },
  secondary: { card: "product-secondary", button: "light" },
} as const;

/**
 * How the card's art behaves. Passed by the section rather than carried in the
 * content module: an illustration, a device mockup and an interface visual are
 * design treatments, not copy.
 *
 * The two `*-visual` members are interactive product mockups that replaced the
 * static artwork; the two image members are the treatments that artwork used.
 * Both kinds stay in the union deliberately — `SolutionIllustration` documents
 * two measured image treatments and remains the path back if a visual is ever
 * withdrawn, which is cheaper than deleting it and re-deriving the insets later.
 *
 * Resolving the member to a component here rather than in the section is what
 * keeps this file the single place that knows how the two cards differ, which is
 * the same argument the component's own docblock makes for there being one card
 * and not two.
 */
type Presentation =
  | "illustration"
  | "device"
  | "insurance-visual"
  | "payments-visual";

/**
 * The card's media region.
 *
 * `image.alt` feeds the visual's accessible name as well as the image's, so the
 * decorative-or-described decision is made once, in the content module, whichever
 * treatment the card is using.
 */
function SolutionMedia({
  content,
  presentation,
  imageSizes,
}: Pick<SolutionCardProps, "content" | "presentation" | "imageSizes">) {
  switch (presentation) {
    case "insurance-visual":
      return <InsuranceVisual label={content.image.alt} />;
    case "payments-visual":
      return <PaymentsVisual label={content.image.alt} />;
    default:
      return (
        <SolutionIllustration
          image={content.image}
          presentation={presentation}
          sizes={imageSizes}
        />
      );
  }
}

export type SolutionCardProps = {
  content: SolutionContent;
  emphasis: Emphasis;
  presentation: Presentation;
  /**
   * The document outline level for this card's heading. Passed in so the
   * section owns the outline and the card cannot skip a level.
   */
  headingLevel: HeadingLevel;
  /** Stable id for the card heading. Required by `Heading`. */
  headingId: string;
  /** The `sizes` attribute for the card art. Owned by the section's grid. */
  imageSizes: string;
};

export function SolutionCard({
  content,
  emphasis,
  presentation,
  headingLevel,
  headingId,
  imageSizes,
}: SolutionCardProps) {
  const surface = EMPHASIS[emphasis];

  return (
    <Card
      variant={surface.card}
      media={
        <SolutionMedia
          content={content}
          presentation={presentation}
          imageSizes={imageSizes}
        />
      }
      heading={
        /*
          `role="feature"` is measured, not guessed: Figma renders this heading
          as a single 36.4-tall line, which is the deep-dive feature role
          (28 / 36.4 / 0) exactly.

          The frame draws it SemiBold and it ships Regular, because the token
          carries the weight and `design.md` § Typography hierarchy lists
          this role as "Poppins Regular". Rule 6 settles it: "a raw value in a
          component is a bug, including one that matches Figma."
        */
        <Heading id={headingId} level={headingLevel} role="feature">
          {content.heading}
        </Heading>
      }
      body={
        /*
          No `measure` — the paragraph fills the card, which is what the card's
          own 24 padding is for. No `isSecondary` either: the frame draws both
          bodies at full opacity, and on the brand surface the 80% treatment
          would spend contrast headroom for no gain in hierarchy, which the type
          scale already provides.
        */
        <Text role="body">{content.body}</Text>
      }
      action={
        /*
          A link, not a button. It navigates to a route, and button rules are
          explicit that "the rendered element follows semantics: `button` for
          actions, `a` for navigation, chosen by prop, never by styling".

          No trailing icon: the frame draws none on either pill, and an arrow
          that the design does not show is a decision, not a default.

          `Card` bottom-aligns this region, so the two pills sit on one line
          across the row however much body copy each card carries.
        */
        <Button
          as="link"
          variant="secondary"
          tone={surface.button}
          href={content.action.href}
        >
          {content.action.label}
        </Button>
      }
    />
  );
}
