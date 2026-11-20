import { useLayoutEffect, useMemo, useRef } from "react"
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lora"
import { C, FPS } from "./beats"
import { gauss, k, ramp, rng, win } from "./util"

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] })
loadFont("italic", { weights: ["400", "500"], subsets: ["latin"] })

/**
 * The home page film: where does the memory live?
 * One world at 1920 x 1080, painted to a canvas each frame. The land is painted
 * once and never redrawn, because the land does not move.
 */
export const FILM_SECONDS = 35
const W = 1920
const H = 1080
const AX = 960 // the one axis: the stream, the arch and the model all sit on it

export const CAPTIONS: { at: number; to: number; text: string }[] = [
  { at: 3, to: 8, text: "Most AI keeps it with the model." },
  { at: 8, to: 12, text: "A chat box forgets by morning." },
  { at: 12, to: 19, text: "LongStrider keeps it with you." },
  { at: 19, to: 26, text: "It grows. The model gets only what the question needs." },
  { at: 26, to: 31, text: "Change the model. Keep everything." },
]

type Ctx = CanvasRenderingContext2D
type RGB = [number, number, number]

const INK: RGB = [31, 27, 20]
const PAPER: RGB = [241, 236, 223]
const SAND_DAY: RGB[] = [[87, 73, 46], [107, 90, 56], [138, 115, 71], [167, 139, 84], [200, 169, 110]]
const SAND_NIGHT: RGB[] = [[167, 139, 84], [200, 169, 110], [232, 205, 150], [246, 230, 192], [255, 244, 214]]
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`
const mix = (a: RGB, b: RGB, f: number): RGB => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f].map(Math.round) as RGB
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

/* ---------- the clock ---------- */

/** 1 = night, 0 = day. Night to open, morning at 8, dusk at 21.5, dawn at 30.5, dark again to loop. */
const nightAt = (t: number) => k(t, [[0, 1], [8, 1], [9.6, 0], [21.5, 0], [25, 1], [30.3, 1], [32.4, 0], [34.1, 0], [35, 1]])
/** Warm light low in the sky: morning, dusk, dawn. */
const glowAt = (t: number) => Math.max(win(t, 8, 12.5, 1.2), win(t, 21.2, 25.6, 1.6) * 0.9, k(t, [[27.5, 0], [30.5, 0.5], [32.2, 1], [34.1, 1], [35, 0]]))

/* ---------- the land ---------- */

const LAND: ((x: number) => number)[] = [
  (x) => { const u = x / W; return 700 - 64 * gauss((u - 0.16) * 3) - 150 * gauss((u - 0.9) * 2.4) },
  (x) => { const u = x / W; return 722 - 22 * gauss((u - 0.5) * 1.7) + 26 * (u - 0.5) },
  (x) => { const u = x / W; return 800 + 96 * u - 170 * gauss((u - 0.02) * 2.4) },
  (x) => { const u = x / W; return 972 - 250 * gauss((u - 1.02) * 2.1) - 16 * Math.sin(u * 6) },
  (x) => { const u = x / W; return 1024 - 96 * gauss((u - 0.28) * 2.4) },
]
const GROUND = LAND[1](AX) + 4
const slope = (f: (x: number) => number, x: number) => (f(x + 6) - f(x - 6)) / 12

function tracePath(ctx: Ctx, f: (x: number) => number) {
  ctx.beginPath()
  ctx.moveTo(-20, H + 20)
  for (let x = -20; x <= W + 20; x += 8) ctx.lineTo(x, f(x))
  ctx.lineTo(W + 20, H + 20)
  ctx.closePath()
}

/** Paint the land once: fine stipple that builds tone. Light on the face turned to the sun, deep in the lee. */
function paintLand(night: boolean): HTMLCanvasElement {
  const cv = document.createElement("canvas")
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")!
  const r = rng(night ? 91 : 17)
  LAND.forEach((f, li) => {
    const depth = li / (LAND.length - 1)
    const next = LAND[li + 1]
    ctx.save()
    tracePath(ctx, f)
    ctx.clip()
    ctx.fillStyle = night ? rgba(mix([44, 38, 70], [30, 26, 50], depth), 1) : rgba(mix([246, 242, 232], [243, 238, 226], depth), 1)
    ctx.fillRect(0, 0, W, H)
    const reach = 80 + 90 * depth
    // tone first, smooth: the shape of the dune before its grain
    for (let x = 0; x < W; x += 2) {
      const y0 = f(x)
      const lee = 1 / (1 + Math.exp(slope(f, x) * 26))
      const k0 = (0.3 + 0.7 * lee) * (0.62 + 0.38 * depth) * (night ? 0.75 : 0.62)
      const tg = ctx.createLinearGradient(0, y0, 0, y0 + reach * 3.2)
      const tc = night ? "7,5,16" : "46,39,28"
      tg.addColorStop(0, `rgba(${tc},0)`)
      tg.addColorStop(0.3, `rgba(${tc},${(k0 * 0.6).toFixed(3)})`)
      tg.addColorStop(1, `rgba(${tc},${k0.toFixed(3)})`)
      ctx.fillStyle = tg
      ctx.fillRect(x, y0, 2, H - y0)
    }
    for (let x = 0; x < W; x += 1) {
      const y0 = f(x)
      const yb = Math.min(H, (next ? Math.max(next(x), y0) : H) + 24)
      const hb = yb - y0
      if (hb <= 0) continue
      const s = slope(f, x)
      const lee = 1 / (1 + Math.exp(s * 26))
      const cnt = hb * 1.7
      for (let i = 0; i < cnt; i++) {
        const y = y0 + r() * hb
        const d = 1 - Math.exp(-(y - y0) / reach)
        const rim = y - y0 < 5 ? 0.15 : 1
        let p = (0.06 + 0.94 * d) * (0.3 + 0.7 * lee) * rim * (0.62 + 0.38 * depth)
        const jx = x + r()
        if (night) {
          const lit = (1 - lee) * Math.exp(-(y - y0) / 60) * 0.5 + 0.02
          const q = r()
          if (q < lit) ctx.fillStyle = rgba([226, 214, 240], 0.2 + 0.45 * r())
          else if (q < lit + p * 0.9) ctx.fillStyle = rgba([7, 5, 16], 0.4 + 0.45 * r())
          else continue
        } else {
          if (r() > p) continue
          ctx.fillStyle = rgba(INK, 0.55 + 0.45 * r())
        }
        ctx.beginPath()
        ctx.arc(jx, y, 0.35 + r() * 0.5, 0, 6.2832)
        ctx.fill()
      }
    }
    ctx.restore()
    ctx.beginPath()
    for (let x = -20; x <= W + 20; x += 8) x === -20 ? ctx.moveTo(x, f(x) + 1) : ctx.lineTo(x, f(x) + 1)
    ctx.strokeStyle = night ? "rgba(226,214,240,.3)" : "rgba(252,250,244,.95)"
    ctx.lineWidth = 2.4
    ctx.stroke()
  })
  // the near ground falls away into haze, so words can sit on it
  const mist = ctx.createLinearGradient(0, 850, 0, H)
  mist.addColorStop(0, night ? "rgba(22,19,38,0)" : "rgba(244,239,228,0)")
  mist.addColorStop(0.7, night ? "rgba(22,19,38,.9)" : "rgba(244,239,228,.93)")
  mist.addColorStop(1, night ? "rgba(22,19,38,.96)" : "rgba(244,239,228,.97)")
  ctx.fillStyle = mist
  ctx.fillRect(0, 850, W, H - 850)
  return cv
}

/** What the land gains as it grows: gold veins on the crests, posts, bodies. Painted once per light. */
const POSTS: [number, number, number][] = [[250, 0, 96], [470, 1, 70], [1290, 2, 110], [1310, 1, 84], [1500, 0, 110], [1700, 3, 130], [330, 2, 78], [1160, 2, 64]]
/** Smaller arches further off: x, land layer, radius. */
const FAR_ARCHES: [number, number, number][] = [[1500, 0, 54], [330, 0, 40]]

function veinPath(ctx: Ctx, f: (x: number) => number, a: number, b: number) {
  ctx.beginPath()
  for (let x = a; x <= b; x += 8) x === a ? ctx.moveTo(x, f(x) + 2) : ctx.lineTo(x, f(x) + 2)
}

function paintRich(ctx: Ctx, grow: number, night: number) {
  if (grow <= 0) return
  // veins
  const veins: [number, number, number, number][] = [[0, 0, 1920, 0], [1, 0, 1920, 0.12], [2, 0, 1180, 0.3], [3, 760, 1920, 0.45]]
  veins.forEach(([li, a, b, at]) => {
    const p = ramp(grow, at, at + 0.4)
    if (p <= 0) return
    const f = LAND[li]
    const mid = AX
    const half = Math.max(b - mid, mid - a) * p
    const x0 = Math.max(a, mid - half)
    const x1 = Math.min(b, mid + half)
    ctx.save()
    ctx.lineCap = "round"
    if (night > 0.02) {
      veinPath(ctx, f, x0, x1)
      ctx.strokeStyle = `rgba(232,205,150,${0.22 * night})`
      ctx.lineWidth = 9
      ctx.filter = "blur(6px)"
      ctx.stroke()
      ctx.filter = "none"
    }
    veinPath(ctx, f, x0, x1)
    ctx.strokeStyle = rgba(mix(hex(C.gold), hex(C.goldLight), night), 0.95)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  })
  POSTS.forEach(([x, li, h], i) => {
    const p = ramp(grow, 0.15 + i * 0.09, 0.4 + i * 0.09)
    if (p <= 0) return
    const y = LAND[li](x) + 6
    ctx.strokeStyle = night > 0.5 ? `rgba(226,214,240,${0.55 * p})` : rgba(INK, 0.8 * p)
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y - h * p)
    ctx.stroke()
    if (night > 0.05) {
      const hg = ctx.createRadialGradient(x, y - h * p, 0, x, y - h * p, 34)
      hg.addColorStop(0, `rgba(232,205,150,${0.5 * night * p})`)
      hg.addColorStop(1, "rgba(232,205,150,0)")
      ctx.fillStyle = hg
      ctx.fillRect(x - 40, y - h * p - 40, 80, 80)
    }
    orb(ctx, x, y - h * p, 7 + (i % 3) * 2, "gold", 300 + i, p)
  })
  FAR_ARCHES.forEach(([x, li, rad], i) => {
    const p = ramp(grow, 0.28 + i * 0.18, 0.62 + i * 0.18)
    if (p <= 0) return
    smallArch(ctx, x, LAND[li](x) + 5, rad, p, night)
  })
}

function smallArch(ctx: Ctx, cx: number, cy: number, R: number, built: number, night: number) {
  const N = 7
  const T = R * 0.36
  for (let i = 0; i < N; i++) {
    const order = Math.min(i, N - 1 - i)
    const p = ramp(built, order / 4.6, order / 4.6 + 0.25)
    if (p <= 0) continue
    const a0 = Math.PI + (i * Math.PI) / N + 0.03
    const a1 = Math.PI + ((i + 1) * Math.PI) / N - 0.03
    ctx.beginPath()
    ctx.arc(cx, cy, R, a0, a1)
    ctx.arc(cx, cy, R + T, a1, a0, true)
    ctx.closePath()
    const day = hex(C.ramp[Math.min(5, Math.round((order / 3) * 5))])
    ctx.fillStyle = rgba(mix(day, mix(day, [20, 16, 34], 0.55), night), p)
    ctx.fill()
  }
}

/* ---------- bodies ---------- */

type OrbKind = "ink" | "night" | "gold" | "pearl" | "moonstone"

/** A stippled sphere, lit from the upper right. */
function orb(ctx: Ctx, x: number, y: number, r: number, kind: OrbKind, seed: number, alpha = 1) {
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

function halo(ctx: Ctx, x: number, y: number, r: number, c: RGB, a: number) {
  if (a <= 0) return
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(c, a))
  g.addColorStop(0.4, rgba(c, a * 0.35))
  g.addColorStop(1, rgba(c, 0))
  ctx.fillStyle = g
  ctx.fillRect(x - r, y - r, r * 2, r * 2)
}

/* ---------- sand ---------- */

const gz = (r: () => number) => (r() + r() + r() + r() - 2) / 1.2

/** A falling stream. Grains speed up as they fall, so the stream stretches, pulses and each grain streaks. */
function stream(ctx: Ctx, t: number, x0: number, yTop: number, yBot: number, width: number, n: number, night: number, seed: number, amount = 1) {
  if (amount <= 0 || yBot <= yTop) return
  const r = rng(seed)
  const pal = night > 0.5 ? SAND_NIGHT : SAND_DAY
  const span = yBot - yTop
  ctx.lineCap = "round"
  for (let i = 0; i < n; i++) {
    const a = r(), b = gz(r), c = r(), d = r(), e = r()
    if (d > amount) continue
    const ph = (a + t * 0.85) % 1
    const y = yTop + span * ph * ph
    // sand never falls evenly: it comes in pulses
    if (Math.sin(y * 0.038 - t * 13 + Math.floor(e * 3)) < -0.35 && e < 0.7) continue
    const stray = e > 0.9 ? 3.2 : 1
    const x = x0 + b * width * stray * (0.5 + 0.5 * ph) + Math.sin(y * 0.021 + c * 6.28) * 1.4
    const len = 3 + 30 * ph * Math.min(1, span / 500)
    const col = pal[Math.floor(c * pal.length)]
    const fadeTop = yTop < 0 ? Math.min(1, Math.max(0, y / 140)) : 1
    ctx.strokeStyle = rgba(col, (0.35 + 0.65 * c) * (stray > 1 ? 0.6 : 0.95) * fadeTop)
    ctx.lineWidth = 0.8 + c * 1.5
    ctx.beginPath()
    ctx.moveTo(x, Math.max(yTop, y - len))
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

/** A heap at the angle of repose: a soft body, a skin of grains, a few still tumbling down the faces. */
function pile(ctx: Ctx, cx: number, base: number, h: number, night: number, seed: number) {
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
  const pal = night > 0.5 ? SAND_NIGHT : SAND_DAY
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - w, base + 2)
  for (let dx = -w; dx <= w; dx += 3) ctx.lineTo(cx + dx, surf(dx))
  ctx.lineTo(cx + w, base + 2)
  ctx.closePath()
  const g = ctx.createLinearGradient(cx - w, 0, cx + w, 0)
  if (night > 0.5) {
    g.addColorStop(0, "#5d4c2a"); g.addColorStop(0.5, "#b3955a"); g.addColorStop(1, "#e8cd96")
  } else {
    g.addColorStop(0, "#6b5a38"); g.addColorStop(0.52, "#b0935a"); g.addColorStop(1, "#dcc38a")
  }
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
  // loose grains rolling on and just off the faces
  const r2 = rng(seed + 1)
  for (let i = 0; i < Math.round(h * 2.2); i++) {
    const dx = (r2() * 2 - 1) * w * 1.12
    const y = surf(Math.max(-w, Math.min(w, dx))) - r2() * 3.2
    const c = r2()
    ctx.fillStyle = rgba(pal[Math.floor(c * pal.length)], 0.75)
    ctx.beginPath()
    ctx.arc(cx + dx, y, 0.8 + c * 1.1, 0, 6.2832)
    ctx.fill()
  }
}

/** Grains thrown up where the stream lands. */
function splash(ctx: Ctx, t: number, x: number, y: number, power: number, night: number, seed: number) {
  if (power <= 0) return
  const r = rng(seed)
  const pal = night > 0.5 ? SAND_NIGHT : SAND_DAY
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

/* ---------- the arch ---------- */

const ARCH_N = 11
const ARCH_R = 168
const ARCH_T = 56

function stonePath(ctx: Ctx, i: number, lift = 0) {
  const gap = 0.022
  const a0 = Math.PI + (i * Math.PI) / ARCH_N + gap
  const a1 = Math.PI + ((i + 1) * Math.PI) / ARCH_N - gap
  const cy = GROUND - lift
  const ro = ARCH_R + ARCH_T
  ctx.beginPath()
  ctx.arc(AX, cy, ARCH_R, a0, a1)
  ctx.arc(AX, cy, ro, a1, a0, true)
  ctx.closePath()
}

/** The arch, stone by stone from both feet up; the keystone goes in last. `built` is 0..1. */
function arch(ctx: Ctx, built: number, night: number) {
  if (built <= 0) return
  const mid = (ARCH_N - 1) / 2
  for (let i = 0; i < ARCH_N; i++) {
    const order = i <= mid ? i : ARCH_N - 1 - i // 0 at the feet, 5 at the keystone
    const at = order / (mid + 1.4)
    const p = ramp(built, at, at + 0.2)
    const tone = order / mid
    const day = hex(C.ramp[Math.min(5, Math.round(tone * 5))])
    const col = mix(day, mix(day, [20, 16, 34], 0.55), night)
    if (p < 1) {
      // not here yet: a dashed place for it
      ctx.save()
      stonePath(ctx, i)
      ctx.setLineDash([7, 7])
      ctx.strokeStyle = rgba(hex(C.gold), 0.75 * (1 - p) * Math.min(1, built * 8))
      ctx.lineWidth = 1.6
      ctx.stroke()
      ctx.restore()
    }
    if (p <= 0) continue
    ctx.save()
    stonePath(ctx, i, 0)
    ctx.globalAlpha = p
    ctx.fillStyle = rgba(col, 1)
    ctx.fill()
    ctx.clip()
    // the stone is made of the same grain
    const r = rng(500 + i)
    const a0 = Math.PI + (i * Math.PI) / ARCH_N
    for (let j = 0; j < 900; j++) {
      const a = a0 + (r() * Math.PI) / ARCH_N
      const rad = ARCH_R + r() * ARCH_T
      const x = AX + rad * Math.cos(a)
      const y = GROUND + rad * Math.sin(a)
      const outer = (rad - ARCH_R) / ARCH_T
      const lit = Math.cos(a - (Math.PI * 1.72)) * 0.5 + 0.5
      if (r() < 0.25 + 0.5 * lit * outer) ctx.fillStyle = rgba(night > 0.5 ? [226, 214, 240] : [255, 250, 236], (night > 0.5 ? 0.16 : 0.3) * r() + 0.06)
      else ctx.fillStyle = rgba([20, 14, 6], 0.1 + 0.25 * r())
      ctx.beginPath()
      ctx.arc(x, y, 0.6 + r() * 0.9, 0, 6.2832)
      ctx.fill()
    }
    ctx.restore()
    if (p < 1) {
      // grains gathering into the stone as it sets
      const r2 = rng(700 + i)
      const pal = night > 0.5 ? SAND_NIGHT : SAND_DAY
      const am = Math.PI + ((i + 0.5) * Math.PI) / ARCH_N
      const sx = AX + (ARCH_R + ARCH_T / 2) * Math.cos(am)
      const sy = GROUND + (ARCH_R + ARCH_T / 2) * Math.sin(am)
      for (let j = 0; j < 260; j++) {
        const f = Math.pow(r2(), 0.6)
        const spread = (1 - p) * 120 + 26
        const x = sx + gz(r2) * spread * f + (AX - sx) * (1 - p) * f * 0.5
        const y = sy + gz(r2) * spread * f + (GROUND - 30 - sy) * (1 - p) * f * 0.6
        ctx.fillStyle = rgba(pal[Math.floor(r2() * pal.length)], 0.8)
        ctx.beginPath()
        ctx.arc(x, y, 0.8 + r2() * 1.2, 0, 6.2832)
        ctx.fill()
      }
    }
  }
}

/* ---------- the strider ---------- */

function strider(ctx: Ctx, x: number, footY: number, h: number, alpha: number, shadow: number) {
  if (alpha <= 0) return
  const s = h / 330
  ctx.save()
  ctx.globalAlpha = alpha
  // long dawn shadow, thrown toward the viewer and away from the sun
  ctx.save()
  ctx.translate(x, footY)
  ctx.transform(1, 0, 1.9, -0.32, 0, 0)
  ctx.scale(-s, s)
  ctx.translate(-215, -604)
  ctx.globalAlpha = alpha * shadow
  ctx.fillStyle = "rgba(31,27,20,.5)"
  ctx.filter = "blur(3px)"
  figure(ctx)
  ctx.restore()
  ctx.translate(x, footY)
  ctx.scale(-s, s) // mirrored: it walks toward the light
  ctx.translate(-215, -604)
  const g = ctx.createLinearGradient(60, 270, 380, 600)
  g.addColorStop(0, "#3a342a")
  g.addColorStop(1, "#0f0d09")
  ctx.fillStyle = g
  figure(ctx)
  ctx.restore()
}

function figure(ctx: Ctx) {
  ctx.beginPath()
  ctx.arc(286, 272, 14.5, 0, 6.2832)
  ctx.fill()
  const p = (d: string) => ctx.fill(new Path2D(d))
  p("M 262 297 C 276 288 293 293 293 314 L 290 398 L 246 398 C 239 368 240 328 262 297 Z") // torso
  p("M 292 390 L 262 440 C 204 520 124 574 58 604 C 112 558 190 478 246 392 Z") // the long leg
  p("M 262 436 L 291 388 C 332 448 362 520 373 590 C 346 530 306 472 262 440 Z") // the other leg
  p("M 260 300 L 215 343 L 213 400 L 222 371 L 229 351 L 264 324 Z") // arm
}

/* ---------- film grain and finish ---------- */

function makeNoise(): HTMLCanvasElement {
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
    img.data[i + 3] = Math.abs(v - 0.5) * 2 * 22
  }
  ctx.putImageData(img, 0, 0)
  return cv
}

/* ---------- the painter ---------- */

function paint(ctx: Ctx, t: number, land: { day: HTMLCanvasElement; night: HTMLCanvasElement; noise: HTMLCanvasElement }) {
  const n = nightAt(t)
  const glow = glowAt(t)

  // sky
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(mix(hex(C.surface), [22, 19, 38], n), 1))
  sky.addColorStop(0.62, rgba(mix(hex(C.paper), hex(C.dusk2), n), 1))
  sky.addColorStop(1, rgba(mix(hex(C.paper), hex(C.dusk1), n), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  const landIn = ramp(t, 11.2, 13.2)
  const first = 1 - landIn // the first world: the ball and the funnel

  // warm light low in the sky
  if (glow > 0) {
    const horizon = first > 0.5 ? 800 : 700
    const sx = first > 0.5 ? 1700 : t > 27 ? AX : 420
    const g = ctx.createRadialGradient(sx, horizon, 0, sx, horizon, 1300)
    g.addColorStop(0, `rgba(232,196,128,${0.62 * glow})`)
    g.addColorStop(0.35, `rgba(214,160,110,${0.3 * glow})`)
    g.addColorStop(1, "rgba(200,169,110,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // stars
  if (n > 0.3) {
    const r = rng(11)
    for (let i = 0; i < 260; i++) {
      const x = r() * W, y = r() * 620, s = r(), tw = 0.6 + 0.4 * Math.sin(t * (1 + s * 2) + i)
      ctx.fillStyle = `rgba(241,236,223,${((n - 0.3) / 0.7) * (0.12 + 0.5 * s * s) * tw * (1 - y / 760)})`
      ctx.beginPath()
      ctx.arc(x, y, 0.5 + s * 1.1, 0, 6.2832)
      ctx.fill()
    }
  }

  if (first > 0) sceneOne(ctx, t, n, first)
  if (landIn > 0) sceneLand(ctx, t, n, landIn, land)

  // finish: vignette and grain
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05)
  vg.addColorStop(0, "rgba(0,0,0,0)")
  vg.addColorStop(1, n > 0.5 ? "rgba(4,3,10,.55)" : "rgba(87,73,46,.09)")
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)
  ctx.globalAlpha = 0.9
  ctx.drawImage(land.noise, 0, 0)
  ctx.globalAlpha = 1
}

/* The first world: one grain, then the funnel and the ball, then the wind. */
const BX = AX
const BY = 668
const BR = 128
const FLOOR = BY + BR - 4

function funnelSide(sign: number, y: number) {
  // wide past the edges of the frame at the top, a narrow neck above the ball
  const u = Math.min(1, Math.max(0, (y + 30) / 500))
  return BX + sign * (22 + 1040 * Math.pow(1 - u, 2.5))
}
const F_TOP = -30

function sceneOne(ctx: Ctx, t: number, n: number, o: number) {
  ctx.save()
  ctx.globalAlpha = o

  // the floor: a line of light and its fall-off
  const fl = ramp(t, 2.6, 4)
  if (fl > 0) {
    const g = ctx.createLinearGradient(0, FLOOR, 0, H)
    g.addColorStop(0, n > 0.5 ? `rgba(14,12,26,${0.85 * fl})` : `rgba(206,197,176,${0.75 * fl})`)
    g.addColorStop(1, n > 0.5 ? `rgba(8,7,16,${0.9 * fl})` : `rgba(226,219,202,${0.4 * fl})`)
    ctx.fillStyle = g
    ctx.fillRect(0, FLOOR, W, H - FLOOR)
    const lg = ctx.createLinearGradient(0, 0, W, 0)
    const lc = n > 0.5 ? "214,200,240" : "126,94,38"
    lg.addColorStop(0, `rgba(${lc},0)`)
    lg.addColorStop(0.5, `rgba(${lc},${0.45 * fl})`)
    lg.addColorStop(1, `rgba(${lc},0)`)
    ctx.fillStyle = lg
    ctx.fillRect(0, FLOOR - 1, W, 2)
  }

  // 0..3 one grain falls and lands
  const one = 1 - ramp(t, 3.0, 3.6)
  if (one > 0) {
    const landY = 792
    const f = Math.min(1, t / 2.3)
    const gy = -40 + (landY + 40) * f * f
    const landed = ramp(t, 2.3, 2.34)
    halo(ctx, BX, gy, 150, [232, 205, 150], 0.4 * one)
    if (!landed) {
      const tr = ctx.createLinearGradient(0, gy - 190 * f, 0, gy)
      tr.addColorStop(0, "rgba(232,205,150,0)")
      tr.addColorStop(1, `rgba(246,230,192,${0.75 * one})`)
      ctx.strokeStyle = tr
      ctx.lineWidth = 2.2
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(BX, gy - 190 * f)
      ctx.lineTo(BX, gy)
      ctx.stroke()
    } else {
      const rp = ramp(t, 2.3, 3.3)
      ctx.strokeStyle = `rgba(232,205,150,${0.6 * (1 - rp) * one})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.ellipse(BX, landY + 5, 20 + 220 * rp, (20 + 220 * rp) * 0.16, 0, 0, 6.2832)
      ctx.stroke()
    }
    ctx.fillStyle = `rgba(255,244,214,${one})`
    ctx.beginPath()
    ctx.arc(BX, gy, 4.6, 0, 6.2832)
    ctx.fill()
  }

  // 3.. the ball and the funnel arrive
  const ballIn = ramp(t, 3.0, 4.2)
  const pour = ramp(t, 3.6, 4.6) * (1 - ramp(t, 7.7, 8.3))
  const full = ramp(t, 4.2, 7.8) // how heaped it is
  const blown = ramp(t, 8.3, 11.4)
  const strain = ramp(t, 5.4, 7.6) * (1 - ramp(t, 8, 8.8))

  if (ballIn > 0) {
    // funnel: two fine lines and a breath of glass between them
    ctx.save()
    ctx.globalAlpha = o * ballIn * (1 - 0.55 * ramp(t, 8.4, 10))
    ctx.beginPath()
    for (let y = F_TOP; y <= 470; y += 6) y === F_TOP ? ctx.moveTo(funnelSide(-1, y), y) : ctx.lineTo(funnelSide(-1, y), y)
    for (let y = 470; y >= F_TOP; y -= 6) ctx.lineTo(funnelSide(1, y), y)
    ctx.closePath()
    const fg = ctx.createLinearGradient(0, 0, 0, 470)
    fg.addColorStop(0, n > 0.5 ? "rgba(214,200,240,0)" : "rgba(31,27,20,0)")
    fg.addColorStop(1, n > 0.5 ? "rgba(214,200,240,.07)" : "rgba(31,27,20,.05)")
    ctx.fillStyle = fg
    ctx.fill()
    for (const sgn of [-1, 1]) {
      ctx.beginPath()
      for (let y = F_TOP; y <= 470; y += 6) y === F_TOP ? ctx.moveTo(funnelSide(sgn, y), y) : ctx.lineTo(funnelSide(sgn, y), y)
      const lg = ctx.createLinearGradient(0, 0, 0, 470)
      const lc = n > 0.5 ? "226,214,240" : "31,27,20"
      lg.addColorStop(0, `rgba(${lc},0)`)
      lg.addColorStop(0.35, `rgba(${lc},.45)`)
      lg.addColorStop(1, `rgba(${lc},.85)`)
      ctx.strokeStyle = lg
      ctx.lineWidth = 2
      ctx.stroke()
    }
    ctx.restore()

    // sand in the funnel: it slides down the walls and crowds at the neck
    if (pour > 0) {
      const r = rng(31)
      const pal = n > 0.5 ? SAND_NIGHT : SAND_DAY
      const thick = 0.35 + 0.65 * full
      for (let i = 0; i < 5200; i++) {
        const a = r(), b = r() * 2 - 1, c = r(), d = r()
        if (d > pour * thick) continue
        const ph = (a + t * 0.55) % 1
        const y = -20 + 490 * Math.pow(ph, 1.5)
        const half = funnelSide(1, y) - BX
        // near the walls more than the middle, like sand on a slope
        const x = BX + Math.sign(b) * half * (1 - Math.pow(Math.abs(b), 2.2) * 0.98) * (y > 380 ? 1 : 0.985)
        const xx = y > 330 ? BX + (x - BX) * 1 : x
        const len = 3 + 14 * ph
        ctx.strokeStyle = rgba(pal[Math.floor(c * pal.length)], (0.4 + 0.6 * c) * Math.min(1, Math.max(0, (y + 10) / 190)))
        ctx.lineWidth = 0.9 + c * 1.4
        ctx.lineCap = "round"
        ctx.beginPath()
        const dxdy = (funnelSide(1, y - len) - funnelSide(1, y)) * Math.sign(b) * (1 - Math.pow(Math.abs(b), 2.2) * 0.98)
        ctx.moveTo(xx + dxdy, y - len)
        ctx.lineTo(xx, y)
        ctx.stroke()
      }
      // the neck stream down to the ball
      halo(ctx, BX, BY - BR - 10, 240, [232, 205, 150], 0.2 * pour * n)
      stream(ctx, t, BX, 440, BY - BR - 40 * full + 6, 12 + 12 * full, 2600, n, 33, pour * (0.4 + 0.6 * full))
    }

    // shadow / reflection under the ball
    const sh = ctx.createRadialGradient(BX, FLOOR + 8, 0, BX, FLOOR + 8, 300)
    sh.addColorStop(0, n > 0.5 ? `rgba(0,0,0,${0.6 * ballIn})` : `rgba(31,27,20,${0.34 * ballIn})`)
    sh.addColorStop(1, "rgba(0,0,0,0)")
    ctx.save()
    ctx.translate(n > 0.5 ? 0 : -150 * (1 - n), 0)
    ctx.scale(1, 0.14)
    ctx.fillStyle = sh
    ctx.fillRect(BX - 520, (FLOOR + 8) / 0.14 - 300, 1040, 600)
    ctx.restore()

    if (n < 1) {
      // morning sun low on the right: a long shadow to the left
      ctx.save()
      ctx.globalAlpha = o * ballIn * (1 - n)
      const sg = ctx.createLinearGradient(BX - 760, 0, BX + 40, 0)
      sg.addColorStop(0, "rgba(31,27,20,0)")
      sg.addColorStop(1, "rgba(31,27,20,.42)")
      ctx.fillStyle = sg
      ctx.filter = "blur(7px)"
      ctx.beginPath()
      ctx.ellipse(BX - 330, FLOOR + 16, 400, 20, 0, 0, 6.2832)
      ctx.fill()
      ctx.restore()
    }

    // the ball
    ctx.save()
    ctx.globalAlpha = o * ballIn
    if (strain > 0) {
      // it strains: rings of pressure, and heat showing through
      for (let i = 0; i < 3; i++) {
        const rr = BR + 22 + i * 26 + 5 * Math.sin(t * 5 + i)
        ctx.setLineDash([3, 9 + i * 3])
        ctx.strokeStyle = `rgba(232,205,150,${(0.6 - i * 0.16) * strain})`
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(BX, BY, rr, 0, 6.2832)
        ctx.stroke()
      }
      ctx.setLineDash([])
      halo(ctx, BX, BY, BR * 2.3, [232, 180, 110], 0.26 * strain)
    }
    const squash = 1 + 0.035 * strain
    ctx.translate(BX, BY + BR)
    ctx.scale(squash, 1 / squash)
    ctx.translate(-BX, -(BY + BR))
    const dayBall = 1 - n
    orb(ctx, BX, BY, BR, "night", 21, 1)
    if (dayBall > 0) orb(ctx, BX, BY, BR, "ink", 22, dayBall)
    if (strain > 0 || full > 0) {
      // the load glowing inside it, from the top down
      ctx.save()
      ctx.beginPath()
      ctx.arc(BX, BY, BR, 0, 6.2832)
      ctx.clip()
      const hot = full * (1 - blown) * n
      const hg = ctx.createRadialGradient(BX, BY - BR * 0.9, 0, BX, BY - BR * 0.9, BR * 1.7)
      hg.addColorStop(0, `rgba(255,226,160,${0.85 * hot})`)
      hg.addColorStop(0.35, `rgba(214,150,80,${0.4 * hot})`)
      hg.addColorStop(1, "rgba(200,120,60,0)")
      ctx.fillStyle = hg
      ctx.fillRect(BX - BR, BY - BR, BR * 2, BR * 2)
      ctx.restore()
    }
    ctx.restore()

    // the heap on the ball, and what runs off it
    const heapH = 96 * full * (1 - ramp(t, 8.3, 10.2))
    if (heapH > 1) {
      ctx.save()
      capHeap(ctx, heapH, n)
      ctx.restore()
      const r = rng(41)
      const pal = n > 0.5 ? SAND_NIGHT : SAND_DAY
      // rivulets down both shoulders, then off into the air and onto the floor
      for (let i = 0; i < 2600; i++) {
        const a = r(), sgn = r() > 0.5 ? 1 : -1, c = r(), d = r(), e = r()
        if (d > full * (1 - blown)) continue
        const ph = (a + t * 0.5) % 1
        const ang = -Math.PI / 2 + sgn * (0.3 + 1.2 * Math.min(1, ph * 1.6))
        let x: number, y: number
        if (ph < 0.62) {
          const rad = BR + 1 + e * 5
          x = BX + rad * Math.cos(ang)
          y = BY + rad * Math.sin(ang)
        } else {
          const q = (ph - 0.62) / 0.38
          const a1 = -Math.PI / 2 + sgn * 1.5
          x = BX + (BR + 4) * Math.cos(a1) + sgn * (10 + e * 46) * q
          y = BY + (BR + 4) * Math.sin(a1) + (FLOOR - BY - 4) * q * q
        }
        ctx.fillStyle = rgba(pal[Math.floor(c * pal.length)], 0.6 + 0.4 * c)
        ctx.beginPath()
        ctx.arc(x, y, 0.7 + c * 1.2, 0, 6.2832)
        ctx.fill()
      }
      // small heaps where it lands on the floor
      const fh = 30 * full * (1 - ramp(t, 8.6, 10.6))
      pile(ctx, BX - BR - 34, FLOOR + 3, fh, n, 45)
      pile(ctx, BX + BR + 34, FLOOR + 3, fh * 0.9, n, 46)
    }
  }

  // 8.. morning wind: the heap lifts off as dust and is gone
  const wind = ramp(t, 8.3, 9.2) * (1 - ramp(t, 11, 12))
  if (wind > 0) {
    const r = rng(53)
    const lift = ramp(t, 8.3, 11.6)
    for (let i = 0; i < 6; i++) {
      const hx = BX + 180 + i * 190 + 200 * lift
      const hy = BY - BR - 60 - i * 34 - 30 * Math.sin(i * 1.7)
      halo(ctx, hx, hy, 260 - i * 14, [200, 169, 110], 0.11 * wind * (1 - i / 7))
    }
    for (let i = 0; i < 46000; i++) {
      const a = r(), b = r(), c = r(), d = r(), e = r(), g2 = gz(r)
      if (d > wind) continue
      const age = (a * 0.92 + lift * 0.7) % 1
      // dust travels in strands: each grain rides one, and the strands fray as they go
      const strand = Math.floor(c * 9)
      const sp = strand * 2.39
      const sa = -Math.PI / 2 + (b - 0.5) * 1.7
      const sr = BR + 3 + e * 46 * (1 - age)
      const sx = BX + sr * Math.cos(sa)
      const sy = BY + sr * Math.sin(sa)
      const far = Math.pow(age, 1.3)
      const x = sx + far * (1180 + 240 * Math.sin(sp))
      const centre = -far * (70 + 34 * strand) - 70 * far * Math.sin(far * (4.2 + (strand % 3)) + sp + t * 0.9) - 60 * far * far
      const y = sy + centre + g2 * (5 + 74 * far) * (0.5 + 0.5 * e)
      const al = Math.pow(1 - age, 1.15) * (0.25 + 0.6 * e) * wind
      const len = 1 + 9 * far * e
      ctx.strokeStyle = rgba(SAND_DAY[Math.floor(b * SAND_DAY.length)], al)
      ctx.lineWidth = 0.6 + e * 1.1 * (1 - far * 0.55)
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(x - len, y + len * 0.12)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
  ctx.restore()
}

/** The heap that sits on top of the ball: a cap that follows the curve, peaked under the stream. */
function capHeap(ctx: Ctx, h: number, n: number) {
  const spread = 0.42 + 0.5 * (h / 96)
  const pal = n > 0.5 ? SAND_NIGHT : SAND_DAY
  const top = (a: number) => {
    const u = Math.abs(a) / spread
    if (u >= 1) return BR
    return BR + h * Math.pow(1 - u, 1.15) * (1 - 0.25 * (1 - u))
  }
  ctx.beginPath()
  for (let a = -spread; a <= spread; a += 0.01) {
    const rad = top(a)
    const x = BX + rad * Math.sin(a), y = BY - rad * Math.cos(a)
    a === -spread ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  for (let a = spread; a >= -spread; a -= 0.02) ctx.lineTo(BX + (BR - 1) * Math.sin(a), BY - (BR - 1) * Math.cos(a))
  ctx.closePath()
  const g = ctx.createLinearGradient(BX - BR, 0, BX + BR, 0)
  if (n > 0.5) { g.addColorStop(0, "#6b5730"); g.addColorStop(0.5, "#c8a96e"); g.addColorStop(1, "#f1dcab") }
  else { g.addColorStop(0, "#6b5a38"); g.addColorStop(0.5, "#b0935a"); g.addColorStop(1, "#dcc38a") }
  ctx.fillStyle = g
  ctx.fill()
  ctx.clip()
  const r = rng(43)
  for (let i = 0; i < 9000; i++) {
    const a = (r() * 2 - 1) * spread
    const rad = BR + Math.pow(r(), 0.7) * (top(a) - BR)
    const side = a / spread
    const c = r()
    const tone = Math.max(0, Math.min(pal.length - 1, Math.floor((0.5 + side * 0.4 + (c - 0.5) * 0.9) * pal.length)))
    ctx.fillStyle = rgba(pal[tone], 0.5 + 0.5 * r())
    ctx.beginPath()
    ctx.arc(BX + rad * Math.sin(a), BY - rad * Math.cos(a), 0.7 + r() * 1.2, 0, 6.2832)
    ctx.fill()
  }
}

/* The second world: the land, the arch, the model above it, the strider. */
const MX = AX
const MY = 366
const MR = 37

function sceneLand(ctx: Ctx, t: number, n: number, o: number, land: { day: HTMLCanvasElement; night: HTMLCanvasElement }) {
  ctx.save()
  ctx.globalAlpha = o

  const dawnSun = k(t, [[30.6, 0], [33.2, 1]])
  // the sun comes up inside the arch
  if (dawnSun > 0) {
    const sy = GROUND + 60 - 150 * dawnSun
    halo(ctx, AX, sy, 520, [246, 214, 150], 0.75 * dawnSun)
    const sg = ctx.createRadialGradient(AX + 14, sy - 16, 4, AX, sy, 84)
    sg.addColorStop(0, "#fff6dc")
    sg.addColorStop(1, "#e3bf7a")
    ctx.fillStyle = sg
    ctx.beginPath()
    ctx.arc(AX, sy, 84, 0, 6.2832)
    ctx.fill()
  }
  // the day's sun going down at dusk
  const dusk = win(t, 19.4, 25, 1.4)
  if (dusk > 0) {
    const f = ramp(t, 19.4, 24.6)
    const sx = 430 - 130 * f, sy = 250 + 440 * f * f
    halo(ctx, sx, sy, 420, [246, 206, 140], 0.6 * dusk)
    const sg = ctx.createRadialGradient(sx + 10, sy - 12, 4, sx, sy, 62)
    sg.addColorStop(0, "#fff3d6")
    sg.addColorStop(1, "#dcae6a")
    ctx.fillStyle = sg
    ctx.globalAlpha = o * dusk
    ctx.beginPath()
    ctx.arc(sx, sy, 62, 0, 6.2832)
    ctx.fill()
    ctx.globalAlpha = o
  }

  // the land: painted once, never moved
  ctx.globalAlpha = o
  ctx.drawImage(land.day, 0, 0)
  if (n > 0) {
    ctx.globalAlpha = o * n
    ctx.drawImage(land.night, 0, 0)
    ctx.globalAlpha = o
  }
  // dusk and dawn warm the crests
  const warm = glowAt(t)
  if (warm > 0 && t > 12) {
    ctx.save()
    tracePath(ctx, LAND[0])
    ctx.clip()
    ctx.globalCompositeOperation = "soft-light"
    const wg = ctx.createLinearGradient(0, 600, 0, H)
    wg.addColorStop(0, `rgba(240,190,110,${0.7 * warm})`)
    wg.addColorStop(1, `rgba(120,70,90,${0.5 * warm})`)
    ctx.fillStyle = wg
    ctx.fillRect(0, 560, W, H - 560)
    ctx.restore()
  }

  const grow = ramp(t, 19, 24.4)
  paintRich(ctx, grow, n)

  // 12..19 the same sand falls again, lands, and stays
  const pour = ramp(t, 12.2, 13) * (1 - ramp(t, 17.6, 18.3))
  const heap = k(t, [[12.6, 0], [17.8, 1]]) * (1 - 0.35 * ramp(t, 18.2, 24))
  const built = ramp(t, 13.6, 19)
  const heapH = 104 * heap
  pile(ctx, AX, GROUND + 4, heapH, n, 81)
  if (pour > 0) {
    stream(ctx, t, AX, -30, GROUND - heapH + 8, 15, 3400, n, 83, pour)
    splash(ctx, t, AX, GROUND - heapH + 6, pour, n, 85)
  }
  arch(ctx, built, n)

  // 19.. the model: one small gold ball, and the thin thread it takes
  const model = ramp(t, 18.6, 20)
  const swap = ramp(t, 26.6, 29.2) // 0 gold in the seat, 1 the new one in the seat
  const out = k(t, [[26.5, 0], [29.0, 1]])
  const inn = k(t, [[26.9, 0], [29.8, 1]])
  if (model > 0) {
    const top = GROUND - ARCH_R - ARCH_T
    // the seat: a fine ring that stays where the model sits
    ctx.strokeStyle = rgba(n > 0.5 ? [232, 205, 150] : hex(C.goldInk), 0.55 * model)
    ctx.lineWidth = 1.3
    ctx.setLineDash([2, 7])
    ctx.beginPath()
    ctx.arc(MX, MY, MR + 16, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
    // the thread: a few grains at a time, rising from the keystone
    const taking = model * (1 - win(t, 26.9, 29.4, 0.5) * 0.85)
    const r = rng(95)
    const pal = n > 0.5 ? SAND_NIGHT : SAND_DAY
    if (n > 0.2) {
      const tg = ctx.createLinearGradient(0, MY + MR, 0, top)
      tg.addColorStop(0, `rgba(232,205,150,${0.5 * n * taking})`)
      tg.addColorStop(1, `rgba(232,205,150,${0.12 * n * taking})`)
      ctx.strokeStyle = tg
      ctx.lineWidth = 5
      ctx.filter = "blur(4px)"
      ctx.beginPath()
      ctx.moveTo(MX, MY + MR + 16)
      ctx.lineTo(MX, top)
      ctx.stroke()
      ctx.filter = "none"
    }
    for (let i = 0; i < 150; i++) {
      const a = r(), b = gz(r), c = r()
      if (c > taking) continue
      const ph = (a + t * 0.35) % 1
      const y = top - (top - MY - MR - 16) * ph
      ctx.fillStyle = rgba(pal[Math.floor(r() * pal.length)], 0.9)
      ctx.beginPath()
      ctx.arc(MX + b * 2.2, y, 0.9 + r() * 1.2, 0, 6.2832)
      ctx.fill()
    }
    ctx.strokeStyle = rgba(n > 0.5 ? [232, 205, 150] : hex(C.goldInk), 0.5 * taking)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(MX, MY + MR + 16)
    ctx.lineTo(MX, top)
    ctx.stroke()

    // the gold ball: in the seat, then lifted out up and to the right
    const gx = MX + 560 * out * out
    const gy = MY - 330 * Math.pow(out, 1.4)
    const goldA = model * (1 - ramp(out, 0.82, 1))
    if (goldA > 0) {
      if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.5 * goldA * Math.min(1, out * 4))
      halo(ctx, gx, gy, MR * (3.4 + 2 * n), [232, 205, 150], (0.3 + 0.35 * n) * goldA)
      orb(ctx, gx, gy, MR * (1 - 0.12 * out), "gold", 97, goldA)
    }
    // the different ball: it comes down from the upper left into the same seat
    if (inn > 0) {
      const e = 1 - Math.pow(1 - inn, 2.2)
      const px = MX - 520 * (1 - e) * (1 - e)
      const py = MY - 300 * Math.pow(1 - e, 1.5)
      const pa = ramp(inn, 0, 0.2)
      if (inn < 0.98) trail(ctx, MX - 520, MY - 300, px, py, [214, 200, 240], 0.45 * pa * (1 - inn))
      halo(ctx, px, py, MR * 4.6, [214, 200, 240], 0.42 * pa * Math.max(n, 0.4))
      orb(ctx, px, py, MR * 1.06, "pearl", 99, pa)
    }
    void swap
  }

  // 31.. the strider crosses the finished land toward the light
  const walk = ramp(t, 30.8, 34.6)
  const st = ramp(t, 30.8, 31.8)
  if (st > 0) {
    const sx = 330 + 300 * walk
    strider(ctx, sx, LAND[2](sx) + 10, 236, st, dawnSun)
  }
  ctx.restore()
}

/** The path a ball has just travelled: a fine arc that fades behind it. */
function trail(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, c: RGB, a: number) {
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

/* ---------- the film ---------- */

const Big = ({ o, top, color, italic = false, children, size = 92 }: { o: number; top: number; color: string; italic?: boolean; children: string; size?: number }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", fontFamily, fontWeight: 500, fontStyle: italic ? "italic" : "normal", fontSize: size, lineHeight: 1.1, letterSpacing: "-0.01em", color, opacity: o }}>
    {children}
  </div>
)

export const Film = () => {
  const t = useCurrentFrame() / FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const land = useMemo(() => ({ day: paintLand(false), night: paintLand(true), noise: makeNoise() }), [])

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    paint(ctx, t, land)
  }, [t, land])

  const n = nightAt(t)
  const dark = n > 0.5
  return (
    <AbsoluteFill style={{ background: C.dusk1, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${fit})`, transformOrigin: "0 0" }}>
        <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />

        {/* the question */}
        <Big o={win(t, 0.3, 3.1, 0.5)} top={330} color={C.paper}>Where does the memory live?</Big>

        {/* the captions */}
        {CAPTIONS.map((c) => {
          const o = win(t, c.at + 0.2, c.to, 0.45)
          if (o <= 0) return null
          const rise = (1 - ramp(t, c.at + 0.2, c.at + 0.8)) * 14
          return (
            <div
              key={c.at}
              style={{
                position: "absolute", left: "8%", right: "8%", bottom: "6.5%", textAlign: "center", fontFamily, fontWeight: 500, fontSize: 54, lineHeight: 1.2,
                color: dark ? C.paper : C.ink, opacity: o, transform: `translateY(${rise}px)`, padding: "14px 32px",
                textShadow: dark ? `0 0 18px rgba(22,19,38,1), 0 0 6px rgba(22,19,38,.9)` : `0 0 18px rgba(244,239,228,1), 0 0 6px rgba(244,239,228,.9)`,
              }}
            >
              {c.text}
            </div>
          )
        })}

        {/* the close: the page headline, word for word */}
        <Big o={win(t, 31.4, 34.5, 0.6)} top={84} color={C.ink}>The model changes.</Big>
        <Big o={win(t, 32.2, 34.5, 0.6)} top={190} color={C.goldInk} italic>The memory is yours.</Big>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "7%", textAlign: "center", fontFamily, fontWeight: 500, fontSize: 30, letterSpacing: "0.24em", color: C.ink, opacity: win(t, 32.8, 34.5, 0.6) * 0.85, textShadow: "0 0 14px rgba(250,247,240,1)" }}>LONGSTRIDER</div>
      </div>
    </AbsoluteFill>
  )
}
