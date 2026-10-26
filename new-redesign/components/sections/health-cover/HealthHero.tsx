import { href } from "@/new-redesign/config/routes";
import Image from "next/image";

import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { Button } from "@/new-redesign/components/ui/Button";
import { healthHero } from "@/new-redesign/content/health-cover.content";

/**
 * 1 · Insurance hero (owner, 2026-10-23): the Payments hero's layout, so the
 * two product pages read as a pair. The grey page, everything centred: the
 * H1, the sub, one primary action, then a photo box at the same sizes (600px
 * tall, 440 below 768). Owner, 2026-10-26: the photo is a deep blue mountain
 * range, a sibling of the Payments hero's ridges; it replaced the moving
 * crimson fabric.
 *
 * The box holds no phone: it plays the how-cover-works film instead
 * (owner's storyboard, 2026-10-23).
 */
export function HealthHero() {
  const { title, sub, primary, scene, photo } = healthHero;

  return (
    <section aria-labelledby="health-hero-title" className="bg-bg">
      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(48px,9vh,112px))] text-center">
        <h1 id="health-hero-title" className="type-h1">
          {title.map((line) => (
            <span key={line} className="block text-balance">
              {line}
            </span>
          ))}
        </h1>
        <p className="type-p1 mt-5 max-w-[520px] text-text-secondary">{sub}</p>

        <div className="mt-8">
          <Button href={href(primary.path)}>
            {primary.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        </div>

        {/* The stage, as on the wallet hero, with the how-cover-works film over
            the fabric. The film keeps its 1080 × 600 frame at the box's full
            height and is centred, so narrow boxes crop its empty sides, not
            the card (the card is 456 wide, inside the 468 a 375 phone shows). */}
        <div className="relative isolate mt-14 h-[440px] w-full overflow-hidden rounded-sm md:mt-16 md:h-[600px]">
          <Image src={photo.src} alt="" fill priority sizes="(min-width: 1112px) 1080px, 100vw" className="-z-10 object-cover" style={{ objectPosition: photo.position }} />
          <FeatureLottie
            scene={scene}
            active
            className="absolute inset-y-0 left-1/2 aspect-[1080/600] h-full -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
