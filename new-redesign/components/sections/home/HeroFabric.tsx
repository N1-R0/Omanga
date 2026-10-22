"use client";

import { useEffect, useRef } from "react";

import { HERO_FABRIC_FRAG, HERO_FABRIC_VERT } from "@/new-redesign/components/sections/home/heroFabric.glsl";

/**
 * Crimson fabric behind the hero (owner, 2026-10-21; design.md § Hero
 * background study). A WebGL canvas that fills its positioned parent.
 *
 * Settings are the owner's pick from design-lab/hero-fabric-bg.html: speed 1,
 * folds 1, texture 0.8, focus 0.8. Film grain is left out on purpose.
 *
 * Colours are the brand ramp: shadow brand-950, base brand-600 (#AE2448),
 * highlight brand-400, plus a muted backdrop for the soft side. Shader
 * uniforms can't read CSS tokens, so the hex values are written out here.
 *
 * Cost control: draws at most 30 fps, only while the hero is on screen, and
 * renders one still frame for visitors with reduced motion turned on.
 *
 * First paint (owner, 2026-10-23): the canvas itself is filled brand-600, the
 * fabric's base colour, and there's no fade-in. The old brand-950 section fill
 * that showed while the fabric faded in is gone from both heroes, so the page
 * opens on the fabric's crimson and the folds draw over it. Without WebGL the
 * brand-600 fill stays (white text on it is 6.68:1).
 */
const COLORS = {
  cShadow: "#360511",
  cBase: "#ae2448",
  cHigh: "#f46a82",
  cBack: "#6e4a55",
} as const;

const SETTINGS = { speed: 1, amp: 1, tex: 0.8, focus: 0.8 };

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

export function HeroFabric() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vert = shader(gl.VERTEX_SHADER, HERO_FABRIC_VERT);
    const frag = shader(gl.FRAGMENT_SHADER, HERO_FABRIC_FRAG);
    if (!vert || !frag) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One triangle that covers the viewport.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    for (const [name, hex] of Object.entries(COLORS)) gl.uniform3fv(u(name), rgb(hex));
    gl.uniform1f(u("amp"), SETTINGS.amp);
    gl.uniform1f(u("tex"), SETTINGS.tex);
    gl.uniform1f(u("focus"), SETTINGS.focus);
    const uRes = u("res");
    const uTime = u("time");
    const uPx = u("px");

    let px = 1;
    const draw = (t: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uPx, px);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let time = 10;

    const resize = () => {
      px = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * px);
      canvas.height = Math.round(canvas.clientHeight * px);
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(time);
    };
    const sizer = new ResizeObserver(resize);
    sizer.observe(canvas);
    resize();

    let raf = 0;
    let last = 0;
    let acc = 0;
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      acc += dt;
      if (acc >= 1 / 30) {
        time += acc * SETTINGS.speed;
        acc = 0;
        draw(time);
      }
      raf = requestAnimationFrame(frame);
    };

    const onScreen = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting && !still) raf = requestAnimationFrame(frame);
    });
    onScreen.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      onScreen.disconnect();
      sizer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 -z-10 size-full bg-brand-600"
    />
  );
}
