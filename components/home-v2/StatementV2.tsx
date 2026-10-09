import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";

/**
 * B3 · Corner objects, quiet centre (Kastle). The travel objects sit tilted in
 * the four corners and the statement stays small and centred between them.
 * Below tablet the corners would crowd the text, so the objects shrink and
 * tuck further out instead of being removed.
 */
export function StatementV2() {
  const { eyebrow, heading, body } = homeV2Content.statement;

  return (
    <section
      aria-labelledby={HOME_V2_IDS.statement}
      className="relative isolate overflow-hidden bg-surface-light text-ink section-rhythm-loose"
    >
      <Object3D name="airplane" size={260} float rotate={-18} className="absolute -left-[4%] top-[6%] -z-10 w-[clamp(7rem,18vw,16rem)]" />
      <Object3D name="boarding-pass" size={220} float delay={1.6} rotate={14} className="absolute -right-[3%] top-[4%] -z-10 w-[clamp(6rem,15vw,14rem)]" />
      <Object3D name="suitcase" size={220} float delay={0.8} rotate={8} className="absolute -left-[2%] bottom-[2%] -z-10 w-[clamp(6rem,14vw,13rem)]" />
      <Object3D name="passport-stamped" size={240} float delay={2.2} rotate={-12} className="absolute -right-[3%] bottom-[4%] -z-10 w-[clamp(6.5rem,16vw,15rem)]" />

      <div className="page-gutter mx-auto flex max-w-content flex-col items-center gap-fluid-4 py-fluid-8 text-center">
        <p className="rounded-pill border border-border-hairline bg-surface-page px-fluid-3 py-fluid-1 font-sans text-small uppercase tracking-[0.08em] text-secondary">
          {eyebrow}
        </p>
        <h2
          id={HOME_V2_IDS.statement}
          className="max-w-[18ch] font-sans text-h1 text-balance"
        >
          {heading}
        </h2>
        <p className="font-sans text-large text-secondary measure-narrow">
          {body}
        </p>
      </div>
    </section>
  );
}
