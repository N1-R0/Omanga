import { INSTAGRAM_URL, SITE_TAGLINE } from "@/config/site";
import { href } from "@/config/routes";

export type FooterLink = { label: string; href: string; external?: boolean };

export const footer = {
  homeLabel: "Omanga home",
  blurb: "A multi-currency wallet that works in 50+ African countries, and health insurance for your trip to Nigeria.",
  columns: [
    {
      heading: "Payments",
      links: [
        { label: "Multi-currency wallet", href: href("/payments/multi-currency-wallet") },
        { label: "Send money", href: href("/payments/send-money") },
        { label: "Mobile money", href: href("/payments/mobile-money") },
        { label: "Exchange rates", href: href("/rates") },
      ],
    },
    {
      heading: "Insurance",
      links: [
        { label: "Health cover in Nigeria", href: href("/insurance") },
        { label: "Plans", href: href("/insurance/plans") },
        { label: "Policy terms", href: href("/insurance/policy-terms") },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Omanga", href: href("/about") },
        { label: "Safety and trust", href: href("/safety") },
        { label: "Guides", href: href("/guides") },
      ],
    },
    {
      heading: "Help",
      links: [
        { label: "Help and FAQs", href: href("/help") },
        { label: "Contact us", href: href("/contact") },
        { label: "Complaints", href: href("/complaints-procedure") },
      ],
    },
  ] satisfies ReadonlyArray<{ heading: string; links: FooterLink[] }>,
  legal: [
    { label: "Terms of use", href: href("/terms-of-use") },
    { label: "Privacy policy", href: href("/privacy-policy") },
    { label: "Cookie policy", href: href("/cookie-policy") },
  ] satisfies FooterLink[],
  whosWho:
    "Omanga Integrated Destination Services is a Lagos company. Fuspay Technologies, a microfinance bank licensed by the Central Bank of Nigeria, runs the wallet. Phillips HMO provides the health cover and is regulated by the National Insurance Commission (NAICOM). Card payments are processed by Paystack. Omanga is not a bank or the insurer.",
  copyright: (year: number) => `© ${year} ${SITE_TAGLINE}`,
  socials: [{ label: "Instagram", href: INSTAGRAM_URL }],
} as const;
