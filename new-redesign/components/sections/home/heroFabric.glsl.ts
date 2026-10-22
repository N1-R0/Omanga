/**
 * Fragment shader for the hero's crimson fabric background (HeroFabric.tsx).
 * Our own shader, written after studying miyagami.com's hero: a lit cloth
 * with a swaying diagonal fold, a cross fold drifting the other way, a woven
 * dot mesh bent by the folds and soft focus to the right. Tuned in
 * design-lab/hero-fabric-bg.html; keep the two in step.
 */
export const HERO_FABRIC_FRAG = `
precision highp float;
uniform vec2 res;
uniform float time, amp, tex, focus, px;
uniform vec3 cShadow, cBase, cHigh, cBack;

// 2D simplex noise (Stefan Gustavson / Ashima Arts, MIT licence).
vec3 perm(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float noise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = perm(perm(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g = vec3(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw);
  return 130.0 * dot(m, g);
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Cloth height. The plane is turned about 35 degrees so the main fold runs
// diagonally; slow noise bends that fold (domain warp) and its phase swings on
// a sine, so it sways in place instead of scrolling. A second, shallower fold
// runs across it and drifts the other way. Every drift is a sin/cos loop.
float cloth(vec2 p, float t) {
  vec2 q = rot(0.62) * p;
  vec2 drift = vec2(sin(t * 0.19), cos(t * 0.15)) * 0.85;
  float wa = noise(q * 0.35 + drift + 3.1);
  float wb = noise(q * 0.65 - drift.yx * 1.2 - 4.7);
  float sway = sin(t * 0.33) * 1.5;
  float main = sin(q.x * 1.35 + wa * 2.3 + sway);
  float across = sin(q.y * 0.95 - q.x * 0.2 - t * 0.27 + wb * 1.3);
  float swell = 0.8 + 0.2 * sin(t * 0.41 + 1.0);
  return (main * 0.72 * swell + across * 0.18 + wa * 0.3 + wb * 0.07) * amp;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = vec2(uv.x * res.x / res.y, uv.y) * 2.0;

  // Depth of field: the right side goes soft. Taking the slope over a wider
  // step there flattens the small detail, which reads as lens blur.
  float soft = smoothstep(focus, focus + 0.45, uv.x - (uv.y - 1.0) * 0.1);
  float e = mix(0.01, 0.1, soft);
  float h = cloth(p, time);
  float dx = (cloth(p + vec2(e, 0.0), time) - h) / e;
  float dy = (cloth(p + vec2(0.0, e), time) - h) / e;
  vec3 n = normalize(vec3(-dx * 0.6, -dy * 0.6, 1.0));

  // Wrapped diffuse from the upper left, darker in the troughs and toward
  // the bottom of the frame.
  vec3 L = normalize(vec3(-0.6, 0.5, 0.62));
  float d = clamp(dot(n, L) * 0.6 + 0.4, 0.0, 1.0);
  float lit = d * d * (3.0 - 2.0 * d);
  lit *= mix(0.7, 1.0, smoothstep(-1.0, 0.9, h));
  lit *= 0.78 + 0.3 * uv.y;

  vec3 col = mix(cShadow, cBase, smoothstep(0.08, 0.55, lit));
  col = mix(col, cHigh, smoothstep(0.62, 1.0, lit) * 0.72);
  float gloss = pow(max(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 24.0);
  col += cHigh * gloss * 0.38 * (1.0 - soft * 0.6);

  // Woven mesh: a staggered lattice of small dots, about 3px apart in CSS
  // pixels, pushed around by the cloth so the weave follows each fold. It
  // shows on the lit faces and fades out in the soft area.
  vec2 fp = gl_FragCoord.xy / px;
  fp += vec2(dx * 3.0, h * 36.0);
  vec2 g = fp / vec2(3.2, 2.7);
  g.x += mod(floor(g.y), 2.0) * 0.5;
  vec2 c = (fract(g) - 0.5) * vec2(1.0, 1.3);
  float dotm = 1.0 - smoothstep(0.17, 0.4, length(c));
  float face = smoothstep(0.3, 0.85, lit);
  float w = tex * (1.0 - soft) * smoothstep(1.6, 3.0, 3.2 * px);
  col *= 1.0 - w * 0.3 * (1.0 - dotm) * mix(0.35, 1.0, face);
  col += cHigh * w * dotm * face * 0.5;

  // Where the cloth dips away on the soft side, a muted backdrop shows.
  float gap = smoothstep(0.1, 0.6, -h * 0.5 + 0.1 + (uv.y - 0.68) * 1.7 + (uv.x - 0.6) * 1.1);
  col = mix(col, cBack, gap * soft * 0.9);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export const HERO_FABRIC_VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
