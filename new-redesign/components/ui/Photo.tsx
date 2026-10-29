import Image, { type ImageProps } from "next/image";

import { blurData } from "@/new-redesign/config/blur";

export function Photo({ alt, ...props }: ImageProps) {
  const blur = typeof props.src === "string" ? blurData[props.src] : undefined;
  return <Image alt={alt} {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})} {...props} />;
}
