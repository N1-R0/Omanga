import { getNgnRates } from "@/lib/rates";
import type { LinkTarget } from "@/types/content.types";

import { ConverterWidget } from "./ConverterWidget";

/**
 * The Payment Solutions card's visual: a working currency check in the style
 * of wise.com's converter (owner request, 2026-10-15). Server half: fetches
 * today's naira rates so the first paint already shows a real figure; the
 * widget itself is a small client island.
 *
 * Replaces the drawn `PaymentsVisual` app panel on the home page.
 */
export async function ConverterVisual({ action }: { action: LinkTarget }) {
  const { rates, date } = await getNgnRates();
  return <ConverterWidget rates={rates} date={date} action={action} />;
}
