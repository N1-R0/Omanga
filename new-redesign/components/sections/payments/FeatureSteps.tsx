import { Card } from "@/new-redesign/components/ui/Card";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import type { PaymentsFeature } from "@/new-redesign/content/payments-features.content";

export function FeatureSteps({ steps }: { steps: NonNullable<PaymentsFeature["steps"]> }) {
  return (
    <Section id="how-it-works" label={steps.title}>
      <SectionHead title={steps.title} />
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.items.map((step, i) => (
          <li key={step.title}>
            <Card className="flex h-full flex-col gap-3 p-6 md:p-8">
              <span className="type-p3 text-accent-text">
                <span className="sr-only">Step </span>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-p1 text-text-secondary">{step.text}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
