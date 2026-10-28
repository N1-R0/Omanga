"use client";

import dynamic from "next/dynamic";

import { ConsentGate } from "@/components/consent/ConsentGate";

import { GoogleAnalytics } from "./GoogleAnalytics";

/**
 * Loaded through `next/dynamic` rather than imported at the top of the file.
 *
 * A static import would put Speed Insights' code into the page bundle, so every
 * visitor — including one who refused analytics — would download it. The gate
 * would still stop it running, which is the part that legally matters, but a
 * visitor who said no would be paying to download a tracker that is then
 * prevented from working.
 *
 * With a dynamic import the chunk is not requested until this component actually
 * renders, which only happens once analytics consent exists. Refuse, and the code
 * is never fetched at all.
 *
 * `ssr: false` because it does nothing on the server and consent cannot be known
 * there.
 */
const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then((module) => module.SpeedInsights),
  { ssr: false },
);

/**
 * Vercel Speed Insights and Google Analytics, behind the analytics gate.
 *
 * This replaces the bare `<SpeedInsights />` that both root layouts mounted
 * unconditionally. That version loaded `/_vercel/speed-insights/script.js` on
 * every page view for every visitor, with no notice and no way to decline —
 * which is what made the site's lack of a consent mechanism a live issue rather
 * than a paperwork one.
 *
 * ---------------------------------------------------------------------------
 * WHAT WAS ACTUALLY AUDITED, SO THIS IS NOT OVERSTATED
 *
 * `@vercel/speed-insights` contains no reference to `document.cookie`,
 * `localStorage`, `sessionStorage` or IndexedDB. It sets no identifier and
 * stores nothing on the device. It collects Core Web Vitals — the timing numbers
 * — with the page path, and the beacon carries an IP address the way any HTTP
 * request does.
 *
 * So the strict ePrivacy trigger for consent, storing or reading something on
 * the visitor's device, is not met. It is gated anyway, for two reasons that do
 * not depend on that reading being wrong: it is still processing that a visitor
 * can reasonably want no part of, and the Cookie Policy promises a working
 * analytics control. A control that governs nothing is worse than no control.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-10-15] `@vercel/analytics` was installed and never mounted;
 * it has been removed from `package.json`. Page-view tracking, if ever wanted,
 * goes behind this same gate as a deliberate decision.
 *
 * [CHANGED, 2026-10-28] That decision was made: Google Analytics 4 now loads
 * here too. Unlike Speed Insights it does set cookies (`_ga`, `_ga_<id>`), so
 * CONSENT_VERSION was bumped and the consent copy, Cookie Policy and Privacy
 * Policy were updated to say so.
 */
export function ConsentedAnalytics() {
  return (
    <ConsentGate category="analytics">
      <SpeedInsights />
      <GoogleAnalytics />
    </ConsentGate>
  );
}
