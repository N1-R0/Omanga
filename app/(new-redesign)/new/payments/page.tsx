import type { Metadata } from "next";

import { WalletHero } from "@/new-redesign/components/sections/wallet/WalletHero";
import { WalletClosing } from "@/new-redesign/components/sections/wallet/WalletClosing";
import { WalletCountries } from "@/new-redesign/components/sections/wallet/WalletCountries";
import { WalletFaq } from "@/new-redesign/components/sections/wallet/WalletFaq";
import { WalletFeatures } from "@/new-redesign/components/sections/wallet/WalletFeatures";
import { WalletLeftover } from "@/new-redesign/components/sections/wallet/WalletLeftover";
import { WalletPayInPerson } from "@/new-redesign/components/sections/wallet/WalletPayInPerson";
import { WalletProof } from "@/new-redesign/components/sections/wallet/WalletProof";
import { WalletRates } from "@/new-redesign/components/sections/wallet/WalletRates";

/**
 * Payments at /new/payments (sitemap-v2.md § C; was /wallet, § 6.2). Sections land one at a time; the
 * hero and the proof strip are built (2026-10-22). Copy lives in new-redesign/content/wallet.content.ts.
 */
export const metadata: Metadata = {
  title: "Payments",
};

export default function PaymentsPage() {
  return (
    <>
      <WalletHero />
      <WalletProof />
      <WalletFeatures />
      <WalletPayInPerson />
      <WalletRates />
      <WalletCountries />
      <WalletLeftover />
      <WalletFaq />
      <WalletClosing />
    </>
  );
}
