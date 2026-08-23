import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/**
 * Camera. Telemedicine — a consultation held over video.
 *
 * Path data from `lucide-react`, which is already a dependency and is ISC
 * licensed. Transcribed into the system's own `Icon` wrapper rather than
 * imported as a component, for the reason `Icon` exists: it fixes the size to
 * 16, 24 or 32, the stroke to 1.5 and the colour to `currentColor`, so a glyph
 * "cannot ship at the wrong size or with a baked-in colour". Lucide's own
 * component ships at stroke 2 and would be the one icon on the site drawn
 * heavier than the rest.
 */

export type VideoProps = {
  size: IconSize;
  /** Omit unless the mark is the only content of an interactive element. */
  label?: string;
};

export function Video({ size, label }: VideoProps) {
  return (
    <Icon size={size} label={label}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </Icon>
  );
}
