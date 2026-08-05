// Mirrors the --duration-*, --motion-* and --ease-* tokens in styles/tokens.css for
// Framer Motion, which cannot read CSS custom properties. Change both together.
type Bezier = [number, number, number, number];

type MotionTokens = {
  readonly durationStandard: number;
  readonly durationUnderline: number;
  readonly durationEmphasis: number;
  readonly durationEntrance: number;
  readonly staggerStep: number;
  readonly entranceOffset: number;
  readonly entranceDelay: number;
  readonly easeStandard: Bezier;
  readonly easeEntrance: Bezier;
  readonly easeDropdown: Bezier;
};

export const MOTION: MotionTokens = {
  durationStandard: 0.2,
  durationUnderline: 0.25,
  durationEmphasis: 0.3,
  durationEntrance: 0.5,
  staggerStep: 0.08,
  entranceOffset: 40,
  entranceDelay: 0.2,
  easeStandard: [0, 0, 0.2, 1],
  easeEntrance: [0.39, 0.575, 0.565, 1],
  easeDropdown: [0.075, 0.82, 0.165, 1],
};
