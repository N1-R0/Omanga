import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { GetStartedSolutionsContent } from "@/content/get-started-solutions.content";

import { SolutionPanel } from "./SolutionPanel";

/**
 * The Two Solutions — the Get Started page's core section, and the one that does
 * the page's actual job: resolving payments, insurance, or both.
 *
 * A Server Component. Both panel actions are links and everything else is text,
 * so nothing below `Reveal` hydrates and every heading and paragraph is in the
 * server HTML — which the SEO expectations require, since the two panel headings
 * are this page's only long-tail surface.
 *
 * ---------------------------------------------------------------------------
 * DIMENSIONS. Measured from the screenshot, cross-checked against the structural
 * benchmark's second section on `/our-tech`, and mapped onto existing tokens —
 * no new ones. The screenshot's blue marks are Figma's own padding indicators,
 * which is what makes the vertical figures readable at all:
 *
 *   section padding    134 top / 150 bottom  -> `section-rhythm` (64 → 144)
 *   page gutter        108                   -> `Container` (steps to 100)
 *   header to cards    ~69                   -> `gap="4xl"` (40 → 64)
 *   card gap           ~40                   -> `gap="2xl"` (32 → 40)
 *   card radius        8                     -> `rounded-sm`, from `Card`
 *   card surface       #F5F5F5               -> `--color-surface-light` (#F6F6F6)
 *
 * The benchmark is what settles the card gap: the homepage's Solutions Overview
 * already records it as measured directly off that site at 40, which is this
 * system's `2xl` step. The screenshot reads tighter than that, but not by more
 * than the measurement error at this scale, and using a smaller step would put
 * this section's card grid out of step with the homepage's for no gain.
 *
 * Only the benchmark's geometry is taken. Its palette, logos, copy and identity
 * are not — see `get-started-solutions.content.ts` for what its copy is doing in
 * the screenshot and why none of it ships.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED FROM THE HOMEPAGE] The heading block is centred above the cards, not
 * beside them.
 *
 * The homepage's Solutions Overview deliberately puts its heading in a left-hand
 * column next to the cards, and records the reasoning. This section does the
 * opposite because the screenshot and the benchmark's own `/our-tech` section
 * both centre it — and because "no two consecutive sections share a layout
 * pattern" applies across pages too: the two sections would otherwise be the
 * same arrangement twice with different copy.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT, resolved toward the screenshot] Two primary buttons in one section.
 *
 * design.md § Component consistency rule 3 allows one primary per section, and
 * the homepage's equivalent cards ship secondary pills. The screenshot draws both
 * of these brand-filled and the brief calls each a primary CTA.
 *
 * Shipped as drawn, because the rule's purpose is not served by applying it here:
 * it exists to stop two controls competing for one decision, and this section's
 * entire function is a choice between two peers. De-weighting either would be
 * steering the visitor toward a product nobody has decided to promote. Raised
 * rather than resolved silently — it is a one-line change in `SolutionPanel`.
 *
 * ---------------------------------------------------------------------------
 * [KNOWN LIMIT] Panel actions align across the row only while the two
 * paragraphs wrap to the same number of lines.
 *
 * `Card` pushes its copy block to the foot of the card with `mt-auto`, but only
 * when the card has media above it — with no media it deliberately does not,
 * because doing so would strand a stat chip's figure at the bottom of a
 * stretched cell. These panels have no media, so the two pills sit under their
 * own paragraphs rather than on a shared baseline.
 *
 * In practice they line up: the approved paragraphs are 291 and 279 characters,
 * which wrap to the same line count at every breakpoint the panels take. But
 * "cards in a row … with actions aligned across the row" is a card rule, and this
 * satisfies it by content length rather than by construction. Fixing it properly
 * means `Card` applying `mt-auto` whenever an action sits beside a body, which is
 * a change to a shared primitive that four other sections use — flagged for a
 * decision instead of made.
 */

/**
 * The panel heading ids.
 *
 * Module constants rather than props: nothing outside this section consumes
 * them. The section's own heading id *is* a prop, because `Section` names itself
 * with it and the content module owns the value.
 */
const PAYMENTS_HEADING_ID = "get-started-payments-heading";
const INSURANCE_HEADING_ID = "get-started-insurance-heading";

export type GetStartedSolutionsProps = {
  content: GetStartedSolutionsContent;
  /**
   * The id of the section's `h2`.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift.
   */
  headingId: string;
};

export function GetStartedSolutions({
  content,
  headingId,
}: GetStartedSolutionsProps) {
  const [payments, insurance] = content.solutions;

  return (
    <Section labelledBy={headingId} tone="light">
      <Stack gap="4xl">
        {/*
          The centred heading block. `text-center` is declared once here and
          inherits; `align="center"` is what makes each child size to its own
          content so the measure caps resolve to real widths and centre
          themselves. The same pairing the hero uses — see `GetStartedHero` for
          why the default `stretch` would leave centred lines in a left-aligned
          column.
        */}
        <Reveal index={0}>
          <div className="text-center">
            <Stack gap="lg" align="center">
              {/*
                An eyebrow, not a heading — `get-started-seo.md` § Heading
                hierarchy: "Eyebrow labels are styled `<p>` or `<span>`, never
                headings." `Badge` renders a `span`.

                [QUESTION] The brief describes "a small decorative accent" here.
                The mark in the screenshot at that position is one of Figma's blue
                padding indicators rather than drawn content, and the approved copy
                gives this section a small label — "Two solutions, one account" —
                so the eyebrow pill ships. If a decorative rule is genuinely
                wanted instead, that is a new system primitive and a design
                decision, not a substitution to make here.
              */}
              <Badge tone="light">{content.eyebrow}</Badge>

              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>

              <Text role="body" measure="narrow">
                {content.intro}
              </Text>
            </Stack>
          </div>
        </Reveal>

        {/*
          Two up from the tablet breakpoint, one column below it — `Grid`'s only
          behaviour for `columns={2}`, and it never reorders, so payments before
          insurance is the reading order at every width.

          Equal height is `Grid`'s default and is load-bearing here: it is what
          gives both panels the row's height so neither reads as the shorter
          offering.
        */}
        <Grid columns={2} gap="2xl">
          {/*
            `Reveal` becomes the grid item, so the equal-height chain still holds:
            `items-stretch` gives the wrapper the row's height and `Card`'s
            `h-full` resolves against it. The 80ms stagger is the motion system's
            step — entrance only, transform and opacity only, and it renders a
            plain `div` under `prefers-reduced-motion`, so nothing is ever left
            hidden.
          */}
          <Reveal index={1}>
            <SolutionPanel
              content={payments}
              headingLevel="h3"
              headingId={PAYMENTS_HEADING_ID}
            />
          </Reveal>

          <Reveal index={2}>
            <SolutionPanel
              content={insurance}
              headingLevel="h3"
              headingId={INSURANCE_HEADING_ID}
            />
          </Reveal>
        </Grid>
      </Stack>
    </Section>
  );
}
