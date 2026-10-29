import type { FundingCurrency, MatrixCurrency } from "@/lib/rates";
import { Converter } from "@/new-redesign/components/ui/Converter";
import { rateHero } from "@/new-redesign/content/rates.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

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

        <div className="relative isolate -mx-4 flex justify-center px-4 py-10 md:mx-0 md:px-10 md:py-14">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:rounded-sm">
            <Photo src={photo.src} alt="" fill preload sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          <div className="w-full max-w-[400px] rounded-[24px] border border-neutral-0/60 bg-neutral-0/30 p-2 shadow-float backdrop-blur-[10px]">
            <Converter matrix={matrix} initialFrom={code} updated={updated} />
          </div>
        </div>
      </div>
    </section>
  );
}
