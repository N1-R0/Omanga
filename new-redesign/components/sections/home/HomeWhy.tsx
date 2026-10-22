import Link from "next/link";

import { NavIcon } from "@/new-redesign/components/layout/NavIcon";
import { Card } from "@/new-redesign/components/ui/Card";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { href } from "@/new-redesign/config/routes";
import { homeWhy } from "@/new-redesign/content/home.content";

/**
 * 6 · Why Omanga (img 5; design system § Icon tiles). Six specific facts as
 * icon tiles in a 3 × 2 grid, then the link to the safety page. Every tile
 * states something confirmed; see the content note for what was cut.
 */
export function HomeWhy() {
  const { eyebrow, title, sub, tiles, link } = homeWhy;

  return (
    <Section id="why-omanga" label={eyebrow}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <ul className="grid grid-gap md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <li key={tile.title}>
            <Card className="flex h-full flex-col gap-6 px-5 py-6">
              <NavIcon name={tile.icon} size="lg" />
              <div className="flex flex-col gap-2">
                <h3 className="type-h3">{tile.title}</h3>
                <p className="type-p2 text-text-secondary">{tile.text}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <Link href={href(link.path)} className="type-p3 mt-6 inline-flex text-accent-text hover:underline">
        {link.label} →
      </Link>
    </Section>
  );
}
