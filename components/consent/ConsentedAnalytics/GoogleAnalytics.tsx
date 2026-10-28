"use client";

import Script from "next/script";
import { useEffect } from "react";

import { GA_MEASUREMENT_ID, PLAN_CHECKOUT_URLS, WALLET_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Google Analytics 4 via `gtag.js`, written with `next/script` rather than
 * `@next/third-parties` to avoid a dependency for two script tags.
 *
 * Only ever rendered inside the analytics `ConsentGate`, so the tag is not
 * requested until a visitor allows analytics.
 *
 * Client-side navigations are counted by GA4's enhanced measurement ("page
 * changes based on browser history events", on by default for the stream), so
 * no route listener is needed here.
 *
 * WITHDRAWAL. Once `gtag.js` has run it cannot be unloaded. When consent is
 * withdrawn this component unmounts, and the cleanup sets Google's documented
 * `ga-disable-<id>` flag, which stops every further hit from this page. The flag
 * is cleared again on mount, so granting consent later in the same page resumes
 * measurement. The `_ga` cookies already set stay until the visitor clears them;
 * the Cookie Policy says so.
 *
 * ADVERTISING OFF. Google Signals and ad personalisation are switched off in the
 * config call, because the Cookie Policy promises no advertising cookies; with
 * them on, gtag also calls Google's `ads/ga-audiences` endpoint.
 *
 * DEVELOPMENT. Not rendered outside production builds, so local testing does not
 * land in the property's reports.
 */
const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

/**
 * [ADDED, 2026-10-28] Conversion clicks (SEO audit § analytics). One delegated
 * listener classifies a clicked link by its destination, so no CTA component
 * needs its own tracking code and a new CTA is measured as soon as it links
 * somewhere listed here. Event names are documented in lib/analytics.ts.
 */
const PLAN_BY_URL = new Map<string, string>(
  Object.entries(PLAN_CHECKOUT_URLS).map(([plan, url]) => [url, plan]),
);

function onLinkClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return;
  const url = link.href;
  const label = (link.textContent ?? "").trim().slice(0, 80);

  if (url.startsWith(WALLET_URL)) trackEvent("wallet_signup_click", { link_text: label });
  else if (PLAN_BY_URL.has(url)) trackEvent("plan_checkout_click", { plan: PLAN_BY_URL.get(url)!, link_text: label });
  else if (url.startsWith("https://wa.me/")) trackEvent("whatsapp_click", { link_text: label });
  else if (url.startsWith("mailto:")) trackEvent("email_click", { link_text: label });
}

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return <GoogleTag />;
}

function GoogleTag() {
  useEffect(() => {
    const flags = window as unknown as Record<string, boolean>;
    flags[DISABLE_FLAG] = false;
    document.addEventListener("click", onLinkClick, { capture: true });

    return () => {
      flags[DISABLE_FLAG] = true;
      document.removeEventListener("click", onLinkClick, { capture: true });
    };
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});`}
      </Script>
    </>
  );
}
