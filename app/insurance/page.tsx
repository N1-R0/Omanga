import type { Metadata } from "next";
import { ArrowUpRight, Stethoscope, Video, Globe, Zap } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import InsuranceCardGraphic from "../components/InsuranceCardGraphic";

export const metadata: Metadata = {
  title: "Insurance — Omanga",
  description:
    "Short-term health cover with top Nigerian providers. Silver, Gold, and Diamond plans to fit your budget.",
};

const BENEFITS = [
  {
    icon: Stethoscope,
    title: "24/7 emergency assistance",
    description: "Round-the-clock support whenever you need medical help.",
  },
  {
    icon: Video,
    title: "Telemedicine",
    description: "Virtual consultations with licensed doctors, anywhere.",
  },
  {
    icon: Globe,
    title: "Roaming coverage",
    description: "Protection that follows you across all 52 African countries.",
  },
  {
    icon: Zap,
    title: "Fast claims activation",
    description: "Your plan is active and ready to use in under 5 minutes.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Holiday Insurance Plans"
        title="Short-term health cover with top Nigerian providers."
        description="Silver, Gold, or Diamond — choose a plan to match your trip and your budget, so you can explore Africa with complete peace of mind."
      >
        <a
          href="/plans"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-maroon-dark active:scale-95"
        >
          View Plans &amp; Pricing
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </PageHero>

      <section className="bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <InsuranceCardGraphic className="mx-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Why travel with Omanga cover?
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 100}>
                <div className="hover-lift h-full rounded-2xl border border-black/10 bg-white p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mauve text-maroon">
                    <benefit.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-black">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/60">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <a
              href="/plans"
              className="inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-black/85 active:scale-95"
            >
              Compare Plans &amp; Pricing
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
