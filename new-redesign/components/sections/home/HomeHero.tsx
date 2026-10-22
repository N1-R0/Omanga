import { WALLET_URL } from "@/config/site";
import { crossMatrix, getNgnRates } from "@/lib/rates";
import { HeroConverter } from "@/new-redesign/components/sections/home/HeroConverter";
import { HeroFabric } from "@/new-redesign/components/sections/home/HeroFabric";
import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { homeHero } from "@/new-redesign/content/home.content";

/**
 * 1 · Hero (img 1 layout): header over it, centred headline, one filled action.
 *
 * Background (owner, 2026-10-21): the animated crimson fabric (HeroFabric),
 * based on brand-600 #AE2448. The section has no fill of its own (owner,
 * 2026-10-23): the old brand-950 flashed on first load, so HeroFabric paints
 * brand-600 itself until WebGL draws. White text on #AE2448 is 6.68:1; on the lightest
 * folds (brand-400) it drops to about 3:1, which the 48px H1 passes and the
 * sub doesn't fully, so watch the sub on the lightest frames.
 *
 * Primary action (owner, 2026-10-21): the `inverse` button, white with a
 * near-black label (17.3:1), as on Miyagami. A crimson fill disappeared into
 * the #AE2448 cloth.
 *
 * The converter (owner, 2026-10-21) sits under the CTAs in the glass frame.
 *
 * Exactly one screen, full width (owner, 2026-10-21): `h-svh` (svh, so mobile
 * browser bars don't hide content), with the content centred in the space
 * under the 76px header. The gaps shrink with the viewport height (clamp on
 * vh), so the whole hero fits from about 720px tall. `min-h-fit` lets it grow
 * past one screen only when the content truly can't fit, so the converter is
 * never clipped. No overflow-hidden: the currency pickers open below the card
 * and may extend past the hero.
 *
 * Rates come from the same hourly public snapshot as the live site's rate pages.
 */
export async function HomeHero() {
  const { title, sub, primary, secondary } = homeHero;
  const { rates } = await getNgnRates();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex h-svh min-h-fit w-full text-text-inverse"
    >
      <HeroFabric />

      <div className="container-page flex flex-col items-center justify-center pt-[calc(76px+clamp(16px,4vh,48px))] pb-[clamp(24px,5vh,64px)] text-center">
        <div className="flex max-w-[640px] flex-col items-center gap-4">
          <h1 id="hero-title" className="type-h1">
            {/* Each sentence is its own balanced line, so a narrow screen splits
                "Stay covered / in Nigeria." rather than orphaning "Nigeria." */}
            {title.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h1>
          <p className="type-p1 max-w-[520px] text-text-inverse/90">{sub}</p>
        </div>
        <div className="mt-[clamp(20px,3.5vh,32px)] flex flex-wrap items-center justify-center gap-3">
          <Button href={WALLET_URL} external variant="inverse">
            {primary.label}
          </Button>
          <Button href={href(secondary.path)} variant="onPhoto">
            {secondary.label}
          </Button>
        </div>
        <div className="mt-[clamp(24px,5vh,64px)] flex w-full justify-center">
          <HeroConverter matrix={crossMatrix(rates)} />
        </div>
      </div>
    </section>
  );
}
