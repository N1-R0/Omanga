import { Check } from "@/components/icons/Check";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type {
  InsurancePlan,
  InsurancePlansContent,
} from "@/content/insurance-plans.content";
import { cx } from "@/lib/cx";
import type { HeadingLevel, Tone } from "@/types/ui.types";

type Surface = {
  readonly card: string;
  readonly tone: Tone;
};

const SURFACE: Readonly<Record<"featured" | "standard", Surface>> = {
  featured: {
    card: "bg-accent text-text-inverse ",
    tone: "brand",
  },
  standard: {
    card: "bg-surface text-text ",
    tone: "light",
  },
} as const;

export type PlanCardProps = {
  plan: InsurancePlan;
  labels: Pick<
    InsurancePlansContent,
    "billingPeriod" | "accessLabel" | "includedHeading" | "cardFootnote"
  >;
  headingLevel: HeadingLevel;
  headingId: string;
};

export function PlanCard({
  plan,
  labels,
  headingLevel,
  headingId,
}: PlanCardProps) {
  const surface = SURFACE[plan.isFeatured === true ? "featured" : "standard"];

  return (
    <div
      className={cx(
        "flex h-full flex-col gap-8 rounded-xs p-10",
        surface.card,
      )}
    >
      <Stack gap="lg" align="start">
        <Heading id={headingId} level={headingLevel} role="label">
          <Badge tone={surface.tone}>{plan.name}</Badge>
        </Heading>

        <div className="flex items-baseline gap-2">
          <p className="font-sans type-h3">{formatPrice(plan.price)}</p>

          <Text role="body" as="span" isSecondary>
            {`/${labels.billingPeriod}`}
          </Text>
        </div>

        <Text role="body">{plan.description}</Text>

        <Text role="small">
          {`${labels.accessLabel}: ${plan.hospitalAccess}`}
        </Text>
      </Stack>

      <div className="grow">
        <Stack gap="lg">
          <Text role="small">
            <strong>{labels.includedHeading}</strong>
          </Text>

          <ul role="list" className="flex flex-col gap-4">
            {plan.included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size="md" />

                <Text role="small">{item}</Text>
              </li>
            ))}
          </ul>
        </Stack>
      </div>

      <Stack gap="md" align="stretch">
        <Button
          as="link"
          variant={plan.action.emphasis}
          tone={surface.tone}
          href={plan.action.href}
          isExternal={plan.action.isExternal}
        >
          {plan.action.label}
        </Button>

        <div className="text-center">
          <Text role="small" isSecondary>
            {labels.cardFootnote}
          </Text>
        </div>
      </Stack>
    </div>
  );
}

function formatPrice(price: number): string {
  return `$${price}`;
}
