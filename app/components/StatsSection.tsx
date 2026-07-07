import Reveal from "./Reveal";

const STATS = [
  {
    value: "52+",
    description:
      "African countries served, from Algiers to Cape Town — one account, one card, one set of rates.",
  },
  {
    value: "24/7",
    description:
      "Emergency assistance and travel support, whenever you need it.",
  },
  {
    value: "3",
    description: "Coverage tiers — Silver, Gold and Diamond — to fit every trip.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-maroon-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Omanga by the numbers
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for Africa, at scale.
            </h2>
            <p className="max-w-sm text-sm text-white/60">
              The infrastructure behind every seamless journey from payments
              to protection.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Live coverage</span>
                </p>
                <p className="mt-6 text-5xl font-semibold text-white sm:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm text-white/60">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
