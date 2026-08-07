import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { GetStartedEnquiryContent } from "@/content/get-started-enquiry.content";

import { EnquiryForm } from "./EnquiryForm";

/**
 * The Get Started page's closing section — the heading block, and the enquiry
 * form for visitors who cannot pick between the two offerings.
 *
 * A Server Component. The heading and both paragraphs are in the server HTML;
 * only `EnquiryForm` below hydrates, which is the smallest part of the section
 * that has to.
 *
 * ---------------------------------------------------------------------------
 * DIMENSIONS, from the screenshot, mapped onto existing tokens:
 *
 *   surface             dark fill               -> `Section tone="dark"`
 *   section padding     ~134 top / ~143 bottom  -> `section-rhythm` (64 → 144)
 *   form column         972 of a 1486 frame     -> `--container-form` (800)
 *   heading to form     ~62                     -> `gap="4xl"` (40 → 64)
 *   field column gap    ~34                     -> `gap-x-fluid-6` (32 → 40)
 *   field row gap       ~40                     -> `gap-y-fluid-5` (28 → 32)
 *   submit              white pill, brand label -> `primary` × `brand`
 *
 * [NOTE] `rhythm` is left at its default rather than set to `loose`. design.md
 * reserves the loose step for "the page's one full-bleed emphasis band" — but the
 * screenshot's padding measures at the default step and the brief makes the
 * screenshot the primary source for padding. The homepage's closing band still
 * carries `loose`, so the two are a step apart by measurement rather than by
 * accident.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED] The surface is `dark`, not `brand`.
 *
 * `Section`'s dark tone supplies `--color-ink`, white foreground and the
 * on-dark focus ring in one place, so nothing inside had to be restyled: `Input`
 * and `Select` already carry a `dark` treatment identical to the `brand` one they
 * were using, and `Text`, `Heading` and `TextLink` all inherit from the surface.
 * The page's alternation still works — three light bands, then this one.
 *
 * design.md describes the closing conversion band as the page's one brand-filled
 * section, so this is a divergence from it rather than from the screenshot.
 * Recorded here rather than resolved.
 *
 * [MEASURED] The submit keeps `tone="brand"` on the dark surface, and it has to.
 * `tone` is documented as the surface a control sits on, but AA is the acceptance
 * bar and outranks the tone table — the same call `SolutionCard` records for the
 * brand product card. Boundary contrast for a filled pill against `--color-ink`:
 *
 *   primary × dark   brand fill  (#AE2448)  2.74:1   FAIL, below the 3:1 in 1.4.11
 *   primary × brand  white fill  (#FFFFFF) 18.06:1   PASS, shipped
 *
 * The white fill is also what the screenshot draws. `primary × dark` was measured
 * for the hero, where the same fill sits on scrimmed photography rather than on
 * flat ink, which is why the gap only appears now.
 *
 * [GAP] Every primary variant's hover resolves to `hover:bg-ink`, which on this
 * surface is the surface itself — so the pill's fill disappears on hover while its
 * label stays legible at 18:1. Not introduced here: it is how the variant map is
 * built, and this is the first button the site has ever placed on an ink section.
 * Fixing it means changing `Button`'s hover for a tone the hero also uses, so it
 * is raised rather than done.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Four fields, not the screenshot's six.
 *
 * Company, Phone, "previous/current service provider" and "any other
 * information" are the benchmark's fields and none has approved copy — see
 * `get-started-enquiry.content.ts` for the full note and for why three of them
 * are blocked on grounds beyond copy. The screenshot's *structure* is kept: a
 * two-column grid of underlined fields under a centred heading, with one centred
 * submit beneath. It is two rows rather than three.
 *
 * ---------------------------------------------------------------------------
 * This section carries the page's only form and therefore the page's only P0
 * that cannot be closed in code: `get-started-seo.md` requires a privacy notice
 * beneath the submit button linking to a real policy page, and no policy page
 * exists. The element is absent rather than placeheld.
 */

export type GetStartedEnquiryProps = {
  content: GetStartedEnquiryContent;
  /**
   * The id of the section's `h2`.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift.
   */
  headingId: string;
};

export function GetStartedEnquiry({
  content,
  headingId,
}: GetStartedEnquiryProps) {
  return (
    <Section labelledBy={headingId} tone="dark">
      {/*
        The form column is narrower than the content column and centred inside
        it. `Container` still owns the page gutters — this only caps the column
        within them, which is why it is a `max-w` on a wrapper here rather than a
        second container primitive.
      */}
      <div className="mx-auto w-full max-w-form">
        <Stack gap="4xl">
          {/*
            The centred heading block. `text-center` is declared once and
            inherits; `align="center"` makes each child size to its own content so
            the measure caps resolve to real widths and centre themselves — the
            same pairing the hero and the solutions section use.
          */}
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>

              <Text role="body" measure="narrow">
                {content.intro}
              </Text>
            </Stack>
          </div>

          <EnquiryForm content={content} />
        </Stack>
      </div>
    </Section>
  );
}
