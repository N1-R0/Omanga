import type { Metadata } from "next";

import { contactFaqContent } from "@/content/page-faqs.content";

import { ContactHero } from "@/components/sections/ContactHero";
import { ContactInformation } from "@/components/sections/ContactInformation";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  CONTACT_HERO_HEADING_ID,
  contactHeroContent,
} from "@/content/contact-hero.content";
import {
  CONTACT_INFORMATION_HEADING_ID,
  contactInformationContent,
} from "@/content/contact-information.content";
import {
  CONTACT_ENQUIRY_PARAM,
  CONTACT_OPTIONS_HEADING_ID,
  contactOptionsContent,
} from "@/content/contact-options.content";
import { buildPageGraph } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";

const contactMeta: PageMetaContent = {
  title: "Contact Omanga: Wallet and Health Cover Help",
  description:
    "Contact Omanga about your wallet, health cover in Nigeria, a claim or a partnership. Email info@omanga.biz or chat with us on WhatsApp.",
  path: "/contact",
};

export const metadata: Metadata = buildPageMetadata(contactMeta);

const CONTACT_PATH = "/contact";

export default async function ContactPreviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params[CONTACT_ENQUIRY_PARAM];

  const selectedEnquiry = Array.isArray(raw) ? raw[0] : raw;

  return (
    <>
      <JsonLd
        graph={buildPageGraph(contactMeta, {
          crumb: "Contact",
          pageType: "ContactPage",
        })}
      />

      <ContactHero
        content={contactHeroContent}
        options={contactOptionsContent}
        headingId={CONTACT_HERO_HEADING_ID}
        optionsHeadingId={CONTACT_OPTIONS_HEADING_ID}
        selectedEnquiry={selectedEnquiry}
        path={CONTACT_PATH}
      />

      <ContactInformation
        content={contactInformationContent}
        headingId={CONTACT_INFORMATION_HEADING_ID}
      />
      <FaqSection {...oldPageFaq(contactFaqContent.heading, OLD_PAGE_FAQ_SUB.contact, contactFaqContent.items)} />

      <HomeFinalCta />
    </>
  );
}
