import { homeRates } from "@/new-redesign/content/home.content";

export const converter = {
  youSend: "You convert",
  youGet: "You get",
  swapLabel: "Swap currencies",
  rateNote: (date: string) => `Reference rate, ${date}`,
  cta: "Open your free wallet",
  currencies: homeRates.currencies,
  picker: homeRates.picker,
} as const;
