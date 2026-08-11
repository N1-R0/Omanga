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
  /**
   * Parallax travel in each direction, in pixels. Mirrors
   * `--spacing-parallax-overscan`, which sizes the layer this value moves — the
   * two must stay equal or the transform exposes an edge at the end of its range.
   */
  readonly parallaxOverscan: number;
  /** Count-up in the payments visual. Mirrors `--duration-balance-count`. */
  readonly durationBalanceCount: number;
  /** Beat between the count settling and the press. `--duration-press-delay`. */
  readonly durationPressDelay: number;
  /** Send press, down and back up. Mirrors `--duration-press`. */
  readonly durationPress: number;
  /** Beat between the press releasing and the confirmation. `--duration-settle`. */
  readonly durationSettle: number;
  /** Send's depressed scale. Mirrors `--motion-press-scale`. */
  readonly pressScale: number;
  /** One tier's move between stack slots. Mirrors `--duration-tier-move`. */
  readonly durationTierMove: number;
  /** How long a tier holds the front slot. Mirrors `--duration-tier-hold`. */
  readonly durationTierHold: number;
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
  parallaxOverscan: 64,
  durationBalanceCount: 2.2,
  durationPressDelay: 0.7,
  durationPress: 0.12,
  durationSettle: 0.42,
  pressScale: 0.96,
  durationTierMove: 0.6,
  durationTierHold: 2.6,
  easeStandard: [0, 0, 0.2, 1],
  easeEntrance: [0.39, 0.575, 0.565, 1],
  easeDropdown: [0.075, 0.82, 0.165, 1],
};
