import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { FeaturePage } from "@/components/sections/payments/FeaturePage";
import { multiCurrencyWallet } from "@/content/payments-features.content";

export const metadata: Metadata = buildPageMetadata(multiCurrencyWallet.meta);

export default function MultiCurrencyWalletPage() {
  return <FeaturePage page={multiCurrencyWallet} />;
}
