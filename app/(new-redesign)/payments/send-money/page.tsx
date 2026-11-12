import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { FeaturePage } from "@/new-redesign/components/sections/payments/FeaturePage";
import { sendMoney } from "@/new-redesign/content/payments-features.content";

export const metadata: Metadata = buildPageMetadata(sendMoney.meta);

export default function SendMoneyPage() {
  return <FeaturePage page={sendMoney} />;
}
