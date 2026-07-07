import { Wallet, LineChart, CreditCard } from "lucide-react";
import Reveal from "./Reveal";
import OmangaCardGraphic from "./OmangaCardGraphic";
import { PAYMENTS_URL } from "../lib/links";
import { getExchangeRates } from "../lib/rates";

export default async function TravelConfidence() {
  const rates = await getExchangeRates();

  return (
    <section id="payments" className="bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Travel Africa with confidence.
          </h2>
          <p className="mt-4 text-base text-black/60">
            Bank-grade infrastructure, on-the-ground partners, and software
            designed for the realities of cross-border travel.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Multi-currency wallet card */}
          <Reveal>
            <div className="hover-lift relative h-full overflow-hidden rounded-2xl border border-black/10 bg-cream p-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black/50">
                <Wallet className="h-4 w-4" /> Multi-currency wallet
              </p>
              <h3 className="mt-4 max-w-xs text-xl font-semibold text-black">
                Hold and move money in the currency you need.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
                Fund with USD, GBP or CAD with real-time, transparent
                exchange rates — no hidden fees, no minimums.
                <br />
                <br />
                Mid-market FX on every conversion. Send &amp; receive in 6
                currencies. Free transfers between Omanga accounts.
              </p>
              <a
                href={PAYMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-6 inline-block text-sm font-medium text-black underline-offset-4 hover:underline"
              >
                Open a wallet
              </a>

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-24 w-40"
                style={{
                  backgroundColor: "#8fd6c9",
                  clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                }}
              />
            </div>
          </Reveal>

          {/* Live exchange rates card */}
          <Reveal delay={100}>
            <div className="hover-lift h-full rounded-2xl border border-black/10 bg-cream p-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black/50">
                <LineChart className="h-4 w-4" /> Live exchange rates
              </p>
              <h3 className="mt-4 text-xl font-semibold text-black">
                Real rates. No spread games.
              </h3>
              <p className="mt-4 text-sm text-black/60">
                Sourced from public market data and refreshed hourly.
              </p>

              <div className="mt-6 divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-white">
                {rates.map((row) => (
                  <div
                    key={row.pair}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-black">{row.pair}</span>
                    <span className="text-black/70">{row.rate}</span>
                    <span
                      className={row.up ? "text-emerald-600" : "text-red-500"}
                    >
                      {row.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* One card banner */}
        <Reveal delay={150} className="mt-6">
          <div className="relative overflow-hidden rounded-2xl bg-maroon-950 px-8 py-14 sm:px-16">
            <div className="relative z-10 max-w-sm">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                <CreditCard className="h-4 w-4" /> Your African payment card
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                One card, accepted across 52 African countries.
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Spend directly from your wallet balance, online or in-person.
                No FX surprises at checkout.
              </p>
              <a
                href={PAYMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
              >
                Omanga Payment Solutions
              </a>
            </div>

            <div
              className="animate-float-slow pointer-events-none absolute -right-10 top-1/2 hidden w-72 -translate-y-1/2 sm:block"
              style={{ "--float-rotate": "6deg" } as React.CSSProperties}
            >
              <OmangaCardGraphic />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
