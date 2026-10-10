import { Button } from "@/components/ui/Button";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * S4 · Connected circles (Wise, "How sending money works"). Three objects on
 * blush discs joined by a dotted line, which is the sequence made visible.
 * An ordered list, because the order is the content. The line is desktop-only:
 * stacked, the list order already carries the sequence.
 */
export function StepsV2() {
  const { heading, intro, items, action } = homeV2Content.steps;

  return (
    <V2Section labelledBy={HOME_V2_IDS.steps}>
      <div className="flex flex-col items-center gap-fluid-7 text-center">
        <div className="flex flex-col items-center gap-fluid-3">
          <h2 id={HOME_V2_IDS.steps} className="font-sans text-h2 text-balance">
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary">{intro}</p>
        </div>

        <ol className="relative grid w-full gap-fluid-7 desktop:grid-cols-3 desktop:gap-fluid-5">
          <li
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[17%] top-[clamp(4rem,6vw,5.5rem)] hidden border-t-2 border-dotted border-blush-strong desktop:block"
          />
          {items.map((step, index) => (
            <li key={step.id} className="relative flex flex-col items-center gap-fluid-3">
              <div className="grid size-[clamp(8rem,12vw,11rem)] place-items-center rounded-full bg-blush">
                <Object3D
                  name={step.object}
                  size={160}
                  className="w-[72%]"
                />
              </div>
              <span className="font-sans text-small text-brand">
                Step {index + 1}
              </span>
              <h3 className="font-sans text-h5">{step.heading}</h3>
              <p className="font-sans text-main text-secondary measure-narrow">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <Button as="link" href={action.href} variant="primary" tone="light">
          {action.label}
        </Button>
      </div>
    </V2Section>
  );
}
