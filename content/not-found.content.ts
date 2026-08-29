import type { CallToAction, LinkTarget, PageMetaContent } from "@/types/content.types";

/**
 * Copy for the 404 page.
 *
 * [NOT APPROVED COPY] Drafted rather than transcribed — the approved copy
 * document has no 404 page in it, because the site had no 404 page. Plain,
 * short, and free of the "Oops! Looks like you're lost" register, which reads
 * badly to someone who has just failed to reach a policy document or a claims
 * page on an insurance site.
 *
 * The recovery links are every public route that actually exists. That list is
 * deliberately hand-written rather than derived from the sitemap: this is the
 * page a visitor reaches after a link failed them, so it should show the few
 * destinations most likely to be what they wanted, not a site index.
 */

export const notFoundContent: {
  readonly meta: PageMetaContent;
  readonly eyebrow: string;
  readonly heading: string;
  readonly intro: string;
  readonly action: CallToAction;
  readonly linksHeading: string;
  readonly links: readonly LinkTarget[];
} = {
  meta: {
    title: "Page not found | Omanga",
    description:
      "This page does not exist. Find Omanga's travel payments, holiday insurance plans, and contact details.",
    path: "/404",
  },
  eyebrow: "404",
  heading: "We couldn't find that page",
  intro:
    "The page you were looking for may have moved, or the link that brought you here may be out of date. Everything below still works.",
  action: {
    label: "Go to the homepage",
    href: "/",
    emphasis: "primary",
  },
  linksHeading: "You might be looking for",
  links: [
    { label: "Holiday insurance for Africa", href: "/insurance" },
    { label: "Insurance plans and prices", href: "/plans" },
    { label: "Omanga Payment Solutions", href: "/payments" },
    { label: "Get started", href: "/get-started" },
    { label: "About Omanga", href: "/about" },
    { label: "Contact us", href: "/contact" },
  ],
} as const;
