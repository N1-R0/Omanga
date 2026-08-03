import { Media } from "@/components/ui/Media";
import type { ImageAsset } from "@/types/content.types";

export type ServiceImageProps = {
  image: ImageAsset;
  /** Owned by the section, whose grid determines it. */
  sizes: string;
};

// Ratio, fit and radius are fixed rather than props, so the three services cannot drift.
export function ServiceImage({ image, sizes }: ServiceImageProps) {
  return (
    <Media
      image={image}
      ratio="square"
      fit="cover"
      sizes={sizes}
      radius="panel"
    />
  );
}
