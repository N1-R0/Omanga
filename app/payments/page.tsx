import type { Metadata } from "next";
import Image from "next/image";
import { Wallet, LineChart, CreditCard, Check, ArrowUpRight } from "lucide-react";
import cardFront from "@/public/card-front-omanga.png";
import cardBack from "@/public/card-back-omanga.png";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { PAYMENTS_URL } from "../lib/links";
import { getExchangeRates } from "../lib/rates";

export const metadata: Metadata = {
  title: "Payments — Omanga",
  description:
    "Hold, manage, send, and receive multiple currencies on one platform with the Omanga digital wallet and card.",
};

const FEATURES = [
  "Mid-market FX on every conversion",
  "Send & receive in 6 currencies",
  "Free transfers between Omanga accounts",
  "No FX surprises at checkout, online or in-person",
];

export default async function PaymentsPage() {
  const rates = await getExchangeRates();

  return (
    <>
      <PageHero
        eyebrow="Omanga Payment Solutions"
        title="A seamless digital wallet built for travelers across Africa."
        description="The Omanga digital wallet provides a global multi-currency wallet system that allows you to hold, manage, send, and receive multiple currencies on a single platform."
      />

      <section className="bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:flex-row sm:justify-center">
          <Reveal>
            <div className="w-72 -rotate-6 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:rotate-0">
              <Image
                src={cardFront}
                alt="Front of the Omanga holiday payment card"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="w-72 rotate-6 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:rotate-0">
              <Image
                src={cardBack}
                alt="Back of the Omanga holiday payment card"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="hover-lift h-full rounded-2xl border border-black/10 bg-white p-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black/50">
                <Wallet className="h-4 w-4" /> Multi-currency wallet
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-black">
                Hold and move money in the currency you need.
              </h2>
              <p className="mt-4 text-sm text-black/60">
                Fund with USD, GBP or CAD with real-time, transparent
                exchange rates — no hidden fees, no minimums.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-black/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={PAYMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-maroon-dark active:scale-95"
              >
                Open a wallet
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="hover-lift h-full rounded-2xl border border-black/10 bg-white p-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black/50">
                <LineChart className="h-4 w-4" /> Live exchange rates
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-black">
                Real rates. No spread games.
              </h2>
              <p className="mt-4 text-sm text-black/60">
                Sourced from public market data and refreshed hourly.
              </p>

              <div className="mt-6 divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-cream">
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

        <Reveal delay={150} className="mx-auto mt-6 max-w-7xl">
          <div className="rounded-2xl bg-maroon-950 px-8 py-14 text-center sm:px-16">
            <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              <CreditCard className="h-4 w-4" /> Your African payment card
            </p>
            <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
              One card, accepted across 52 African countries.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
              Spend directly from your wallet balance, online or in-person.
              No FX surprises at checkout.
            </p>
            <a
              href={PAYMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
            >
              Get Your Omanga Card
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
