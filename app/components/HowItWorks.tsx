import { UserPlus, CreditCard, Globe2 } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: UserPlus,
    title: "Sign Up & Fund Your Wallet",
    description:
      "Create your Omanga account in minutes and fund your wallet from your home currency (USD, GBP, CAD) with transparent, real-time exchange rates.",
  },
  {
    icon: CreditCard,
    title: "Transact Seamlessly",
    description:
      "After opening your Omanga account, enjoy all the payment solution services and select your preferred insurance plan on the platform.",
  },
  {
    icon: Globe2,
    title: "Explore Africa Confidently",
    description:
      "Use your payment solutions in 52 African countries, access healthcare when needed, and enjoy your African adventure with complete peace of mind.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-maroon-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/80">
            Simple Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How Omanga Works
          </h2>
          <p className="mt-4 text-base text-white/60">
            Create your Omanga account in minutes and fund your wallet in
            your home currency, utilizing transparent exchange rates in
            real-time.
          </p>
        </Reveal>

        <div className="relative mt-14 flex flex-col gap-12">
          <div
            aria-hidden
            className="absolute bottom-6 left-6 top-6 hidden w-px bg-white/15 sm:block"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <div className="relative flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-maroon-950">
                  <step.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-white/60">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
