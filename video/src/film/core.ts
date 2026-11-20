import { C } from "../beats"
import { k, rng, win } from "../util"

/**
 * The home page film: where does the memory live?
 * Shared pieces: the clock, the colours, the bodies and the sand.
 */
export const FILM_SECONDS = 35
export const FILM_FPS = 30 // smoother than the old film's 24: the camera drift and the sand need it
export const W = 1920
export const H = 1080
export const AX = 960 // the one axis: the stream, the arch and the model all sit on it
export type Ctx = CanvasRenderingContext2D
export type RGB = [number, number, number]

export const INK: RGB = [31, 27, 20]
export const PAPER: RGB = [241, 236, 223]
export const SAND_DAY: RGB[] = [[87, 73, 46], [107, 90, 56], [138, 115, 71], [167, 139, 84], [200, 169, 110]]
export const SAND_NIGHT: RGB[] = [[167, 139, 84], [200, 169, 110], [232, 205, 150], [246, 230, 192], [255, 244, 214]]
export const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`
export const mix = (a: RGB, b: RGB, f: number): RGB => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f].map(Math.round) as RGB
export const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

/* ---------- the clock ---------- */

/** 1 = night, 0 = day. Night to open, morning at 8, dusk at 21.5, dawn at 30.5, dark again to loop. */
export const nightAt = (t: number) => k(t, [[0, 1], [8, 1], [9.6, 0], [21.5, 0], [25, 1], [30.3, 1], [32.4, 0], [34.1, 0], [35, 1]])
/** Warm light low in the sky: morning, dusk, dawn. */
export const glowAt = (t: number) => Math.max(win(t, 8, 12.5, 1.2), win(t, 21.2, 25.6, 1.6) * 0.9, k(t, [[27.5, 0], [30.5, 0.5], [32.2, 1], [34.1, 1], [35, 0]]))

/* ---------- the land: one painting, relit ---------- */

/** Where the sand lands on the road, and where the model sits above it. One axis. */
export const SX = 1040
export const LY = 912
export const blank = (w: number, h: number) => {
  const cv = document.createElement("canvas")
  cv.width = w
  cv.height = h
  return cv
}
/* ---------- bodies ---------- */

export type OrbKind = "ink" | "night" | "gold" | "pearl" | "moonstone"

/** A stippled sphere, lit from the upper right. */
export function orb(ctx: Ctx, x: number, y: number, r: number, kind: OrbKind, seed: number, alpha = 1) {
  if (alpha <= 0 || r <= 0.5) return
  const L = [0.5, -0.62, 0.6]
  ctx.save()
  ctx.globalAlpha *= alpha
  const g = ctx.createRadialGradient(x + L[0] * r * 0.5, y + L[1] * r * 0.5, r * 0.05, x, y, r)
  const stops: Record<OrbKind, [string, string, string]> = {
    ink: ["#6a6252", "#2a251c", "#0e0c08"],
    night: ["#3a3350", "#15121f", "#06050b"],
    gold: ["#fbeccb", "#c8a96e", "#5b4a26"],
    pearl: ["#ffffff", "#d6d0e8", "#6d6690"],
    moonstone: ["#8f88ad", "#3d3660", "#17132a"],
  }
  const [s0, s1, s2] = stops[kind]
  g.addColorStop(0, s0)
  g.addColorStop(0.55, s1)
  g.addColorStop(1, s2)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 6.2832)
  ctx.fill()
  ctx.clip()
  const rr = rng(seed)
  const n = Math.min(26000, Math.round(r * r * 1.5))
  const lightDot: RGB = kind === "gold" ? [255, 247, 224] : kind === "pearl" ? [255, 255, 255] : kind === "ink" ? [241, 236, 223] : [214, 200, 240]
  const darkDot: RGB = kind === "gold" ? [70, 55, 24] : kind === "pearl" ? [60, 52, 92] : [0, 0, 0]
  for (let i = 0; i < n; i++) {
    const d = Math.sqrt(rr()) * r
    const a = rr() * 6.2832
    const dx = d * Math.cos(a)
    const dy = d * Math.sin(a)
    const nz = Math.sqrt(Math.max(0, 1 - (d / r) * (d / r)))
    const nl = (dx / r) * L[0] + (dy / r) * L[1] + nz * L[2]
    const pick = rr()
    const size = 0.5 + rr() * (r > 60 ? 1.1 : 0.7)
    if (nl > 0.25 && pick < Math.pow(nl, 2.2) * 0.75) ctx.fillStyle = rgba(lightDot, 0.22 + 0.5 * rr())
    else if (pick < (0.75 - nl) * 0.6) ctx.fillStyle = rgba(darkDot, 0.25 + 0.4 * rr())
    else continue
    ctx.beginPath()
    ctx.arc(x + dx, y + dy, size, 0, 6.2832)
    ctx.fill()
  }
  ctx.restore()
}

export function halo(ctx: Ctx, x: number, y: number, r: number, c: RGB, a: number) {
  if (a <= 0) return
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(c, a))
  g.addColorStop(0.4, rgba(c, a * 0.35))
  g.addColorStop(1, rgba(c, 0))
  ctx.fillStyle = g
  ctx.fillRect(x - r, y - r, r * 2, r * 2)
}

/* ---------- sand ---------- */

export const gz = (r: () => number) => (r() + r() + r() + r() - 2) / 1.2

export type StreamOpts = { head?: number; tail?: number; lean?: number; sway?: number }

/**
 * A falling stream. Grains speed up as they fall, so the stream stretches, pulses and each grain streaks.
 * `head` and `tail` are how far the first and last grain have fallen (0 top, 1 landed), so a pour starts
 * with a falling front and ends with a falling tail. `lean` lets wind carry it in from one side.
 */
export function stream(ctx: Ctx, t: number, x0: number, yTop: number, yBot: number, width: number, n: number, night: number, seed: number, amount = 1, o: StreamOpts = {}) {
  const head = o.head ?? 9, tail = o.tail ?? -1, lean = o.lean ?? 0, sway = o.sway ?? 0
  if (amount <= 0 || yBot <= yTop || head <= 0 || tail >= 1) return
  const r = rng(seed)
  const pal = palAt(night)
  const span = yBot - yTop
  ctx.lineCap = "round"
  for (let i = 0; i < n; i++) {
    const a = r(), b = gz(r), c = r(), d = r(), e = r()
    if (d > amount) continue
    const ph = (a + t * 0.85) % 1
    if (ph > head || ph < tail) continue
    const y = yTop + span * ph * ph
    // sand never falls evenly: it comes in pulses
    if (Math.sin(y * 0.038 - t * 13 + Math.floor(e * 3)) < -0.72 && e < 0.7) continue
    const stray = e > 0.9 ? 3.2 : 1
    const fine = e < 0.72
    const at = (p: number, yy: number) =>
      x0 - lean * (1 - p) + b * width * stray * (0.35 + 0.65 * p) + Math.sin(yy * 0.021 + c * 6.28) * 0.7 + sway * p * Math.sin(yy * 0.0042 - t * 1.15 + c * 0.6)
    const len = (fine ? 2 + 13 * ph : 3 + 26 * ph) * Math.min(1, span / 500)
    const p0 = Math.max(0, ph - len / (2 * span * Math.max(ph, 0.08)))
    const y0 = Math.max(yTop, y - len)
    const col = pal[Math.floor(c * pal.length)]
    const fadeTop = yTop < 0 ? Math.min(1, Math.max(0, y / 140)) : 1
    ctx.strokeStyle = rgba(col, (0.3 + 0.6 * c) * (stray > 1 ? 0.55 : 0.9) * fadeTop)
    ctx.lineWidth = fine ? 0.5 + c * 0.7 : 0.8 + c * 1.2
    ctx.beginPath()
    ctx.moveTo(at(p0, y0), y0)
    ctx.lineTo(at(ph, y), y)
    ctx.stroke()
  }
}

/**
 * A heap at the angle of repose: a soft body, a skin of grains, and loose grains running down the faces.
 * `tt` is the time the heap has been fed: while it grows the loose grains keep tumbling.
 */
export function pile(ctx: Ctx, cx: number, base: number, h: number, night: number, seed: number, tt = 0) {
  if (h < 1) return
  const w = h / Math.tan((33 * Math.PI) / 180)
  const surf = (dx: number) => {
    const u = Math.abs(dx) / w
    if (u >= 1) return base
    // straight faces, a rounded tip, a soft foot
    const tip = 1 - Math.sqrt(u * u + 0.004)
    const foot = u > 0.86 ? Math.pow((1 - u) / 0.14, 1.6) * 0.14 : 1 - u
    return base - h * Math.min(tip, foot)
  }
  const pal = palAt(night)
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - w, base + 2)
  for (let dx = -w; dx <= w; dx += 3) ctx.lineTo(cx + dx, surf(dx))
  ctx.lineTo(cx + w, base + 2)
  ctx.closePath()
  const g = ctx.createLinearGradient(cx - w, 0, cx + w, 0)
  g.addColorStop(0, tone(night, [107, 90, 56], [93, 76, 42]))
  g.addColorStop(0.5, tone(night, [176, 147, 90], [179, 149, 90]))
  g.addColorStop(1, tone(night, [220, 195, 138], [232, 205, 150]))
  ctx.fillStyle = g
  ctx.fill()
  ctx.clip()
  const r = rng(seed)
  const n = Math.round(w * h * 0.5)
  for (let i = 0; i < n; i++) {
    const dx = (r() + r() - 1) * w
    const top = surf(dx)
    const y = top + Math.pow(r(), 1.8) * (base - top)
    const side = dx / w
    const c = r()
    const tone = Math.max(0, Math.min(pal.length - 1, Math.floor((0.5 + side * 0.4 + (c - 0.5) * 0.9) * pal.length)))
    ctx.fillStyle = rgba(pal[tone], 0.55 + 0.45 * r())
    ctx.beginPath()
    ctx.arc(cx + dx, y, 0.7 + r() * 1.2, 0, 6.2832)
    ctx.fill()
  }
  ctx.restore()
  // loose grains rolling down and just off the faces
  const r2 = rng(seed + 1)
  for (let i = 0; i < Math.round(h * 2.6); i++) {
    const u0 = r2(), sgn = r2() > 0.5 ? 1 : -1, c = r2(), sp = 0.1 + 0.34 * r2(), hop = r2()
    const u = (u0 + tt * sp) % 1
    const dx = sgn * u * w * 1.12
    const y = surf(Math.max(-w, Math.min(w, dx))) - hop * 3.2 - (tt > 0 ? Math.abs(Math.sin(u * 19 + c * 6)) * 2.2 : 0)
    ctx.fillStyle = rgba(pal[Math.floor(c * pal.length)], 0.75)
    ctx.beginPath()
    ctx.arc(cx + dx, y, 0.8 + c * 1.1, 0, 6.2832)
    ctx.fill()
  }
}

/** Grains thrown up where the stream lands. */
export function splash(ctx: Ctx, t: number, x: number, y: number, power: number, night: number, seed: number) {
  if (power <= 0) return
  const r = rng(seed)
  const pal = palAt(night)
  for (let i = 0; i < 140; i++) {
    const a = r(), vx = gz(r) * 70, vy = 60 + r() * 150, c = r()
    if (c > power) continue
    const ph = (a + t * 1.7) % 1
    const px = x + vx * ph
    const py = y - vy * ph + 260 * ph * ph
    ctx.fillStyle = rgba(pal[Math.floor(r() * pal.length)], 0.85 * (1 - ph * 0.6))
    ctx.beginPath()
    ctx.arc(px, py, 0.8 + r() * 1.2, 0, 6.2832)
    ctx.fill()
  }
}

/* ---------- film grain and finish ---------- */

export function makeNoise(): HTMLCanvasElement {
  const cv = document.createElement("canvas")
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")!
  const img = ctx.createImageData(W, H)
  const r = rng(5)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = r()
    const on = v > 0.5
    img.data[i] = img.data[i + 1] = img.data[i + 2] = on ? 255 : 0
    img.data[i + 3] = Math.abs(v - 0.5) * 2 * 9
  }
  ctx.putImageData(img, 0, 0)
  return cv
}

/** The path a ball has just travelled: a fine arc that fades behind it. */
export function trail(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, c: RGB, a: number) {
  if (a <= 0) return
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  g.addColorStop(0, rgba(c, 0))
  g.addColorStop(1, rgba(c, a))
  ctx.strokeStyle = g
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.quadraticCurveTo(x0 + (x1 - x0) * 0.25, y1 + (y0 - y1) * 0.25, x1, y1)
  ctx.stroke()
}

/** A smooth path through keyframes in seconds: no stops at the keys, so a camera glides. */
export function spline(t: number, pts: [number, number][]): number {
  const n = pts.length
  if (t <= pts[0][0]) return pts[0][1]
  if (t >= pts[n - 1][0]) return pts[n - 1][1]
  let i = 0
  while (i < n - 2 && t > pts[i + 1][0]) i++
  const [t0, v0] = pts[i], [t1, v1] = pts[i + 1]
  const m = (j: number) => (j <= 0 || j >= n - 1 ? 0 : (pts[j + 1][1] - pts[j - 1][1]) / (pts[j + 1][0] - pts[j - 1][0]))
  const h = t1 - t0, u = (t - t0) / h
  const u2 = u * u, u3 = u2 * u
  return (2 * u3 - 3 * u2 + 1) * v0 + (u3 - 2 * u2 + u) * h * m(i) + (-2 * u3 + 3 * u2) * v1 + (u3 - u2) * h * m(i + 1)
}

/** Day to night without a jump: 0 by day, 1 by night, eased through dusk. */
export const sm = (night: number) => {
  const u = Math.max(0, Math.min(1, (night - 0.2) / 0.6))
  return u * u * (3 - 2 * u)
}
/** The sand's five tones for this moment of the day. */
export const palAt = (night: number): RGB[] => {
  const f = sm(night)
  return f <= 0 ? SAND_DAY : f >= 1 ? SAND_NIGHT : SAND_DAY.map((c, i) => mix(c, SAND_NIGHT[i], f))
}
/** One colour by day, another by night, blended through dusk. */
export const tone = (night: number, day: RGB, dark: RGB, a = 1) => rgba(mix(day, dark, sm(night)), a)
/** Straight 0 to 1 between a and b, no easing. */
export const lin = (t: number, a: number, b: number) => Math.max(0, Math.min(1, (t - a) / (b - a)))
