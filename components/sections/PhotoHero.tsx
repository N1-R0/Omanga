import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { CallToAction } from "@/types/content.types";

/**
 * [ADDED, 2026-10-15] The site's photo hero, lifted out of the home page's
 * `HeroPoster` so every page opens the same way (owner: "the layout for the
 * other pages will be the same as the hero section").
 *
 * One screen tall, a full-bleed sky photo running under the transparent
 * header, and the h1 (display role, Geist), a short line and white pill
 * actions at the top-left in the open sky. Pages differ only in the photo
 * and how it is framed, so those come in as classes:
 *
 * - `backdropClassName` paints the sky behind and around the photo. Sample it
 *   from the photo's own edges so the photo's faded edge has no seam.
 * - `photoClassName` places the photo's box (and any edge mask) inside the
 *   section, per breakpoint, so the subject clears the copy.
 * - `imageClassName` is the `object-position` within that box.
 *
 * The header goes transparent over this hero only on paths listed in
 * `PHOTO_HERO_PATHS` (Header.tsx); add a page there when it adopts this.
 */
export type PhotoHeroProps = {
  headingId: string;
  heading: string;
  intro: string;
  actions: readonly CallToAction[];
  /** Optional small qualifier under the actions ("No commitment…"). */
  helper?: string;
  image: { src: string; alt: string };
  backdropClassName: string;
  photoClassName: string;
  imageClassName: string;
  /** The h1's measure. Defaults to the home page's 14ch. */
  headingClassName?: string;
};

export function PhotoHero({
  headingId,
  heading,
  intro,
  actions,
  helper,
  image,
  backdropClassName,
  photoClassName,
  imageClassName,
  headingClassName = "max-w-[14ch]",
}: PhotoHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="focus-ring-on-dark relative isolate -mt-header flex h-svh min-h-[36rem] flex-col overflow-hidden pt-header text-on-dark"
    >
      <div aria-hidden="true" className={`absolute inset-0 -z-20 ${backdropClassName}`} />
      <div className={`absolute -z-10 ${photoClassName}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${imageClassName}`}
        />
      </div>
      {/* Keeps white type readable on bright sky without dulling the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-3/5 bg-gradient-to-b from-black/30 to-transparent"
      />

      <Container>
        <div className="flex flex-col gap-fluid-3 pt-fluid-6 desktop:pt-fluid-5">
          <h1 id={headingId} className={`${headingClassName} text-display text-balance`}>
            {heading}
          </h1>
          <p className="max-w-[40ch] font-sans text-main text-on-dark/90">{intro}</p>
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
