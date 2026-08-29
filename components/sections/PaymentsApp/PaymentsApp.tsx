import Image from "next/image";

import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { PaymentsAppContent } from "@/content/payments-app.content";

/**
 * The Omanga mobile app, coming soon — spec § 6.
 *
 * Copy on the content column, photograph running to the viewport's right edge.
 * Built to the reference's app band, which is the layout instructed for this
 * section.
 *
 * A Server Component. One link, so nothing hydrates beyond the entrance wrapper
 * and every word is in the server HTML.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] It renders its own `section`, not the `Section` primitive.
 *
 * The same call `InsuranceHero` and `GetStartedImageBand` already make, for a
 * reason specific to this layout: `Section` puts everything inside one
 * `Container`, so a child either sits on the content column or escapes it
 * entirely. This band needs both at once — copy aligned to the column, artwork
 * flush to the edge — and that is not expressible through its props.
 *
 * What is not re-implemented: the surface and the focus-ring colour are the same
 * classes `Section` would apply for `tone="light"`, named directly here. The
 * arithmetic that keeps the copy aligned lives in `bleed-copy` in
 * `styles/utilities.css` rather than in this markup.
 *
 * Light, after the dark comparison, so the page alternates.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The copy column is centred.
 *
 * The reference centres its whole copy block against the artwork beside it, and
 * that is what ships here. It is a deliberate exception rather than a drift:
 * every other heading on this page sits on one continuous left edge, and
 * `CTAContent` records the same reasoning for the closing band — breaking that
 * edge is what marks a band as a different kind of thing.
 *
 * This page now breaks it twice, here and at the close. Worth knowing, because
 * the argument for centring the closing band was that it happens exactly once.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The band fills the viewport at desktop.
 *
 * `bleed-band` sets `min-block-size: 100dvh` from the desktop breakpoint up, so
 * the photograph is the full height of the screen and the band reads as a stop
 * rather than as one more row. Below desktop it stacks and keeps its own height —
 * see the utility for why forcing a stacked pair into one screen is worse than
 * letting it run.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] The split is one third to two thirds, not one half.
 *
 * The reference gives its copy about a quarter of the band and its artwork the
 * rest, and at 50/50 this read as two equal panels rather than as a photograph
 * with a caption beside it. Four of twelve columns is the nearest the system's
 * own grid gets to the reference without the copy column dropping below a
 * readable measure at desktop.
 *
 * The copy was cut to match in the same change — a third of the width holding
 * six lines of text would have been worse than the half holding six.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] The photograph is on the right and the copy on the left, at desktop
 * only.
 *
 * Below desktop the grid is one column and the copy comes first in DOM order, so
 * the reading order is copy → photograph at every width. There is no `order`
 * anywhere — design.md § 10: "There is no `order` property anywhere in the
 * system — reordering breaks reading order."
 */

/*
  [CHANGED, 2026-08-29] `items-center` is off the grid and on the copy cell.

  The band now fills the viewport at desktop (`bleed-band`), and `items-center` on
  the grid centres BOTH cells in the stretched row — which would leave the
  photograph floating at its intrinsic height in the middle of a 100dvh band with
  white above and below it. The row has to stretch so the artwork can fill it, so
  the centring moves down to the one cell that wants it.

  The copy still sits on the photograph's optical midline, which is what the
  reference does and what stops a short copy block reading as stranded against a
  tall image. It is just centred by its own cell now rather than by the grid.
*/
const LAYOUT_CLASS = "bleed-band grid grid-cols-1 desktop:grid-cols-12";
const COPY_CELL_CLASS =
  "bleed-copy section-rhythm flex items-center desktop:col-span-4";
const MEDIA_CELL_CLASS = "bleed-media desktop:col-span-8";

/*
  Two thirds of the viewport from desktop up, the full width below it where the
  band stacks. Accurate rather than generous: this photograph is the largest
  asset on the page and a wrong `sizes` here is the one thing that would cost the
  LCP budget.
*/
const MEDIA_SIZES = "(min-width: 64rem) 67vw, 100vw";

export type PaymentsAppProps = {
  content: PaymentsAppContent;
  headingId: string;
};

export function PaymentsApp({ content, headingId }: PaymentsAppProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-surface-page text-ink focus-ring-on-light"
    >
      <div className={LAYOUT_CLASS}>
        {/*
          The rhythm sits on the copy cell rather than on the `section`, which is
          what lets the photograph run the full height of the band. On the section
          it would inset the image top and bottom and the bleed would only be
          horizontal.
        */}
        <div className={COPY_CELL_CLASS}>
          {/*
            The wrapper is what `flex items-center` centres. Without it the
            `Reveal` div is the flex item and its own children stack against the
            top of it — the centring would apply to a full-height box rather than
            to the copy inside it.
          */}
          {/*
            `text-center` inherits to every descendant, and `align="center"` on
            the Stack centres the children themselves — which is what centres the
            measure-capped paragraph and sizes the button to its own label instead
            of stretching it across the column. Both are needed: the class handles
            the text inside each element, the prop handles the elements.
          */}
          <div className="w-full text-center">
            <Reveal index={0}>
              <Stack gap="xl" align="center">
                {/*
                The heading carries the "coming soon" claim outright, now that no
                eyebrow and no store slot does. See the content module: it is the
                section's one required statement and must not be softened into
                something that merely implies the app is unreleased.
              */}
                <Heading id={headingId} level="h2" role="section">
                  {content.heading}
                </Heading>

                {/*
                `measure="feature"` (45ch), not `body` (70ch). The cell is a third
                of the band and the paragraph is two sentences — the narrower cap
                is the one that matches the column it sits in.
              */}
                <Text role="body" measure="feature">
                  {content.body}
                </Text>

                <Button
                  as="link"
                  variant={content.action.emphasis}
                  tone="light"
                  href={content.action.href}
                  isExternal={content.action.isExternal}
                >
                  {content.action.label}
                </Button>
              </Stack>
            </Reveal>
          </div>
        </div>

        <div className={MEDIA_CELL_CLASS}>
          {/*
            `fill` rather than intrinsic dimensions: the cell's height comes from
            `--spacing-bleed-media` and from the copy beside it, so the image's own
            2400 × 1600 cannot describe the box. The parent is sized before load
            either way, so nothing shifts.

            Not `Media`: that component locks one of four fixed ratios, and this
            box has no ratio — it is as tall as the taller of the two cells turns
            out to be. The same reasoning `GetStartedImageBand` records for its own
            band.
          */}
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes={MEDIA_SIZES}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
