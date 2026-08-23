import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Headset. The 24/7 contact centre — a person on the other end. Path data from lucide-react (ISC). */

export type HeadsetProps = {
  size: IconSize;
  label?: string;
};

export function Headset({ size, label }: HeadsetProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </Icon>
  );
}
