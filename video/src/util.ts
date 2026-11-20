import { Easing, interpolate } from "remotion"

/** Piecewise keyframes in seconds: k(t, [[t0, v0], [t1, v1], ...]). Eases between each pair; clamps outside. */
export function k(t: number, pts: [number, number][], ease: "inOut" | "linear" | "out" = "inOut"): number {
  if (pts.length === 1) return pts[0][1]
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const easing = ease === "linear" ? Easing.linear : ease === "out" ? Easing.out(Easing.cubic) : Easing.inOut(Easing.cubic)
  return interpolate(t, xs, ys, { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
}

/** 0 before a, 1 after b, eased in between. */
export const ramp = (t: number, a: number, b: number) => k(t, [[a, 0], [b, 1]])

/** A window: fades in over `f`, holds, fades out over `f`. */
export const win = (t: number, a: number, b: number, f = 0.5) =>
  Math.min(ramp(t, a, a + f), 1 - ramp(t, b - f, b))

/** Deterministic random in [0, 1). Same seed, same film, every render. */
export function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
