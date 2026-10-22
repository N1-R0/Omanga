import { WALLET_URL } from "@/config/site";
import { getNgnRates } from "@/lib/rates";
import { HeroFabric } from "@/new-redesign/components/sections/home/HeroFabric";
import { AppHomeScreen } from "@/new-redesign/components/sections/wallet/AppHomeScreen";
import { Button } from "@/new-redesign/components/ui/Button";
import { PhoneFrame } from "@/new-redesign/components/ui/PhoneFrame";
import { walletHero } from "@/new-redesign/content/wallet.content";

/**
 * 1 · Wallet hero, after the Nova reference (owner, 2026-10-22, "something
 * simple"): the grey page, everything centred: the H1, the sub, one primary
 * action, then a box of the home hero's moving crimson fabric (HeroFabric,
 * owner 2026-10-22; it replaced the still U2 satin) with the phone standing
 * in it, cut off by the box's bottom edge (owner, 2026-10-22, after
 * a product-in-a-photo-box reference). The proof strip sits under the box. No 3D shapes beside the phone
 * (owner dropped 3D assets on 2026-10-15).
 *
 * The header sits over this hero with dark text (Header reads the route).
 *
 * No eyebrow: the rate pill was tried and removed by the owner (2026-10-22).
 *
 * Box: the full content width, 4px radius (the texture radius), 600px tall
 * (440 below 768). Phone: the owner's 309 × 675 frame at full size from 768px
 * (278 × 608 below), so the box shows the balance, the actions and the
 * transactions before the edge.
 */
export async function WalletHero() {
  const { title, sub, primary } = walletHero;
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

        {/* The stage: the home hero's moving crimson fabric in a 4px-radius box,
            the phone standing in it from 96px down on desktop (64 on
            tablet, 40 on mobile) and cut by the box's bottom edge. No fill
            of its own (owner, 2026-10-23): HeroFabric paints brand-600 until
            WebGL draws. */}
        <div className="relative isolate mt-14 flex h-[440px] w-full justify-center overflow-hidden rounded-sm pt-10 md:mt-16 md:h-[600px] md:pt-16 lg:pt-24">
          <HeroFabric />
          <PhoneFrame className="[--phone-scale:0.9] md:[--phone-scale:1]">
            <AppHomeScreen gbpToNgn={rates.GBP} />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
