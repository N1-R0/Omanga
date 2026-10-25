import { WALLET_URL, WHATSAPP_URL } from "@/config/site";
import { href } from "@/new-redesign/config/routes";

/**
 * Global header. Destinations LOCKED 2026-10-25 (new-redesign/doc/
 * sitemap-v2.md § C): Payments and Insurance are the product menus (owner's
 * naming), then Guides and Company. Layout after wise.com (owner, 2026-10-21):
 * tabs beside the logo, Help, Log in and the primary action on the right, and
 * each tab opening a full-width panel with a featured photo card and grouped
 * columns. Panel and sheet links are text only, with no icons.
 *
 * The primary action is "Open your free wallet" to the web wallet, per v2. It
 * replaces "Download", which pointed at an app row for an app that isn't in
 * the stores yet; store links come back once the native app ships.
 *
 * Most destinations don't exist under /new yet; they resolve as pages are
 * built. /insurance/get-care launches only once its facts are confirmed.
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
      label: "Payments",
      feature: {
        title: "Omanga payments",
        text: "Hold, convert and pay across 50+ African countries.",
        href: href("/payments"),
        image: { src: "/photos/nav/wallet-phone.jpg", alt: "Woman smiling at her phone" },
      },
      columns: [
        { heading: "Payments", links: [{ label: "Payments overview", href: href("/payments") }] },
        { heading: "Rates", links: [{ label: "Exchange rates", href: href("/rates") }] },
      ],
    },
    {
      label: "Insurance",
      feature: {
        title: "Insurance",
        text: "Health insurance for your trip to Nigeria, provided by Phillips HMO.",
        href: href("/insurance"),
        image: { src: "/photos/nav/health-doctor.jpg", alt: "Doctor in a white coat, smiling" },
      },
      columns: [
        {
          heading: "Insurance",
          links: [
            { label: "Insurance overview", href: href("/insurance") },
            { label: "Get care and claims", href: href("/insurance/get-care") },
          ],
        },
        { heading: "Pricing", links: [{ label: "Plans and prices", href: href("/insurance/plans") }] },
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
            { label: "About Omanga", href: href("/about") },
            { label: "Is Omanga safe?", href: href("/safety") },
          ],
        },
      ],
    },
  ] as NavItem[],
  help: { label: "Help", href: href("/help") },
  login: { label: "Log in", href: WALLET_URL },
  cta: { label: "Open your free wallet", href: WALLET_URL },
  exploreLabel: "Explore",
  whatsapp: { label: "Chat on WhatsApp", href: WHATSAPP_URL },
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;
