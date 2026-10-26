import Image from "next/image";

import { WALLET_URL } from "@/config/site";
import { crossMatrix, formatRateDate, getNgnRates } from "@/lib/rates";
import { Button } from "@/new-redesign/components/ui/Button";
import { Converter } from "@/new-redesign/components/ui/Converter";
import { walletHero } from "@/new-redesign/content/wallet.content";

/**
 * 1 · Wallet hero, after the Nova reference (owner, 2026-10-22, "something
 * simple"): the grey page, everything centred: the H1, the sub, one primary
 * action, then a column-wide photo box (owner, 2026-10-25: misty blue
 * ridges, replacing the moving crimson fabric) with the converter box on
 * it. The proof strip sits under it. No 3D shapes (owner dropped 3D
 * assets on 2026-10-15).
 *
 * The header sits over this hero with dark text (Header reads the route).
 *
 * No eyebrow: the rate pill was tried and removed by the owner (2026-10-22).
 *
 * Photo box: the content width, 12px radius, 48px padding (80 from 768px). On it, the
 * compact converter (owner, 2026-10-26, the rate pages' one; it replaced the
 * home converter's frosted card) in a glass frame, up to 400px wide.
 */
export async function WalletHero() {
  const { title, sub, primary, photo } = walletHero;
  const { rates, date } = await getNgnRates();

  return (
    <section aria-labelledby="wallet-hero-title" className="bg-bg">
      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(48px,9vh,112px))] text-center">
        <h1 id="wallet-hero-title" className="type-h1">
          {title.map((line) => (
            <span key={line} className="block text-balance">
              {line}
            </span>
          ))}
        </h1>
        <p className="type-p1 mt-5 max-w-[480px] text-text-secondary">{sub}</p>

        <div className="mt-8">
          <Button href={WALLET_URL} external>
            {primary.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        </div>

        {/* The stage: a column-wide photo box (12px radius, the photo radius)
            with the converter box centred on it. Owner, 2026-10-25: the photo
            replaced the moving crimson fabric; a full-width band was tried
            and reverted the same day, and again on 2026-10-26. Below 768 it
            runs edge to edge, square (owner, 2026-10-26): -mx-4 cancels the
            page gutter. */}
        <div className="relative isolate -mx-4 mt-14 flex w-[calc(100%+2rem)] justify-center px-4 py-10 md:mx-0 md:mt-16 md:w-full md:py-20">
          {/* The photo clips itself, not the box, so the currency list can
              open past the photo's edge. */}
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:rounded-sm">
            <Image src={photo.src} alt="" fill priority sizes="(min-width: 1112px) 1080px, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          {/* Glass frame: an 8px translucent ring around the white card, as on the rate pages. */}
          <div className="w-full max-w-[400px] rounded-[24px] border border-neutral-0/60 bg-neutral-0/30 p-2 text-left shadow-float backdrop-blur-[10px]">
            <Converter matrix={crossMatrix(rates)} updated={formatRateDate(date) ?? "latest available"} />
          </div>
        </div>
      </div>
    </section>
  );
}
