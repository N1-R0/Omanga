import { WALLET_URL, WHATSAPP_URL } from "@/config/site";
import { href } from "@/new-redesign/config/routes";

/**
 * Global header. Destinations LOCKED 2026-10-21 (new-redesign/doc/
 * research-and-page-structure.md § 5); layout after wise.com (owner, 2026-10-21):
 * tabs beside the logo, Help, Log in and Download on the right, and each tab
 * opening a full-width panel with a featured photo card and grouped columns.
 *
 * Panel and sheet links are text only, with no icons (owner, 2026-10-21).
 *
 * Two deviations from the locked list, both from the Wise layout:
 *   - "Help" moves out of Company to the right side of the bar (Wise puts it
 *     there). Company keeps About us and Safety. Labels stay unique.
 *   - The header action is "Download" (owner) instead of "Open your free
 *     wallet". Store links are owner question § 8.6; until they exist it points
 *     at the app row on the home page.
 *
 * Most destinations don't exist under /new yet; they resolve as pages are built.
 */
export type NavLink = { label: string; href: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavFeature = { title: string; text: string; href: string; image: { src: string; alt: string } };
export type NavMenu = { label: string; feature: NavFeature; columns: NavColumn[] };
export type NavItem = NavMenu | { label: string; href: string };

export const navigation = {
  homeLabel: "Omanga home",
  landmarkLabel: "Main",
  items: [
    {
      label: "Wallet",
      feature: {
        title: "Omanga wallet",
        text: "Hold, convert and pay across 50+ African countries.",
        href: href("/wallet"),
        image: { src: "/photos/nav/wallet-phone.jpg", alt: "Woman smiling at her phone" },
      },
      columns: [
        {
          heading: "Wallet",
          links: [
            { label: "About the wallet", href: href("/wallet") },
            { label: "Countries", href: href("/wallet/countries") },
          ],
        },
        { heading: "Rates", links: [{ label: "Exchange rates", href: href("/rates") }] },
      ],
    },
    {
      label: "Health cover",
      feature: {
        title: "Health cover",
        text: "Monthly cover in Nigeria. Phillips HMO handles your care.",
        href: href("/health-cover"),
        image: { src: "/photos/nav/health-doctor.jpg", alt: "Doctor in a white coat, smiling" },
      },
      columns: [
        {
          heading: "Cover",
          links: [
            { label: "About health cover", href: href("/health-cover") },
            { label: "Get care now", href: href("/get-care") },
          ],
        },
        { heading: "Pricing", links: [{ label: "Plans and prices", href: href("/health-cover/plans") }] },
      ],
    },
    {
      label: "Travel",
      feature: {
        title: "Travel with Omanga",
        text: "Money and cover sorted before you land.",
        href: href("/how-it-works"),
        image: { src: "/photos/nav/travel-airport.jpg", alt: "Traveller on the phone at an airport" },
      },
      columns: [
        {
          heading: "Your trip",
          links: [
            { label: "Going home", href: href("/going-home") },
            { label: "Visiting Africa", href: href("/visiting-africa") },
            { label: "Business trips", href: href("/business-trips") },
          ],
        },
        { heading: "Learn", links: [{ label: "How Omanga works", href: href("/how-it-works") }] },
      ],
    },
    { label: "Guides", href: href("/guides") },
    {
      label: "Company",
      feature: {
        title: "About Omanga",
        text: "Who we are, who provides what, and how we keep you safe.",
        href: href("/about"),
        image: { src: "/photos/nav/company-lagos.jpg", alt: "Lagos skyline under a blue sky" },
      },
      columns: [
        {
          heading: "Company",
          links: [
            { label: "About us", href: href("/about") },
            { label: "Safety", href: href("/safety") },
          ],
        },
      ],
    },
  ] as NavItem[],
  help: { label: "Help", href: href("/help") },
  /** Owner question § 8.6: whether "Log in" belongs here once the native app ships. */
  login: { label: "Log in", href: WALLET_URL },
  download: { label: "Download", href: `${href("/")}#download` },
  exploreLabel: "Explore",
  whatsapp: { label: "Chat on WhatsApp", href: WHATSAPP_URL },
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;
