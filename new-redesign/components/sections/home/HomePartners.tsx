import Image from "next/image";

import { homePartners } from "@/new-redesign/content/home.content";

export function HomePartners() {
  const { label, logos } = homePartners;

  return (
    <section id="partners" aria-labelledby="partners-label" className="bg-bg py-8 md:py-10">
      <div className="container-page flex flex-col items-center gap-5 text-center">
        <p id="partners-label" className="type-p2 text-text-secondary">
          {label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-14">
          {logos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                style={{ ["--logo-h" as string]: `${logo.display}px` }}
                className="h-[calc(var(--logo-h)*0.85)] w-auto opacity-60 mix-blend-multiply grayscale transition-[filter,opacity] duration-[var(--duration-base)] ease-standard hover:opacity-100 hover:grayscale-0 md:h-(--logo-h)"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
