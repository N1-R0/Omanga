import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { CallToAction } from "@/types/content.types";

/**
 * [ADDED, 2026-10-18] The site's sky hero, owner wireframe "Desktop - 2": a
 * full-width photo band with the h1, line and actions left-aligned on the
 * content column. First built for home (as `HeroCard`, rounded, then made
 * full width with a semibold h1 the same day), then made shared on the
 * owner's instruction: "all the pages hero section should be like this ...
 * they should all use this image". Replaces `PhotoHero` (About, Insurance)
 * and `PaymentsHeroCentered` (Payments). Contact and Get Started have no
 * photo hero and are unchanged.
 *
 * One photo everywhere: the woman with crossed arms against blue sky
 * (Unsplash ZYV7qZNe5wY, public/insurance-hero-sky.jpg), so it is fixed here
 * rather than passed in. On desktop it sits in the right part of the band
 * with a faded left edge so the subject clears the copy.
 *
 * [DEVIATION] The wireframe draws the copy in black on a grey placeholder.
 * On this mid-blue sky black falls short of comfortable contrast, so the copy
 * is white with a soft left-side shade, and the actions use the photo
 * treatments (white fill, outline on 10% white) the site uses over photos.
 *
 * Mobile: the band is taller, the copy sits at the top and the photo sits
 * under it, anchored to the subject.
 *
 * It runs up under the fixed header (`-mt-header pt-header`); the bar is
 * transparent over it at the top of the page on every path in
 * `PHOTO_HERO_PATHS` (Header.tsx), so add a page there when it adopts this.
 */
const SKY_PHOTO = { src: "/insurance-hero-sky.jpg", alt: "" } as const;

export type SkyHeroProps = {
  headingId: string;
  heading: string;
  intro: string;
  actions: readonly CallToAction[];
  /** Optional small qualifier under the actions ("No commitment..."). */
  helper?: string;
};

export function SkyHero({
  headingId,
  heading,
  intro,
  actions,
  helper,
}: SkyHeroProps) {
  const image = SKY_PHOTO;

  return (
    <section
      aria-labelledby={headingId}
      className="focus-ring-on-dark relative isolate -mt-header flex min-h-[42rem] pt-header overflow-hidden text-on-dark desktop:min-h-[clamp(32rem,72svh,46rem)] desktop:items-center"
    >
      {/*
            Sky sampled from the photo's left edge (top #3a6d98, bottom
            #6da3c5), so the faded edge of the photo box has no seam.
          */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(to_bottom,#3a6d98,#4c84b3_50%,#6da3c5)]"
      />
      {/*
            Mobile: the photo fills the card under the copy. Desktop: it sits
            in the right half with a faded left edge, so the subject clears the
            left-aligned copy (cover-cropping the whole card cannot move her:
            the photo already spans the card's width).
          */}
      <div className="absolute inset-x-0 top-[50%] bottom-0 -z-20 [mask-image:linear-gradient(to_bottom,transparent,black_12%)] desktop:inset-y-0 desktop:top-0 desktop:left-auto desktop:w-[50%] desktop:[mask-image:linear-gradient(to_right,transparent,black_22%)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_30%]"
        />
      </div>
      {/* Keeps white type readable on the sky without dulling the subject. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 to-transparent to-50% desktop:bg-gradient-to-r desktop:from-black/20 desktop:to-40%"
      />

      <Container>
        <div className="flex flex-col gap-fluid-4 py-fluid-8 desktop:max-w-[54%]">
          <h1
            id={headingId}
            className="max-w-[17ch] font-heading text-[clamp(2.75rem,1.9rem+3.6vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-balance"
          >
            {heading}
          </h1>
          <p className="max-w-[34ch] font-sans text-main text-on-dark/90">
            {intro}
          </p>
          <div className="flex flex-wrap gap-fluid-2 pt-fluid-1">
            {actions.map((action) => (
              <Button
                key={action.label}
                as="link"
                href={action.href}
                isExternal={action.isExternal}
                variant={action.emphasis === "primary" ? "white" : "secondary"}
                tone="brand"
              >
                {action.label}
              </Button>
            ))}
          </div>
          {helper ? (
            <p className="font-sans text-small text-on-dark/80">{helper}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
