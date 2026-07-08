import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import sectionInsurance from "@/public/section-insurance.png";

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
            <Image
              src={sectionInsurance}
              alt=""
              fill
              className="object-cover object-center"
            />

            {/* Blend into the card on mobile, where this panel sits below the text */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(24,6,9,1) 0%, rgba(24,6,9,0.55) 22%, rgba(24,6,9,0) 55%)",
              }}
            />

            {/* Blend into the card on desktop, where this panel sits beside the text */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(24,6,9,1) 0%, rgba(24,6,9,0.6) 18%, rgba(24,6,9,0) 45%)",
              }}
            />

            {/* Ground the edges so the image reads as part of the card, not a pasted photo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(24,6,9,0) 65%, rgba(24,6,9,0.55) 100%)",
              }}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
