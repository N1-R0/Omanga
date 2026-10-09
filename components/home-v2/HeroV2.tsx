import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/Button";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import type { Object3D as ObjectName } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

import { HeroPlanPicker } from "./HeroPlanPicker";
import { HeroWallet } from "./HeroWallet";
import { Object3D } from "./Object3D";

/**
 * Hero, take 2: modelled on wise.com (2026-10-09, on request).
 *
 * A blush band holds a huge, heavy, uppercase statement and one button. Below
 * it two tall product cards overlap the band's bottom edge, the way Wise's three
 * value cards do, and each card ends in a working widget that rises from its
 * foot: the wallet's accounts for Payments, the plan picker for Insurance.
 *
 * The headline is Kantumruy Pro at 700, its heaviest weight. Wise sets theirs at
 * 900 in a custom face; matching that weight is part of the typography decision
 * still to come, so the size and tracking do the work here for now.
 *
 * The band ends partway down the cards: `BAND_OVERLAP` is subtracted from the
 * band's bottom padding and from the card row's top margin in one place.
 */
const BAND_OVERLAP = "clamp(9rem,16vw,15rem)";

type CardProps = {
  surface: string;
  title: string;
  body: string;
  link: { label: string; href: string };
  object: ObjectName;
  objectDelay: number;
  children: ReactNode;
};

function HeroCard({ surface, title, body, link, object, objectDelay, children }: CardProps) {
  return (
    <article
      className={cx(
        "relative flex min-h-full flex-col gap-fluid-5 overflow-hidden rounded-md px-fluid-5 pt-fluid-6 text-on-dark",
        surface,
      )}
    >
      <Object3D
        name={object}
        size={180}
        float
        delay={objectDelay}
        rotate={10}
        className="absolute right-[4%] top-[3%] w-[clamp(5rem,9vw,8.5rem)]"
      />
      <div className="flex flex-col gap-fluid-2 pr-[clamp(5rem,9vw,8.5rem)]">
        <h2 className="font-sans text-h4">{title}</h2>
        <p className="font-sans text-main text-on-dark/80">{body}</p>
        <Link
          href={link.href}
          className="inline-flex items-center gap-fluid-1 self-start font-sans text-main underline underline-offset-4 focus-ring"
        >
          {link.label}
          <ArrowRight size="sm" />
        </Link>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  );
}

export function HeroV2() {
  const { heading, intro, primary, payments, insurance } = homeV2Content.hero;

  return (
    <section aria-labelledby={HOME_V2_IDS.hero} className="relative text-ink">
      <div
        className="bg-blush"
        style={{ paddingBottom: BAND_OVERLAP }}
      >
        <div className="page-gutter mx-auto flex max-w-content flex-col items-center gap-fluid-5 pt-fluid-8 pb-fluid-7 text-center">
          <h1
            id={HOME_V2_IDS.hero}
            className="max-w-[14ch] font-sans text-[clamp(3rem,1.6rem+6.4vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em] text-brand-deep text-balance"
          >
            {heading}
          </h1>
          <p className="font-sans text-large text-ink measure-narrow">{intro}</p>
          <Button as="link" href={primary.href} isExternal variant="primary" tone="light">
            {primary.label}
          </Button>
        </div>
      </div>

      <div
        className="page-gutter mx-auto grid max-w-content gap-fluid-4 pb-fluid-6 tablet:grid-cols-2"
        style={{ marginTop: `calc(-1 * ${BAND_OVERLAP})` }}
      >
        <HeroCard
          surface="bg-[linear-gradient(160deg,var(--color-brand)_0%,var(--color-brand-deep)_100%)]"
          title={payments.title}
          body={payments.body}
          link={payments.link}
          object="coin-stack"
          objectDelay={0}
        >
          <HeroWallet content={payments} />
        </HeroCard>

        <HeroCard
          surface="bg-ink"
          title={insurance.title}
          body={insurance.body}
          link={insurance.link}
          object="insurance-kit"
          objectDelay={1.4}
        >
          <HeroPlanPicker content={insurance} />
        </HeroCard>
      </div>
    </section>
  );
}
