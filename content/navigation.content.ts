import { WALLET_URL, WHATSAPP_URL } from "@/config/site";
import type { NavIconName } from "@/components/layout/NavIcon";
import { href } from "@/config/routes";

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
        {
          heading: "Payments",
          links: [
            { label: "Multi-currency wallet", href: href("/payments/multi-currency-wallet"), text: "A wallet for each currency", icon: "wallet" },
            { label: "Send money", href: href("/payments/send-money"), text: "Pay any Nigerian bank account", icon: "plane" },
            { label: "Mobile money", href: href("/payments/mobile-money"), text: "Send across Africa", icon: "globe" },
          ],
        },
        { heading: "Rates", links: [{ label: "Exchange rates", href: href("/rates"), text: "Pounds, dollars and Canadian dollars to naira", icon: "rate" }] },
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
            { label: "Health cover in Nigeria", href: href("/insurance"), text: "Health insurance for your trip", icon: "shield" },
            { label: "Compare plans", href: href("/insurance/plans"), text: "Silver, Gold and Diamond from $50", icon: "tag" },
            { label: "Policy terms", href: href("/insurance/policy-terms"), text: "What is covered and how to claim", icon: "list" },
          ],
        },
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
            { label: "Safety and trust", href: href("/safety"), text: "How we keep you and your money safe", icon: "lock" },
          ],
        },
      ],
    },
    {
      label: "Help",
      feature: {
        title: "Help and FAQs",
        text: "Answers about your wallet, transfers, rates and health cover.",
        href: href("/help"),
        image: { src: "/photos/nav/wallet-phone.jpg", alt: "Woman smiling at her phone" },
      },
      columns: [
        {
          heading: "Help",
          links: [
            { label: "Help and FAQs", href: href("/help"), text: "Find an answer by topic", icon: "book" },
            { label: "Contact us", href: href("/contact"), text: "WhatsApp, email or visit the office", icon: "chat" },
            { label: "Complaints", href: href("/complaints-procedure"), text: "How we handle a complaint", icon: "info" },
          ],
        },
      ],
    },
  ] as NavItem[],
  login: { label: "Log in", href: WALLET_URL },
  cta: { label: "Open your free wallet", href: WALLET_URL },
  featuredLabel: "Featured",
  whatsapp: { label: "Chat on WhatsApp", href: WHATSAPP_URL },
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;
