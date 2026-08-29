"use client";

import type { ReactNode } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";
import type { ConsentCategory } from "@/lib/consent";

/**
 * Renders its children only while the given category is consented to.
 *
 * This is the enforcement point. Not a flag consulted by a script that has
 * already loaded, and not a "do not track" signal passed to a vendor who
 * promises to respect it — the gated component is simply not in the tree, so its
 * `<script>` is never inserted and its network request is never made. Withdrawing
 * consent unmounts it, and a script tag that React removes cannot fire again.
 *
 * The two properties that make this trustworthy:
 *
 *   closed by default   `hasConsent` returns false until the stored record has
 *                       been read, so there is no window between first paint and
 *                       hydration in which anything gated could run.
 *   reactive            it re-renders on every consent change, in this tab and
 *                       in others, so a decision made in the preferences dialog
 *                       takes effect immediately rather than on next navigation.
 *
 * Anything that talks to a third party, or writes to the device beyond what
 * `necessary` covers, belongs inside one of these. Adding such a thing outside a
 * gate is the bug this component exists to make obvious.
 */

export type ConsentGateProps = {
  category: ConsentCategory;
  children: ReactNode;
  /** Shown in place of the children while consent is absent. */
  fallback?: ReactNode;
};

export function ConsentGate({
  category,
  children,
  fallback = null,
}: ConsentGateProps) {
  const { hasConsent } = useConsent();

  return <>{hasConsent(category) ? children : fallback}</>;
}
