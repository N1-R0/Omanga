import type { ImageAsset } from "@/types/content.types";

/**
 * The Insurance page's full-bleed photographic band.
 *
 * One asset, no strings but the alt — which is still user-facing copy, so it
 * lives here rather than in the component.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The band is not in the content spec.
 *
 * `Omanga-Insurance-Page-Content-Spec` runs Header → Hero → three cards →
 * Plans → Coverage → Why → Proof → CTA → Footer, and its § 0.1 inventory maps
 * ten slots to ten. There is no image band between the hero and the cards, and
 * § 13 § Constraint check claims "no new sections invented". Added on
 * instruction, mirroring the Get Started page. Because it carries no copy it
 * contradicts no approved string, but the page's section order now differs from
 * the spec's, and § 11.2's heading hierarchy is numbered against that order.
 *
 * The spec does allow for a hero photograph — § 2 § Design note discusses a
 * background image and its scrim — so a photograph on this page is anticipated;
 * it is only this position for it that is undocumented.
 *
 * ---------------------------------------------------------------------------
 * [QUESTION] The photograph is an advisory scene, not a travel one.
 *
 * It shows a couple across a desk from an advisor with paperwork — the visual
 * language of signing a policy, not of travelling under one. Spec § 4 states the
 * page's imagery direction as "travellers, not hospital corridors", and the same
 * reasoning applies a section earlier: the hero above it promises cover "sorted
 * before you fly", and a contract-signing photograph illustrates the admin
 * rather than the trip.
 *
 * It is a real improvement on the Get Started band in the one respect
 * `project-context.md` § Design philosophy names — this is Black African
 * photography, where that band's is a European bar scene. Shipped as supplied.
 * Raised for design, not resolved.
 *
 * [RENAMED] Supplied as a 148-character stock filename. Renamed to
 * `insurance-consultation.jpg` per coding-guidelines.md § File naming and
 * § Image optimization, which requires assets be renamed on import. Nothing
 * referenced the old name.
 *
 * At 3687 × 2499 and 1.8MB the source is within range of its largest rendered
 * size, unlike the Get Started band's 27MB original. No re-export needed.
 */

/**
 * `alt` is deliberately empty.
 *
 * The band is atmosphere between two text sections. It carries no text and
 * conveys nothing a screen-reader user needs in order to act, so an empty alt
 * is a statement rather than an omission.
 *
 * If the photograph is replaced with one that carries an argument — a traveller
 * in an identifiable place — it becomes content and wants a descriptive alt.
 * That alt is user-facing copy and would have to come through the copy document.
 */
export const insuranceImageContent: ImageAsset = {
  src: "/insurance-consultation.jpg",
  alt: "",
  width: 3687,
  height: 2499,
} as const;
