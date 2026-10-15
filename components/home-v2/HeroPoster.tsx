import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { heroPosterContent } from "@/content/hero.content";

/**
 * Home hero, Revolut layout (mobbin section e936d541; owner pick 2026-10-15).
 *
 * A full-bleed photo (a woman with her arms up under deep blue sky);
 * the h1 in the site's display role (Geist 500, Revolut's type style), sentence
 * case at the owner's request rather than Revolut's capitals; a short line and
 * white actions with ink labels. Revolut's glass phone panel was built and
 * removed on request.
 *
 * It starts under the fixed header (`-mt-header pt-header`), which goes
 * transparent over it on the home page, so the photo runs to the top edge.
 *
 * Exactly one screen tall (`h-svh`), with everything — headline, line and
 * both actions — in the open sky at the top, so nothing needs a scroll, as on
 * Revolut. A soft top gradient keeps white type readable on bright sky without dulling
 * the photo.
 */
export function HeroPoster({ headingId }: { headingId: string }) {
  const { heading, intro, actions, image } = heroPosterContent;

  return (
    <section
      aria-labelledby={headingId}
      className="focus-ring-on-dark relative isolate -mt-header flex h-svh min-h-[36rem] flex-col overflow-hidden bg-[#004058] pt-header text-on-dark"
    >
      {/*
        On small screens the photo starts 32% down so her raised hand clears
        the actions. On desktop it starts at the top (owner: shifting it lost
        the feel), and the copy sits tighter under the header instead. The gap above is the photo's own top-edge sky
        (sampled: dark corners, lighter centre) and the photo's top edge fades
        into it, so there is no seam.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#001e30,#004058_50%,#002c3c)]"
      />
      <div className="absolute inset-0 top-[32%] -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_12%)] desktop:top-0 desktop:[mask-image:none]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_0%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-3/5 bg-gradient-to-b from-black/30 to-transparent"
      />

      <Container>
        <div className="flex flex-col gap-fluid-3 pt-fluid-6 desktop:pt-fluid-5">
          <h1
            id={headingId}
            className="max-w-[14ch] text-display text-balance"
          >
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
        </div>
      </Container>
    </section>
  );
}
