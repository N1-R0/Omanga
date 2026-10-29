import { INSTAGRAM_URL, WHATSAPP_URL } from "@/config/site";
import { href } from "@/new-redesign/config/routes";

export type FooterLink = { label: string; href: string; external?: boolean };

export const footer = {
  homeLabel: "Omanga home",
  blurb: "A multi-currency wallet that works in 50+ African countries, and health insurance for your trip to Nigeria.",
  columns: [
    {
      heading: "Payments",
      links: [
        { label: "Payments overview", href: href("/payments") },
        { label: "Pounds to naira", href: href("/rates/pounds-to-naira") },
        { label: "Dollars to naira", href: href("/rates/dollars-to-naira") },
        { label: "Canadian dollars to naira", href: href("/rates/canadian-dollars-to-naira") },
      ],
    },
    {
      heading: "Insurance",
      links: [
        { label: "Insurance overview", href: href("/insurance") },
        { label: "Plans and prices", href: href("/insurance/plans") },
        { label: "Claims", href: href("/insurance/get-care") },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Omanga", href: href("/about") },
        { label: "Is Omanga safe?", href: href("/safety") },
        { label: "Guides", href: href("/guides") },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help and contact", href: href("/help") },
        { label: "Chat on WhatsApp", href: WHATSAPP_URL, external: true },
        { label: "Complaints", href: href("/complaints-procedure") },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms of use", href: href("/terms-of-use") },
        { label: "Privacy policy", href: href("/privacy-policy") },
        { label: "Insurance policy terms", href: href("/policy-terms") },
        { label: "Cookie policy", href: href("/cookie-policy") },
      ],
    },
  ] satisfies ReadonlyArray<{ heading: string; links: FooterLink[] }>,
  whosWho: "Insurance plans are provided by Phillips HMO. Omanga is not the insurer.",
  copyright: (year: number) => `© ${year} Omanga. All rights reserved.`,
  socials: [{ label: "Instagram", href: INSTAGRAM_URL }],
} as const;
