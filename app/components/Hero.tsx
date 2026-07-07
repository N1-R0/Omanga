import Image from "next/image";
import heroPhoto from "@/public/hero.png";
import { PAYMENTS_URL } from "../lib/links";

export default function Hero() {
  return (
    <section className="relative -mt-20 overflow-hidden">
      <div className="relative flex min-h-[760px] w-full flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroPhoto}
            alt="View of a sunset over Africa from an airplane window"
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,4,6,0) 0%, rgba(8,4,6,0.85) 100%)",
          }}
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
          <span
            className="hero-in rounded-full bg-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur"
            style={{ animationDelay: "0ms" }}
          >
            Trusted by Travelers to Africa
          </span>

          <h1
            className="hero-in text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Your Seamless Gateway to
            <br className="hidden sm:block" /> African Adventures
          </h1>

          <p
            className="hero-in max-w-xl text-balance text-base text-white/85 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Powering seamless travel across{" "}
            <span className="font-semibold text-white">
              52 African countries
            </span>{" "}
            with instant insurance and multi-currency payments.
          </p>

          <div
            className="hero-in mt-2 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href={PAYMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
            >
              Explore Payment Solutions
            </a>
            <a
              href="/insurance"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-white/10 active:scale-95"
            >
              Get Holiday Insurance
            </a>
          </div>

          <div
            className="hero-in mt-8 flex items-center gap-3"
            style={{ animationDelay: "480ms" }}
          >
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((seed) => (
                <span
                  key={seed}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/30 bg-white/20 text-[10px] font-semibold text-white backdrop-blur"
                >
                  {seed}
                </span>
              ))}
            </div>
            <span className="text-sm text-white/85">
              Insurance active in under 5 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
