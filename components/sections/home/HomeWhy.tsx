import Link from "next/link";

import { NavIcon } from "@/components/layout/NavIcon";
import { href } from "@/config/routes";
import { homeWhy } from "@/content/home.content";

export function HomeWhy() {
  const { title, sub, tiles, link } = homeWhy;

  return (
    <section id="why-omanga" aria-labelledby="why-title" className="section-y bg-surface">
      <div className="container-page">
        <h2 id="why-title" className="type-h2 mx-auto mb-[var(--section-head)] max-w-[640px] text-center text-balance">
          {title}
        </h2>

        <ul className="grid gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <li key={tile.title} className="flex h-full flex-col items-center rounded-xs bg-surface-muted px-6 py-12 text-center md:px-10 md:py-16">
              <span className="text-text">
                <NavIcon name={tile.icon} size="xl" />
              </span>
              <h3 className="mt-8 text-[24px] leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-[26px]">{tile.title}</h3>
              <p className="type-p1 mt-4 max-w-[320px] text-text-secondary">{tile.text}</p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 flex max-w-[460px] flex-col items-center gap-4 text-center md:mt-16">
          <p className="type-p2 text-text-secondary">{sub}</p>
          <Link href={href(link.path)} className="type-p3 text-text underline underline-offset-4 hover:text-accent-text">
            {link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
