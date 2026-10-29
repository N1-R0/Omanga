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

export type FundingCurrency = "USD" | "GBP" | "CAD";

export type NgnRates = {
  readonly rates: Readonly<Record<FundingCurrency, number>>;
  readonly date: string | null;
};

const FALLBACK_NGN: NgnRates = {
  rates: { USD: 1612.4, GBP: 2041.3, CAD: 1176.2 },
  date: null,
};

export async function getNgnRates(): Promise<NgnRates> {
  const today = await fetchUsdSnapshot("latest", 3600);
  if (!today) return FALLBACK_NGN;

  const pick = (code: FundingCurrency) =>
    crossRate(today.rates, code.toLowerCase(), "ngn");
  const usd = pick("USD");
  const gbp = pick("GBP");
  const cad = pick("CAD");
  if (usd === null || gbp === null || cad === null) return FALLBACK_NGN;

  return { rates: { USD: usd, GBP: gbp, CAD: cad }, date: today.date };
}

export type MatrixCurrency = FundingCurrency | "NGN";

export function crossMatrix(
  ngn: Readonly<Record<FundingCurrency, number>>,
): Record<MatrixCurrency, Record<MatrixCurrency, number>> {
  const perNgn: Record<MatrixCurrency, number> = { ...ngn, NGN: 1 };
  const codes: MatrixCurrency[] = ["USD", "GBP", "CAD", "NGN"];
  return Object.fromEntries(
    codes.map((from) => [
      from,
      Object.fromEntries(codes.map((to) => [to, perNgn[from] / perNgn[to]])),
    ]),
  ) as Record<MatrixCurrency, Record<MatrixCurrency, number>>;
}

export function formatRateDate(iso: string | null): string | null {
  return iso === null
    ? null
    : new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
}
