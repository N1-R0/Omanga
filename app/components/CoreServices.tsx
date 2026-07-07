import Image from "next/image";
import { ArrowRight } from "lucide-react";
import cardFront from "@/public/card-front-omanga.png";
import Reveal from "./Reveal";
import InsuranceCardGraphic from "./InsuranceCardGraphic";
import { PAYMENTS_URL } from "../lib/links";

const CARDS = [
  {
    title: "Holiday Insurance Plans",
    description:
      "Short-term health cover with top Nigerian providers. Silver, Gold & Diamond plans to fit your budget.",
    cta: "Get Your Insurance",
    href: "/insurance",
    external: false,
    graphic: <InsuranceCardGraphic />,
  },
  {
    title: "Omanga Payment Solutions",
    description:
      "The Omanga digital wallet provides a global multi-currency wallet system that allows you to hold, manage, send, and receive multiple currencies on a single platform.",
    cta: "Explore Payment Solutions",
    href: PAYMENTS_URL,
    external: true,
    graphic: (
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={cardFront}
          alt="The Omanga holiday payment card"
          className="h-auto w-full"
        />
      </div>
    ),
  },
];

export default function CoreServices() {
  return (
    <section id="services" className="bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mx-auto inline-block rounded-full bg-mauve px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-maroon">
            Our Core Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Everything You Need for African Travel
          </h2>
          <p className="mt-4 text-base text-black/60">
            Combining local expertise with cutting-edge technology to create
            seamless travel experiences across the African continent.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <div className="hover-lift flex h-full flex-col gap-6 rounded-2xl bg-mauve p-8">
                <h3 className="text-xl font-semibold text-maroon-950">
                  {card.title}
                </h3>
                <p className="text-sm text-black/60">{card.description}</p>
                <div
                  className="animate-float-slow mx-auto w-full max-w-xs"
                  style={{ "--float-rotate": "0deg" } as React.CSSProperties}
                >
                  {card.graphic}
                </div>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-maroon underline-offset-4 hover:underline"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
