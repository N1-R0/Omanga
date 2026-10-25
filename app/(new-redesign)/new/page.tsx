import type { Metadata } from "next";

import { HomeCountries } from "@/new-redesign/components/sections/home/HomeCountries";
import { HomeFaq } from "@/new-redesign/components/sections/home/HomeFaq";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";
import { HomeHero } from "@/new-redesign/components/sections/home/HomeHero";
import { HomePartners } from "@/new-redesign/components/sections/home/HomePartners";
import { HomeProducts } from "@/new-redesign/components/sections/home/HomeProducts";
import { HomeSteps } from "@/new-redesign/components/sections/home/HomeSteps";
import { HomeWhy } from "@/new-redesign/components/sections/home/HomeWhy";
import { homeSections, type HomeSectionId } from "@/new-redesign/content/home.content";

/**
 * New home page at /new. Pages hold section composition only; copy lives in
 * new-redesign/content. Sections render in the locked order from
 * home.content.ts; the Record makes a section missing from SECTIONS a type
 * error.
 */
export const metadata: Metadata = {
  title: "Home",
};

const SECTIONS: Record<HomeSectionId, () => React.ReactNode> = {
  hero: HomeHero,
  products: HomeProducts,
  partners: HomePartners,
  steps: HomeSteps,
  "why-omanga": HomeWhy,
  countries: HomeCountries,
  faq: HomeFaq,
  "final-cta": HomeFinalCta,
};

export default function NewHomePage() {
  return (
    <>
      {homeSections.map((s) => {
        const Section = SECTIONS[s.id];
        return <Section key={s.id} />;
      })}
    </>
  );
}
