import { INSTAGRAM_URL, WALLET_URL, WHATSAPP_URL } from "@/config/site";
import { href } from "@/new-redesign/config/routes";

/**
 * Global footer, LOCKED in new-redesign/doc/research-and-page-structure.md § 5.
 *
 * Held back until the owner confirms them (§ 8.3, § 8.6):
 *   - "Licences" in Transparency, and the legal entity, RC number and address
 *     in the who's-who block. Nothing is invented in their place.
 *   - Store links in the app row. The app isn't in the stores yet, so the row
 *     says so and offers the web wallet. This row is `#download`, where the
 *     header's Download button lands.
 */
export type FooterLink = { label: string; href: string; external?: boolean };

export const footer = {
  homeLabel: "Omanga home",
  blurb: "A multi-currency wallet that works in 50+ African countries, and short-term health cover for your trip to Nigeria.",
  app: {
    id: "download",
    title: "Get the Omanga app",
    text: "The app isn't in the stores yet. Until then, open your wallet on the web.",
    action: { label: "Open the web wallet", href: WALLET_URL },
  },
  columns: [
    {
      heading: "Wallet",
      links: [
        { label: "About the wallet", href: href("/wallet") },
        { label: "Countries", href: href("/wallet/countries") },
        { label: "Exchange rates", href: href("/rates") },
      ],
    },
    {
      heading: "Health cover",
      links: [
        { label: "About health cover", href: href("/health-cover") },
        { label: "Plans and prices", href: href("/health-cover/plans") },
        { label: "Get care now", href: href("/get-care") },
      ],
    },
    {
      heading: "Travel",
      links: [
        { label: "Going home", href: href("/going-home") },
        { label: "Visiting Africa", href: href("/visiting-africa") },
        { label: "Business trips", href: href("/business-trips") },
        { label: "How Omanga works", href: href("/how-it-works") },
        { label: "Guides", href: href("/guides") },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: href("/about") },
        { label: "Safety", href: href("/safety") },
        { label: "Help", href: href("/help") },
        { label: "Complaints", href: href("/legal/complaints") },
        { label: "Chat on WhatsApp", href: WHATSAPP_URL, external: true },
      ],
    },
    {
      heading: "Transparency",
      links: [
        { label: "Fees", href: href("/wallet#faq") },
        { label: "Who provides what", href: href("/safety#who-provides-what") },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: href("/legal/privacy") },
        { label: "Terms", href: href("/legal/terms") },
        { label: "Policy terms", href: href("/legal/policy-terms") },
        { label: "Cookies", href: href("/legal/cookies") },
      ],
    },
  ] satisfies ReadonlyArray<{ heading: string; links: FooterLink[] }>,
  whosWho: "Health cover is provided by Phillips HMO. Omanga is not the insurer.",
  copyright: (year: number) => `© ${year} Omanga. All rights reserved.`,
  socials: [{ label: "Instagram", href: INSTAGRAM_URL }],
} as const;
