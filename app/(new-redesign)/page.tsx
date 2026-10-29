import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { HomeCountries } from "@/new-redesign/components/sections/home/HomeCountries";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";
import { HomeHero } from "@/new-redesign/components/sections/home/HomeHero";
import { HomePartners } from "@/new-redesign/components/sections/home/HomePartners";
import { HomeProducts } from "@/new-redesign/components/sections/home/HomeProducts";
import { HomeSteps } from "@/new-redesign/components/sections/home/HomeSteps";
import { HomeWhy } from "@/new-redesign/components/sections/home/HomeWhy";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { homeFaq, homeSections, type HomeSectionId } from "@/new-redesign/content/home.content";
import { faqItems, homeMeta } from "@/new-redesign/content/seo.content";

export const metadata: Metadata = buildPageMetadata(homeMeta);

const SECTIONS: Record<HomeSectionId, () => React.ReactNode> = {
  hero: HomeHero,
  products: HomeProducts,
  partners: HomePartners,
  steps: HomeSteps,
  "why-omanga": HomeWhy,
  countries: HomeCountries,
  faq: () => <FaqSection {...homeFaq} />,
  "final-cta": HomeFinalCta,
};

export default function HomePage() {
  return (
    <>
      <JsonLd graph={buildPageGraph(homeMeta, { services: ["wallet", "insurance"], nodes: [buildFaqPage(homeMeta, faqItems(homeFaq.items))] })} />
      {homeSections.map((s) => {
        const Section = SECTIONS[s.id];
        return <Section key={s.id} />;
      })}
    </>
  );
}
