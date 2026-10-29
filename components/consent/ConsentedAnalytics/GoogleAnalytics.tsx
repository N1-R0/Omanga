"use client";

import Script from "next/script";
import { useEffect } from "react";

import { GA_MEASUREMENT_ID, PLAN_CHECKOUT_URLS, WALLET_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

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
