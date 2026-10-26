import { WALLET_URL, WHATSAPP_URL } from "@/config/site";
import type { NavIconName } from "@/new-redesign/components/layout/NavIcon";
import { href } from "@/new-redesign/config/routes";

/**
 * Global header. Destinations LOCKED 2026-10-25 (new-redesign/doc/
 * sitemap-v2.md § C): Payments and Insurance are the product menus (owner's
 * naming), then Guides and Company. Layout after wise.com (owner, 2026-10-21):
 * tabs beside the logo, Help, Log in and the primary action on the right, and
 * each tab opening a panel.
 *
 * [CHANGED, 2026-10-26] Owner: the panel follows Ramp's menu. Each link is
 * an icon tile, its name and a one-line description, in labelled groups,
 * with the featured photo card in a grey column on the right. The mobile
 * sheet stays text only. Descriptions restate approved facts only.
 *
 * The primary action is "Open your free wallet" to the web wallet, per v2. It
 * replaces "Download", which pointed at an app row for an app that isn't in
 * the stores yet; store links come back once the native app ships.
 *
 * Links use sitemap-v2 paths; `href()` sends pages not yet rebuilt to the
 * page that is live today (new-redesign/config/routes.ts).
 */
export type NavLink = { label: string; href: string; text: string; icon: NavIconName };
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
        { heading: "Payments", links: [{ label: "Payments overview", href: href("/payments"), text: "Hold, convert and pay in naira", icon: "wallet" }] },
        {
          heading: "Rates",
          links: [
            { label: "Pounds to naira", href: href("/rates/pounds-to-naira"), text: "GBP to NGN", icon: "rate" },
            { label: "Dollars to naira", href: href("/rates/dollars-to-naira"), text: "USD to NGN", icon: "rate" },
            { label: "Canadian dollars to naira", href: href("/rates/canadian-dollars-to-naira"), text: "CAD to NGN", icon: "rate" },
          ],
        },
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
            { label: "Insurance overview", href: href("/insurance"), text: "Health insurance for your trip", icon: "shield" },
            { label: "Claims", href: href("/insurance/get-care"), text: "How to make a claim", icon: "care" },
          ],
        },
        { heading: "Pricing", links: [{ label: "Plans and prices", href: href("/insurance/plans"), text: "Silver, Gold and Diamond from $50", icon: "tag" }] },
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
            { label: "About Omanga", href: href("/about"), text: "Who we are and who provides what", icon: "info" },
            { label: "Is Omanga safe?", href: href("/safety"), text: "How we keep you and your money safe", icon: "lock" },
          ],
        },
      ],
    },
  ] as NavItem[],
  help: { label: "Help", href: href("/help") },
  login: { label: "Log in", href: WALLET_URL },
  cta: { label: "Open your free wallet", href: WALLET_URL },
  featuredLabel: "Featured",
  whatsapp: { label: "Chat on WhatsApp", href: WHATSAPP_URL },
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;
