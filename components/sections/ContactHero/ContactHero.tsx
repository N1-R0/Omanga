import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ContactHeroContent } from "@/content/contact-hero.content";
import type { ContactOptionsContent } from "@/content/contact-options.content";

import { OptionsPanel } from "./OptionsPanel";
import { SupportBlock } from "./SupportBlock";

/**
 * The Contact page hero — spec §§ 2 and 3, laid out from Figma node 2579:131893.
 *
 * Two columns: § 2's eyebrow, `h1`, paragraph and support block on the left,
 * § 3's options panel on the right. A Server Component throughout — the option
 * cards are links and the selection lives in the query string, so nothing in this
 * band hydrates.
 *
 * ---------------------------------------------------------------------------
 * [MEASURED from node 2579:131893] The band.
 *
 * A 1424 container split 680 / 680 with a 64 gap — two equal columns and
 * `--space-8` between them, which is exactly the content column. The left
 * column's rhythm is 40 from the eyebrow to the `h1` and 40 again to the
 * paragraph, both `--space-6` at its wide end; the right column is centred
 * against the left on the cross axis.
 *
 * The `h1` is 64px at line-height 1.0 with −0.03em tracking, which is
 * `--text-h1` at its wide end. Its paragraph is 18px at 1.5 — `--text-main` at
 * its wide end.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] § 3 renders inside this band rather than as its own section.
 *
 * The node puts the options panel beside the headline, where § 2 and § 3 describe
 * two stacked sections. That resolves a conflict rather than creating one: § 2 and
 * § Conversion notes both justify the hero having no CTA on the grounds that one
 * "would compete with the option grid 300px below and split the click", and in
 * this layout the option grid *is* the hero's right column — there is nothing
 * below to split.
 *
 * The consequence for the outline is none. The `h1` is still this band's, § 3's
 * `How can we help?` is still an `h2`, and the option cards' `h3`s still sit
 * beneath it. § SEO's hierarchy holds; the headings are just higher up the page.
 *
 * The consequence for the page is that § 3 has no separate `section` element, so
 * this band is named by the `h1` alone. That is correct — a `section` for § 3
 * inside a `section` for § 2 would nest two regions where the design draws one
 * band, and the panel's `h2` names the panel without needing a landmark.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The band renders its own `section` rather than using `Section`.
 *
 * The same call `Hero`, `GetStartedHero`, `InsuranceHero` and `AboutStory` each
 * make: a minimum band height is a fourth thing `Section` does not own, and this
 * band needs one for the same reason the other heroes do. The surface classes are
 * `Section`'s own `light` tone rather than new ones, so it cannot drift from every
 * other light band, and the contract still holds — one surface, one rhythm, one
 * container, one accessible name.
 *
 * `min-h-hero-compact` from `tablet:` only, and as a minimum rather than a
 * maximum: pinning the height clips copy at 200% zoom (WCAG 1.4.4) and in the
 * 320px reflow case (WCAG 1.4.10). The node's band is 544 tall against this
 * token's 432 → 552, so the measured height sits inside the ramp.
 */

/**
 * `items-center` puts the options panel on the left column's centre line, which
 * is what the node draws — the panel is shorter than the copy column and is
 * centred against it rather than top-aligned.
 *
 * Below desktop the grid is one column in DOM order: § 2's copy, then § 3's
 * panel. That is the reading order the spec's own section numbering implies, and
 * it needs no `order` anywhere.
 */
const LAYOUT_CLASS =
  "grid grid-cols-1 items-center gap-fluid-7 desktop:grid-cols-2 desktop:gap-fluid-8";

export type ContactHeroProps = {
  content: ContactHeroContent;
  options: ContactOptionsContent;
  headingId: string;
  optionsHeadingId: string;
  /**
   * The selected option, from the page's `?enquiry=` query. Passed down rather
   * than read here: a section does not reach for the URL, and the page is the one
   * component the App Router hands `searchParams` to.
   */
  selectedEnquiry?: string;
  /** The page's own path, so the cards and `Go back` address it explicitly. */
  path: string;
};

export function ContactHero({
  content,
  options,
  headingId,
  optionsHeadingId,
  selectedEnquiry,
  path,
}: ContactHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="section-rhythm flex items-center bg-surface-page text-ink focus-ring-on-light tablet:min-h-hero-compact"
    >
      <Container>
        <div className={LAYOUT_CLASS}>
          <div>
            {/*
              `align="start"` rather than the default `stretch`: under `stretch`
              the `Badge` is pulled to the full column width and stops reading as
              a pill, and every measure cap resolves against the column instead of
              its own content.

              `gap="3xl"` (36 → 48) between the intro paragraph and the support
              block. The node puts 24 + 13 + a spacer paragraph there — its own way
              of saying "these are two different things" — and one step that says
              so is better than a spacer element that renders nothing.
            */}
            <Stack gap="3xl" align="start">
              {/*
                `gap="xl"` (28 → 32) between the three blocks of § 2's copy, which
                is the step both other heroes use. The node's 40 is `--space-6`;
                `xl` is one step tighter and is what stops the `h1` and its
                paragraph reading as two separate statements at this scale.
              */}
              <Stack gap="xl" align="start">
                {/*
                  An eyebrow, not a heading — § SEO's hierarchy lists no heading
                  for it, and stacking one here would break the outline. `Badge`
                  renders a `span`.
                */}
                <Badge tone="light">{content.eyebrow}</Badge>

                {/*
                  The page's single `h1`. `measure="hero"` (28ch) rather than the
                  `none` the About hero takes: this heading is 22 characters, so
                  the cap never engages at any width — declared because it is the
                  documented default for an `h1` and there is no column-width
                  argument for opting out of it here.
                */}
                <Heading id={headingId} level="h1" role="hero" measure="hero">
                  {content.heading}
                </Heading>

                {/*
                  [MEASURED] `measure="narrow"` (60ch), and the arithmetic is the
                  reason rather than a preference.

                  The node sets this paragraph to 540 of its 680 column. At the
                  18px this role resolves to, one `ch` in Kantumruy Pro is about
                  9px, so 60ch is 540 — the node's width exactly.

                  It was `feature` (45ch), which is 405 and read tight against the
                  column beside it. `feature` is the cap for copy inside a card;
                  this is a hero paragraph in half a band, which is what `narrow`
                  is documented for: "body copy in a narrower context — beneath a
                  centred heading, or in a hero."
                */}
                <Text role="body" measure="narrow">
                  {content.intro}
                </Text>
              </Stack>

              <SupportBlock content={content.support} />
            </Stack>
          </div>

          {/*
            § 3's panel. It takes its own content and heading id, so this
            component composes the two sections without either knowing about the
            other's copy.
          */}
          <OptionsPanel
            content={options}
            headingId={optionsHeadingId}
            selected={selectedEnquiry}
            path={path}
          />
        </div>
      </Container>
    </section>
  );
}
