import { WHATSAPP_URL } from "@/config/site";
import type { CallToAction, Eyebrow } from "@/types/content.types";

const INTRO =
  "Ask about the wallet, health cover in Nigeria, a partnership or anything else, and we’ll pass your message to the right person.";

const SUPPORT_BODY =
  "Chat with us on WhatsApp about a payment, your wallet or a health cover claim.";

export type SupportBlockContent = {
  readonly heading: string;
  readonly body: string;
  readonly action: CallToAction;
};

export type ContactHeroContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly support: SupportBlockContent;
};

export const contactHeroContent: ContactHeroContent = {
  eyebrow: "Contact",
  heading: "Contact Omanga's support team",
  intro: INTRO,
  support: {
    heading: "Already using Omanga?",
    body: SUPPORT_BODY,
    action: {
      label: "Chat on WhatsApp",
      href: WHATSAPP_URL,
      isExternal: true,
      emphasis: "primary",
    },
  },
} as const;

export const CONTACT_HERO_HEADING_ID = "contact-hero-heading" as const;
