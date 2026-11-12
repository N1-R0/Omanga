import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { aboutFaqContent } from "@/content/page-faqs.content";
import { buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutOffice } from "@/components/sections/about/AboutOffice";
import { AboutMissionVision } from "@/components/sections/about/AboutMissionVision";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { HomeFinalCta } from "@/components/sections/home/HomeFinalCta";
import { FaqSection } from "@/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/content/old-pages.content";
import { aboutMeta } from "@/content/seo.content";

export const metadata: Metadata = buildPageMetadata(aboutMeta);

export default function AboutPage() {
  return (
    <>
      <JsonLd graph={buildPageGraph(aboutMeta, { crumb: "About", pageType: "AboutPage" })} />
      <AboutHero headingId="about-hero-heading" />
      <AboutStory headingId="about-story-heading" />
      <AboutMissionVision headingId="about-mission-vision-heading" />
      <AboutValues headingId="about-values-heading" />
      <AboutOffice headingId="about-office-heading" />
      <FaqSection {...oldPageFaq(aboutFaqContent.heading, OLD_PAGE_FAQ_SUB.about, aboutFaqContent.items)} />
      <HomeFinalCta />
    </>
  );
}
