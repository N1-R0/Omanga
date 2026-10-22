import Image from "next/image";

/**
 * A round flag. The files in public/flags draw a 30 × 24 rounded rectangle
 * inside a 32 × 32 box, so masking them to a circle leaves transparent edges.
 * The art is scaled 1.4× inside a clipped circle so the flag fills it.
 * Decorative: the text beside it names the country or currency.
 */
export function Flag({ src, size }: { src: string; size: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-border"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt="" width={size} height={size} className="size-full scale-[1.4] object-cover" />
    </span>
  );
}
