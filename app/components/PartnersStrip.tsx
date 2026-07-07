import Image from "next/image";
import phillipsHmoLogo from "@/public/philip-hmo-logo.png";
import fuspayLogo from "@/public/fusepay-logo.png";
import ziraLogo from "@/public/zira-logo.png";
import Reveal from "./Reveal";

const PARTNERS = [
  { name: "phillips.hmo", src: phillipsHmoLogo },
  { name: "fuspay", src: fuspayLogo },
  { name: "zira", src: ziraLogo },
];

export default function PartnersStrip() {
  return (
    <section className="border-b border-black/5 bg-white px-6 py-12 lg:px-10">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-black/40 lg:text-left">
          Trusted by hospitals &amp; partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex h-14 w-40 items-center justify-center rounded-xl border border-black/5 bg-white px-5 py-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                className="h-auto max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
