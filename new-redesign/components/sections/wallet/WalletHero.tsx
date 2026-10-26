import Image from "next/image";

import { WALLET_URL } from "@/config/site";
import { crossMatrix, getNgnRates } from "@/lib/rates";
import { RateConvertScreen } from "@/new-redesign/components/sections/home/RateConvertScreen";
import { Button } from "@/new-redesign/components/ui/Button";
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
 * home page's working converter in a frosted box, no phone (owner,
 * 2026-10-25, after a converter reference; it replaced the phone with the
 * app home screen), up to 440px wide and shown whole.
 */
export async function WalletHero() {
  const { title, sub, primary, photo } = walletHero;
  const { rates } = await getNgnRates();

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
            and reverted the same day. */}
        <div className="relative isolate mt-14 flex w-full justify-center overflow-hidden rounded-sm px-2 py-8 md:mt-16 md:px-4 md:py-20">
          <Image src={photo.src} alt="" fill priority sizes="(min-width: 1112px) 1080px, 100vw" className="-z-10 object-cover" style={{ objectPosition: photo.position }} />
          <div className="w-full max-w-[440px]">
            <RateConvertScreen matrix={crossMatrix(rates)} variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
