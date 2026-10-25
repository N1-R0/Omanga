/**
 * Insurance `/insurance` (was `/health-cover`). Structure: research-and-page-structure.md § 6.3.
 * Sections are built one at a time, hero first (2026-10-23).
 *
 * Still open: exclusions, waiting period, age limits, pre-existing
 * conditions, what hospital categories A, B and C mean, and named hospitals
 * (§ 8.4). Nothing here states them.
 */

/**
 * 1 · Hero (owner, 2026-10-23): the wallet hero's layout. Centred H1, sub,
 * one filled action, then the crimson fabric box. The visual inside the box
 * is planned next, so the box is empty for now.
 *
 * The H1 is the live page's SEO heading (keyword pass 2026-10-18), not the
 * plan's "Health cover for your trip to Nigeria". The sub restates approved
 * facts: Phillips HMO, from $50 a month, Nigeria only, hospital care,
 * diagnostics and emergency evacuation.
 */
export const healthHero = {
  title: ["Travel health insurance", "for your trip to Nigeria"],
  sub: "Short-term cover from Phillips HMO while you're in Nigeria, from $50 a month. Hospital care, diagnostics and emergency evacuation included.",
  // Owner, 2026-10-23: was "Compare health plans" (the site-wide label).
  primary: { label: "Get insurance plan", path: "/insurance/plans" },
  /**
   * How cover works, as one 20s loop (Jitter "Omanga · Health cover hero",
   * owner's storyboard 2026-10-23): pick Gold, checkout, payment confirmed,
   * then the dashboard with the ID card. Transparent, so it plays over the
   * box's live fabric. Reduced motion holds frame 864 (14.4s, the dashboard).
   */
  scene: { src: "/lottie/health-cover/how-it-works.json", stillFrame: 864 },
} as const;

/**
 * 2 · What this is and isn't (owner wireframe, 2026-10-23). Fixes the audit's
 * search-intent mismatch: people looking for travel insurance out of Nigeria
 * land here. The "is" lines and the first "isn't" line are approved site copy
 * (Nigeria only, monthly with no commitment, Phillips HMO's own network, the
 * FAQ's "works outside Nigeria" answer). The flights/luggage line and the
 * entry-requirement line were confirmed by the owner on 2026-10-23.
 */
export const healthScope = {
  eyebrow: "What this is",
  title: "Health cover for your time in Nigeria",
  sub: "Short-term cover from Phillips HMO, paid monthly for the months you're there.",
  // Owner, 2026-10-23: a button under the header.
  action: { label: "Compare insurance plans", path: "/insurance/plans" },
  is: {
    title: "What it is",
    items: [
      { title: "Hospital care in Nigeria", text: "Admission, diagnostics and emergency evacuation while you're in the country." },
      { title: "Monthly, for the months you're there", text: "No commitment. Cancel any time." },
      { title: "Provided by Phillips HMO", text: "Care runs through Phillips HMO's own hospital network." },
    ],
  },
  isnt: {
    title: "What it isn't",
    items: [
      { title: "Cover outside Nigeria", text: "Your wallet works in 50+ African countries, but your health cover doesn't." },
      { title: "Travel insurance", text: "It doesn't cover flights, luggage or cancelled trips." },
      { title: "A visa or entry requirement", text: "You don't need it to enter Nigeria. It's there for your health while you stay." },
    ],
  },
} as const;
