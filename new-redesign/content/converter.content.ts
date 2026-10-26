import { homeRates } from "@/new-redesign/content/home.content";

/**
 * The compact converter (rate pages' hero, 2026-10-26; Payments next).
 * Currencies, flags and picker strings are the home converter's.
 */
export const converter = {
  youSend: "You convert",
  youGet: "You get",
  swapLabel: "Swap currencies",
  rateNote: (date: string) => `Reference rate, ${date}`,
  cta: "Open your free wallet",
  currencies: homeRates.currencies,
  picker: homeRates.picker,
} as const;
