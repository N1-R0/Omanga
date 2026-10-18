import { SkyHero } from "@/components/sections/SkyHero";
import { heroCardContent } from "@/content/hero.content";

/**
 * [ADDED, 2026-10-18] Home hero: the shared `SkyHero` with the home copy.
 * The layout started here and moved to `SkyHero` when every photo hero
 * adopted it.
 */
export function HeroCard({ headingId }: { headingId: string }) {
  const { heading, intro, actions } = heroCardContent;

  return (
    <SkyHero
      headingId={headingId}
      heading={heading}
      intro={intro}
      actions={actions}
    />
  );
}
