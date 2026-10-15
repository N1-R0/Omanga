import { PhotoHero } from "@/components/sections/PhotoHero";
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
 *
 * [CHANGED, 2026-10-15] The markup now lives in `PhotoHero`, shared with the
 * other pages; this passes the home photo and its framing.
 */
export function HeroPoster({ headingId }: { headingId: string }) {
  const { heading, intro, actions, image } = heroPosterContent;

  return (
    <PhotoHero
      headingId={headingId}
      heading={heading}
      intro={intro}
      actions={actions}
      image={image}
      backdropClassName="bg-[linear-gradient(to_right,#001e30,#004058_50%,#002c3c)]"
      photoClassName="inset-0 top-[32%] [mask-image:linear-gradient(to_bottom,transparent,black_12%)] desktop:top-0 desktop:[mask-image:none]"
      imageClassName="object-[50%_0%]"
    />
  );
}
