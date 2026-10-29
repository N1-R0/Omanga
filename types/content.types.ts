export type LinkTarget = {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
  readonly isRoutePending?: boolean;
};

export type CallToAction = LinkTarget & {
  readonly emphasis: "primary" | "secondary" | "text";
};

export type ImageAsset = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type Eyebrow = string;

export type PageMetaContent = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly ogImage?: ImageAsset;
};
