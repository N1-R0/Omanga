import Image from "next/image";

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
