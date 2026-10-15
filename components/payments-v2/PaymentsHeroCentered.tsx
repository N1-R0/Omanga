import Image from "next/image";

import { ScreenshotPhone } from "@/components/home-v2/StepPhone";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { paymentsPhotoHeroContent } from "@/content/payments-hero.content";

/**
 * [ADDED, 2026-10-15] Payments hero, take 4 (owner request): the home hero's
 * photo in a band at least 75% of the viewport tall, with the heading, intro
 * and actions centred in it. The app's real home screen sits on a phone
 * centred under the copy, its top overlapping the band's lower edge so the
 * product reads as part of the hero.
 *
 * The h1 uses the same `text-display` role as the home hero (`PhotoHero`), so
 * size, weight, line height and tracking match; only the measure is wider
 * (24ch) so the heading sets in two lines on desktop, as does the intro (56ch).
 *
 * The header stays transparent over the band (`/payments` is in
 * `PHOTO_HERO_PATHS`), hence `-mt-header pt-header`.
 */
export function PaymentsHeroCentered({ headingId }: { headingId: string }) {
  const { heading, intro, actions, image } = paymentsPhotoHeroContent;

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate -mt-header pb-fluid-6 desktop:pb-24"
    >
      <div className="focus-ring-on-dark relative flex min-h-[75svh] flex-col justify-center pt-header pb-28 text-on-dark desktop:pb-36">
        {/* The home hero's backdrop and framing, so the two match. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#001e30,#004058_50%,#002c3c)]"
        />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[50%_0%]"
        />
        {/* Keeps white type readable on bright sky without dulling the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-black/10"
        />

        <Container>
          <div className="mx-auto flex flex-col items-center gap-fluid-3 pt-12 text-center desktop:pt-16">
            <h1
              id={headingId}
              className="max-w-[24ch] text-display text-balance"
            >
              {heading}
            </h1>
            <p className="max-w-[56ch] font-sans text-main text-balance text-on-dark/90">
              {intro}
            </p>
            <div className="flex flex-wrap justify-center gap-fluid-2 pt-fluid-1">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  as="link"
                  href={action.href}
                  isExternal={action.isExternal}
                  variant={
                    action.emphasis === "primary" ? "white" : "secondary"
                  }
                  tone="brand"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* The phone straddles the band's lower edge. */}
      <div className="relative -mt-20 flex justify-center px-4 desktop:-mt-28">
        <ScreenshotPhone
          src="/app-screens/home.png"
          className="w-[min(18rem,72vw)]"
        />
      </div>
    </section>
  );
}
