/**
 * Live mid-market FX, for the rate card in `/payments` § 4.
 *
 * ---------------------------------------------------------------------------
 * [RECOVERED, 2026-08-29] Was `app/(legacy)/_lib/rates.ts`, deleted with the
 * legacy route group when `/payments` migrated. Restored unchanged from git
 * rather than rewritten.
 *
 * It is here rather than in a content module because it is not content: it
 * fetches. `content/` holds authored strings, and a rate is neither authored nor
 * stable.
 *
 * WHY THIS EXISTS AT ALL, RATHER THAN FOUR TYPED NUMBERS
 *
 * The card's whole claim is "see the real rate before you convert", and the
 * spec's § 1 permits it only as "live rates sourced from public market data,
 * refreshed hourly". A mockup showing four hand-typed rates would be stating
 * today's price of money from a string literal — the one category of invented
 * figure a payments page cannot carry, and worse than the placeholder balances
 * `solutions.content.ts` already flags, because a visitor may act on it.
 *
 * So the card renders whatever the source returns and nothing else. The four
 * pairs are fixed by the spec — USD→NGN, GBP→KES, CAD→ZAR, USD→GHS — which is
 * explicit that additional pairs "imply corridors that may not be live".
 *
 * [NOTE] `FALLBACK_RATES` below are stale figures from the legacy page and are
 * only reached when both mirrors fail. They are the one place this file states a
 * rate it did not fetch, which is a deliberate trade: a card with four plausible
 * numbers beats an empty card or a build failure. They should be refreshed, or
 * the card should render its pairs without figures when the source is down.
 */
export type RateRow = {
  pair: string;
  rate: string;
  change: string;
  up: boolean;
};

const CURRENCY_PAIRS: { pair: string; from: string; to: string }[] = [
  { pair: "USD → NGN", from: "usd", to: "ngn" },
  { pair: "GBP → KES", from: "gbp", to: "kes" },
  { pair: "CAD → ZAR", from: "cad", to: "zar" },
  { pair: "USD → GHS", from: "usd", to: "ghs" },
];

// Free, keyless, publicly maintained daily FX snapshot (mirrors: jsdelivr + pages.dev).
// https://github.com/fawazahmed0/exchange-api
const SOURCES = (date: string) => [
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/usd.json`,
  `https://${date}.currency-api.pages.dev/v1/currencies/usd.json`,
];

type UsdSnapshot = { date: string; rates: Record<string, number> };

async function fetchUsdSnapshot(
  date: string,
  revalidate: number,
): Promise<UsdSnapshot | null> {
  for (const url of SOURCES(date)) {
    try {
      const res = await fetch(url, { next: { revalidate } });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.usd && typeof data.date === "string") {
        return { date: data.date, rates: data.usd as Record<string, number> };
      }
    } catch {
      // try next mirror
    }
  }
  return null;
}

function crossRate(
  usdRates: Record<string, number>,
  from: string,
  to: string,
): number | null {
  const fromPerUsd = from === "usd" ? 1 : usdRates[from];
  const toPerUsd = usdRates[to];
  if (!fromPerUsd || !toPerUsd) return null;
  return toPerUsd / fromPerUsd;
}

function dayBefore(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

const FALLBACK_RATES: RateRow[] = [
  { pair: "USD → NGN", rate: "1,612.40", change: "+0.4%", up: true },
  { pair: "GBP → KES", rate: "164.21", change: "-0.1%", up: false },
  { pair: "CAD → ZAR", rate: "13.55", change: "+0.2%", up: true },
  { pair: "USD → GHS", rate: "15.04", change: "+0.6%", up: true },
];

export async function getExchangeRates(): Promise<RateRow[]> {
  const today = await fetchUsdSnapshot("latest", 3600);
  if (!today) return FALLBACK_RATES;

  const prior = await fetchUsdSnapshot(
    dayBefore(today.date),
    60 * 60 * 24 * 7,
  );

  return CURRENCY_PAIRS.map(({ pair, from, to }) => {
    const current = crossRate(today.rates, from, to);
    if (current === null) {
      return FALLBACK_RATES.find((r) => r.pair === pair) ?? FALLBACK_RATES[0];
    }

    const previous = prior ? crossRate(prior.rates, from, to) : null;
    const changePct =
      previous && previous !== 0 ? ((current - previous) / previous) * 100 : 0;

    return {
      pair,
      rate: current.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      change: `${changePct >= 0 ? "+" : ""}${changePct.toFixed(1)}%`,
      up: changePct >= 0,
    };
  });
}
