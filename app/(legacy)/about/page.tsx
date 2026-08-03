import type { Metadata } from "next";

import PageHero from "../_components/PageHero";

/**
 * Stub route.
 *
 * The CEO-approved navigation is Home · Insurance · Payment · About · Contact,
 * but no About page exists. This route exists so that link resolves instead of
 * 404ing, per the rule that stub routes exist for every internal link.
 *
 * It carries no content, because no About copy is approved. Writing some here
 * would be exactly the invention the project rules forbid — an unapproved
 * claim on a payments and insurance page.
 *
 * Noindexed while it is thin. Remove `robots` and build the page properly once
 * copy is signed off; it should be rebuilt in `(redesign)`, not extended here.
 */

export const metadata: Metadata = {
  title: "About — Omanga",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  // "About" is the approved nav label, so it is the one string available to
  // use here without inventing copy.
  return <PageHero title="About" />;
}
