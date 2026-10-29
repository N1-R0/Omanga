"use client";

import type { ReactNode } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";
import type { ConsentCategory } from "@/lib/consent";

export type ConsentGateProps = {
  category: ConsentCategory;
  children: ReactNode;
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
