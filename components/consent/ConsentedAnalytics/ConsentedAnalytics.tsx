"use client";

import dynamic from "next/dynamic";

import { ConsentGate } from "@/components/consent/ConsentGate";

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
 * Vercel Speed Insights, behind the analytics gate.
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
 * `@vercel/analytics` is a dependency of this project and is deliberately NOT
 * mounted here or anywhere. It was installed and never used. Mounting it would
 * add page-view tracking nobody asked for, and this task is not the place to
 * introduce a tracker. Either wire it in behind this same gate as a deliberate
 * decision, or drop it from `package.json` — leaving it installed and unmounted
 * is the only option that is merely untidy rather than wrong.
 */
export function ConsentedAnalytics() {
  return (
    <ConsentGate category="analytics">
      <SpeedInsights />
    </ConsentGate>
  );
}
