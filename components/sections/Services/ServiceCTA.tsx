import { Button } from "@/components/ui/Button";
import type { LinkTarget } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

// [RAISED] design.md caps a section at one primary. All three ship filled because
// the rule's rationale is per-viewport and these never share one. Confirm with design.
export type ServiceCTAProps = {
  action: LinkTarget;
  tone: Tone;
};

export function ServiceCTA({ action, tone }: ServiceCTAProps) {
  return (
    <Button
      as="link"
      variant="primary"
      tone={tone}
      href={action.href}
      isExternal={action.isExternal}
    >
      {action.label}
    </Button>
  );
}
