import Link from "next/link";

import { FeatureScreen } from "@/new-redesign/components/sections/home/FeatureScreen";
import { Button } from "@/new-redesign/components/ui/Button";
import { Card } from "@/new-redesign/components/ui/Card";
import type { FeatureScreen as Screen } from "@/new-redesign/content/home.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export function CtaPanel({
  id,
  eyebrow,
  title,
  text,
  primary,
  secondary,
  texture,
  screen,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  texture: string;
  screen: Screen;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y">
      <div className="container-page grid gap-4 lg:grid-cols-[58fr_42fr]">
        <Card className="flex flex-col justify-center p-6 md:p-10">
          <div className="flex max-w-[400px] flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="type-p2 inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
                {eyebrow}
              </p>
              <h2 id={`${id}-title`} className="type-h2">
                {title}
              </h2>
              <p className="type-p1 text-text-secondary">{text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button href={primary.href} external={primary.external}>
                {primary.label}
              </Button>
              {secondary ? (
                <Link href={secondary.href} className="type-p3 text-accent-text hover:underline">
                  {secondary.label} →
                </Link>
              ) : null}
            </div>
          </div>
        </Card>

        <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-sm lg:h-[360px]">
          <Photo src={texture} alt="" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          <div className="glass relative w-[72%] max-w-[280px]">
            <FeatureScreen screen={screen} gbpToNgn={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
