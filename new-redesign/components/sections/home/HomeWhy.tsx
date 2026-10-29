import { NavIcon } from "@/new-redesign/components/layout/NavIcon";
import { Button } from "@/new-redesign/components/ui/Button";
import { Card } from "@/new-redesign/components/ui/Card";
import { href } from "@/new-redesign/config/routes";
import { homeWhy } from "@/new-redesign/content/home.content";

export function HomeWhy() {
  const { eyebrow, title, sub, tiles, link } = homeWhy;

  return (
    <section id="why-omanga" aria-labelledby="why-title" className="section-y bg-bg">
      <div className="container-page">
        <div className="mb-[var(--section-head)] flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[520px] flex-col gap-[var(--head-gap)]">
            <p className="type-p2 inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
            <div className="flex flex-col gap-[var(--head-sub-gap)]">
              <h2 id="why-title" className="type-h2 text-balance">
                {title}
              </h2>
              <p className="type-p1 text-text-secondary">{sub}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Button href={href(link.path)} variant="secondary">
              {link.label} <span aria-hidden className="ml-2">→</span>
            </Button>
          </div>
        </div>

        <ul className="grid gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <li key={tile.title}>
              <Card className="flex h-full min-h-[184px] flex-col justify-between gap-8 p-6 md:min-h-[280px] md:gap-10 md:p-7">
                <span className="text-accent-text">
                  <NavIcon name={tile.icon} size="bare" />
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[26px] leading-[1.1] font-normal tracking-[-0.03em] text-balance md:text-[30px]">{tile.title}</h3>
                  <p className="type-p2 text-text-secondary">{tile.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
