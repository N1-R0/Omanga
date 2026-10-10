import Image from "next/image";

import { Button } from "@/components/ui/Button";
import {
  appHomeSample,
  paymentsHeroPhoto,
  paymentsHeroSecondary,
  paymentsHeroStoreLabel,
  type PaymentsHeroContent,
} from "@/content/payments-hero.content";

import { AppHomeMockup } from "./AppHomeMockup";
import { StoreBadges } from "./StoreBadges";

/**
 * Payments hero, take 3: Wise's "phone over traveller photo" (Mobbin section
 * 622fd829), picked by the owner as Y6 on 2026-10-10, replacing the crimson
 * flood (Y1) built earlier the same day. The header is the normal white bar
 * again; the flood-header variant went with Y1.
 *
 * White band, two columns at desktop:
 *
 *   - Left, top-aligned: headline (Manrope 800, sentence case), intro,
 *     two buttons. Under
 *     them, App Store / Google Play badges with a "Coming soon" label (the app
 *     is not listed yet, so they are not links).
 *   - Right: a traveller photo filling the column with rounded corners, and the
 *     app's home screen on a phone overlapping the photo's left edge and
 *     dropping below it — the overlap is what ties the person to the product.
 *
 * On phones the columns stack, text first, and the phone sits over the
 * photo's lower left.
 */
export function PaymentsHeroV2({
  content,
  headingId,
}: {
  content: PaymentsHeroContent;
  headingId: string;
}) {
  const { heading, intro, action } = content;

  return (
    <section aria-labelledby={headingId} className="relative overflow-hidden bg-surface-page text-ink">
      <div className="page-gutter mx-auto grid max-w-content items-start gap-fluid-7 pt-fluid-7 pb-fluid-8 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] desktop:gap-fluid-6">
        {/* Copy: top-aligned with the photo, as in the reference. */}
        <div className="flex flex-col items-start desktop:pt-fluid-5">
          <h1
            id={headingId}
            className="max-w-[16ch] font-display text-[clamp(2.5rem,1.5rem+3vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance"
          >
            {heading}
          </h1>
          <p className="mt-6 max-w-[44ch] font-sans text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.5] text-secondary">
            {intro}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-fluid-2">
            <Button as="link" href={action.href} isExternal={action.isExternal} variant="primary" tone="light">
              {action.label}
            </Button>
            <Button as="link" href={paymentsHeroSecondary.href} variant="secondary" tone="light">
              {paymentsHeroSecondary.label}
            </Button>
          </div>
          <StoreBadges label={paymentsHeroStoreLabel} className="mt-8" />
        </div>

        {/*
          Proportions measured off the Wise reference: a portrait photo
          (683:1000) with a small corner radius, about twice the phone's width;
          the phone sits on its lower left, half over the photo and half over
          the page, and drops below the photo's bottom edge (`pb`).
        */}
        <div className="relative pb-[8%] pl-[26%]">
          <div className="relative aspect-[683/1000] overflow-hidden rounded-[0.5rem]">
            <Image
              src={paymentsHeroPhoto.src}
              alt={paymentsHeroPhoto.alt}
              fill
              preload
              sizes="(min-width: 64rem) 40vw, 80vw"
              className="object-cover object-[54%_center]"
            />
          </div>
          <AppHomeMockup sample={appHomeSample} className="absolute bottom-0 left-0 w-[38%]" />
        </div>
      </div>
    </section>
  );
}
