"use client";

import dynamic from "next/dynamic";

import { ConsentGate } from "@/components/consent/ConsentGate";

import { GoogleAnalytics } from "./GoogleAnalytics";

const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then((module) => module.SpeedInsights),
  { ssr: false },
);

export function ConsentedAnalytics() {
  return (
    <ConsentGate category="analytics">
      <SpeedInsights />
      <GoogleAnalytics />
    </ConsentGate>
  );
}
