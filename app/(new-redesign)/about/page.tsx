import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { aboutFaqContent } from "@/content/page-faqs.content";
import { buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { AboutHero } from "@/new-redesign/components/sections/about/AboutHero";
import { AboutOffice } from "@/new-redesign/components/sections/about/AboutOffice";
import { AboutMissionVision } from "@/new-redesign/components/sections/about/AboutMissionVision";
import { AboutStory } from "@/new-redesign/components/sections/about/AboutStory";
import { AboutValues } from "@/new-redesign/components/sections/about/AboutValues";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";
import { aboutMeta } from "@/new-redesign/content/seo.content";

/**
 * About at /about (sitemap-v2.md § About Omanga), rebuilt in the new design
 * section by section (owner, 2026-10-26 to 27; picks in design.md). Copy
 * lives in new-redesign/content/about.content.ts; the FAQ keeps its questions
 * from content/page-faqs.content.ts.
 */
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
