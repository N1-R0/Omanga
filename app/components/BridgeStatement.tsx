import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function BridgeStatement() {
  return (
    <section className="bg-cream px-6 py-24 lg:px-10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mx-auto inline-block rounded-full bg-mauve px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-maroon">
          Our Mission
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
          We bridge complex financial systems{" "}
          <span className="text-black/35">
            and the vibrant African travel ecosystem.
          </span>
        </h2>
      </Reveal>

      <Reveal
        delay={120}
        className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-maroon-950"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col justify-center gap-5 p-10 sm:p-14">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/70">
              The Promise
            </p>
            <p className="max-w-md text-xl leading-relaxed text-white/90 sm:text-2xl">
              Payments, identity, and{" "}
              <span className="font-semibold text-white">protection</span> —
              unified in one place, so you can move through Africa without
              friction.
            </p>
            <a
              href="/contact"
              className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-maroon-950 transition-transform duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
            >
              Talk to Us
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-maroon/50 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-mauve/20 blur-3xl"
            />
            <div
              aria-hidden
              className="animate-float-slow absolute inset-0 m-auto h-40 w-40 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{ "--float-rotate": "12deg" } as React.CSSProperties}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
