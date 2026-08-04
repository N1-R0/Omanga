// Mirrors the --duration-*, --motion-* and --ease-* tokens in styles/tokens.css for
// Framer Motion, which cannot read CSS custom properties. Change both together.
type MotionTokens = {
  readonly durationStandard: number;
  readonly durationUnderline: number;
  readonly durationEmphasis: number;
  readonly durationEntrance: number;
  readonly staggerStep: number;
  readonly entranceOffset: number;
  readonly easeStandard: [number, number, number, number];
};

export const MOTION: MotionTokens = {
  durationStandard: 0.2,
  durationUnderline: 0.25,
  durationEmphasis: 0.3,
  durationEntrance: 0.4,
  staggerStep: 0.08,
  entranceOffset: 16,
  easeStandard: [0, 0, 0.2, 1],
};
