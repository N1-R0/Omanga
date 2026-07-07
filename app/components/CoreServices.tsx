import { ShieldCheck, Clock, Globe2, Stethoscope, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import InsuranceCardGraphic from "./InsuranceCardGraphic";

const FEATURES = [
  {
    icon: ShieldCheck,
    label: "Silver, Gold & Diamond tiers to fit any budget",
  },
  {
    icon: Clock,
    label: "Active in under 5 minutes, no paperwork",
  },
  {
    icon: Globe2,
    label: "Valid across 52 African countries",
  },
  {
    icon: Stethoscope,
    label: "Backed by top Nigerian healthcare providers",
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="overflow-hidden bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="inline-block rounded-full bg-mauve px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-maroon">
            Travel Insurance
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Holiday insurance built for the way{" "}
            <span className="text-maroon">Africa travels</span>.
          </h2>
          <p className="mt-4 max-w-lg text-base text-black/60">
            Short-term health cover with top Nigerian providers. Activate a
            plan in minutes and explore the continent with complete peace of
            mind.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.label} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mauve text-maroon">
                  <feature.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="pt-1.5 text-sm text-black/70">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/insurance"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Get Your Insurance
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="/plans"
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-105 hover:bg-mauve/60 active:scale-95"
            >
              Compare Plans
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-sm">
          <div
            className="animate-float-slow"
            style={{ "--float-rotate": "2deg" } as React.CSSProperties}
          >
            <InsuranceCardGraphic />
          </div>

          <div className="absolute -left-8 top-4 hidden w-44 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 lg:block">
            <p className="flex items-center gap-2 text-xs font-medium text-black/50">
              <Clock className="h-4 w-4 text-maroon" /> Activation time
            </p>
            <p className="mt-1 text-lg font-semibold text-black">
              &lt; 5 minutes
            </p>
          </div>

          <div className="absolute -right-6 bottom-6 hidden w-44 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 lg:block">
            <p className="flex items-center gap-2 text-xs font-medium text-black/50">
              <Globe2 className="h-4 w-4 text-maroon" /> Coverage
            </p>
            <p className="mt-1 text-lg font-semibold text-black">
              52 countries
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
