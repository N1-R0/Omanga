import { UserPlus, CreditCard, Globe2, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up & Fund Your Wallet",
    description:
      "Create your Omanga account in minutes and fund your wallet from your home currency (USD, GBP, CAD) with transparent, real-time exchange rates.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Transact Seamlessly",
    description:
      "After opening your Omanga account, enjoy all the payment solution services and select your preferred insurance plan on the platform.",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Explore Africa Confidently",
    description:
      "Use your payment solutions in 52 African countries, access healthcare when needed, and enjoy your African adventure with complete peace of mind.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mx-auto inline-block rounded-full bg-mauve px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-maroon">
            Simple Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            How Omanga Works
          </h2>
          <p className="mt-4 text-base text-black/60">
            Create your Omanga account in minutes and fund your wallet in
            your home currency, utilizing transparent exchange rates in
            real-time.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120} className="relative">
              <div className="hover-lift h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-950 text-white">
                    <step.icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-4xl font-semibold text-black/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  {step.description}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-black/15 lg:block"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
