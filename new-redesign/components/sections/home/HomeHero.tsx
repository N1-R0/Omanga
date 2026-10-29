import Image from "next/image";

import { WALLET_URL } from "@/config/site";
import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { homeHero } from "@/new-redesign/content/home.content";

/**
 * 1 · Hero (img 1 layout): header over it, centred headline, one filled action.
 *
 * Background (owner, 2026-10-25): a still sky photo, after the owner's Finara
 * reference. [CHANGED, 2026-10-29] Now an airplane wing at sunset (see
 * homeHero.photo); the fill below is its top sky blue. It replaces the moving
 * crimson fabric (HeroFabric), which the owner no longer wanted. The sky's
 * deep blue carries white text; the section fills with the sky's own blue
 * until the photo loads, so nothing flashes.
 *
 * Primary action (owner, 2026-10-21): the `inverse` button, white with a
 * near-black label (17.3:1), as on Miyagami.
 *
 * No converter (owner, 2026-10-25): it covered the face in the photo, so it
 * left the hero. It now lives in the phone of section 3 (HomeRates).
 *
 * Exactly one screen, full width (owner, 2026-10-21): `h-svh` (svh, so mobile
 * browser bars don't hide content). The text sits at the top, in the open sky
 * under the 76px header, and the portrait fills the lower half, as in the
 * reference. The top gap shrinks with the viewport height (clamp on vh).
 */
export function HomeHero() {
  const { title, sub, primary, secondary, photo } = homeHero;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex h-svh min-h-fit w-full bg-[#3f5c98] text-text-inverse"
    >
      <Image
        src={photo.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: photo.position }}
      />

      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(24px,6vh,72px))] text-center">
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
      </div>
    </section>
  );
}
