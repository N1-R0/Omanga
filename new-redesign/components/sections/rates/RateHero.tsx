import Image from "next/image";

import type { FundingCurrency, MatrixCurrency } from "@/lib/rates";
import { Converter } from "@/new-redesign/components/ui/Converter";
import { rateHero } from "@/new-redesign/content/rates.content";

/**
 * Rate page hero (owner, 2026-10-26): horizontal. The section is white, with
 * the text on the left and, on the right, the mountain photo as the
 * converter's own container (12px radius), the compact converter sitting on
 * it in a glass frame. Stacked below 1024: text, then the photo.
 *
 * The section runs up under the absolute header (`-mt-19`) so the white
 * reaches the top of the page instead of leaving the grey strip the
 * not-rebuilt layout reserves.
 */
export function RateHero({
  headingId,
  eyebrow,
  heading,
  note,
  code,
  matrix,
  updated,
}: {
  headingId: string;
  eyebrow: string;
  heading: string;
  note: string;
  code: FundingCurrency;
  matrix: Readonly<Record<MatrixCurrency, Readonly<Record<MatrixCurrency, number>>>>;
  updated: string;
}) {
  const { photo } = rateHero;

  return (
    <section aria-labelledby={headingId} className="-mt-19 bg-surface pt-19">
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16 lg:py-20">
        <div className="flex flex-col items-start">
          <p className="type-p2 inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
          <h1 id={headingId} className="type-h1 mt-5 max-w-[12ch] text-balance">
            {heading}
          </h1>
          <p className="type-p1 mt-5 max-w-[420px] text-text-secondary">{note}</p>
        </div>

        {/* Below 768 the photo runs edge to edge, square, as on Payments and
            Insurance (owner, 2026-10-26): -mx-4 cancels the page gutter. */}
        <div className="relative isolate -mx-4 flex justify-center px-4 py-10 md:mx-0 md:px-10 md:py-14">
          {/* The photo clips itself, not the box, so the currency list can
              open past the photo's edge. */}
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:rounded-sm">
            <Image src={photo.src} alt="" fill priority sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          {/* Glass frame: an 8px translucent ring around the white card. */}
          <div className="w-full max-w-[400px] rounded-[24px] border border-neutral-0/60 bg-neutral-0/30 p-2 shadow-float backdrop-blur-[10px]">
            <Converter matrix={matrix} initialFrom={code} updated={updated} />
          </div>
        </div>
      </div>
    </section>
  );
}
