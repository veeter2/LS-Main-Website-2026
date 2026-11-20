import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
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

/* ---------- the land: one painting, relit ---------- */

/** Where the sand lands on the road, and where the model sits above it. One axis. */
const SX = 1040
const LY = 912

export type Plates = {
  day: HTMLCanvasElement
  grey: HTMLCanvasElement
  gold: HTMLCanvasElement
  goldGlow: HTMLCanvasElement
  strider: HTMLCanvasElement
  stars: [number, number, number][]
  noise: HTMLCanvasElement
}

const blank = (w: number, h: number) => {
  const cv = document.createElement("canvas")
  cv.width = w
  cv.height = h
  return cv
}

/**
 * Everything the film needs from the paintings, made once:
 * the land by day, the same land before any gold reached it, the gold on its own (so it can glow at night),
 * where the open sky is (for stars), and the strider lifted off his own painting.
 */
export function buildPlates(landImg: HTMLImageElement, striderImg: HTMLImageElement): Plates {
  const day = blank(W, H)
  const dctx = day.getContext("2d")!
  dctx.imageSmoothingQuality = "high"
  dctx.drawImage(landImg, 0, 0, W, H)
  const src = dctx.getImageData(0, 0, W, H)
  const grey = blank(W, H)
  const gold = blank(W, H)
  const gctx = grey.getContext("2d")!
  const octx = gold.getContext("2d")!
  const gd = gctx.createImageData(W, H)
  const od = octx.createImageData(W, H)
  for (let i = 0; i < src.data.length; i += 4) {
    const r = src.data[i], g = src.data[i + 1], b = src.data[i + 2]
    const a = Math.max(0, Math.min(1, (r - b - 44) / 30)) * (r > 110 ? 1 : 0)
    const l = 0.3 * r + 0.59 * g + 0.11 * b
    gd.data[i] = r + (l + 6 - r) * a
    gd.data[i + 1] = g + (l + 3 - g) * a
    gd.data[i + 2] = b + (l - 4 - b) * a
    gd.data[i + 3] = 255
    od.data[i] = Math.min(255, r * 1.12 + 14)
    od.data[i + 1] = Math.min(255, g * 1.1 + 10)
    od.data[i + 2] = Math.min(255, b * 1.02)
    od.data[i + 3] = a * 255
  }
  gctx.putImageData(gd, 0, 0)
  octx.putImageData(od, 0, 0)
  const goldGlow = blank(W, H)
  const ggx = goldGlow.getContext("2d")!
  ggx.filter = "blur(9px)"
  ggx.drawImage(gold, 0, 0)
  ggx.filter = "blur(26px)"
  ggx.globalAlpha = 0.8
  ggx.drawImage(gold, 0, 0)

  // stars only where the painting is open sky
  const r = rng(11)
  const stars: [number, number, number][] = []
  for (let i = 0; i < 2600 && stars.length < 520; i++) {
    const x = Math.floor(r() * W), y = Math.floor(r() * 800), s = r()
    let sky = true
    for (const [ox, oy] of [[0, 0], [5, 0], [-5, 0], [0, 5], [0, -5]]) {
      const j = (Math.min(H - 1, Math.max(0, y + oy)) * W + Math.min(W - 1, Math.max(0, x + ox))) * 4
      if (src.data[j] < 238 || src.data[j] - src.data[j + 2] > 30) sky = false
    }
    if (sky) stars.push([x, y, s])
  }

  // the strider, lifted off the cream of his own painting
  const CW = 520, CH = 520
  const sp = blank(CW, CH)
  const sx = sp.getContext("2d")!
  sx.drawImage(striderImg, 900, 180, CW, CH, 0, 0, CW, CH)
  const sd = sx.getImageData(0, 0, CW, CH)
  const bg = [sd.data[(20 * CW + 20) * 4], sd.data[(20 * CW + 20) * 4 + 1], sd.data[(20 * CW + 20) * 4 + 2]]
  for (let y = 0; y < CH; y++) {
    for (let x = 0; x < CW; x++) {
      const j = (y * CW + x) * 4
      const cut = x < 300 ? 492 - (x / 300) * 22 : x < 350 ? 470 - ((x - 300) / 50) * 28 : 442 - ((x - 350) / 170) * 12
      const dr = bg[0] - sd.data[j], dg = bg[1] - sd.data[j + 1], db = bg[2] - sd.data[j + 2]
      const dist = Math.max(dr, dg, db)
      let a = Math.max(0, Math.min(1, (dist - 26) / 46))
      if (x > 404 || y < 70 || (x < 84 && y < 400) || (x < 215 && y < 330 && !(x > 158 && y > 78 && y < 118))) a = 0
      a *= Math.max(0, Math.min(1, (cut - y) / 5))
      if (a > 0.01) {
        sd.data[j] = Math.max(0, Math.min(255, (sd.data[j] - (1 - a) * bg[0]) / a))
        sd.data[j + 1] = Math.max(0, Math.min(255, (sd.data[j + 1] - (1 - a) * bg[1]) / a))
        sd.data[j + 2] = Math.max(0, Math.min(255, (sd.data[j + 2] - (1 - a) * bg[2]) / a))
      }
      sd.data[j + 3] = a * 255
    }
  }
  sx.putImageData(sd, 0, 0)
  return { day, grey, gold, goldGlow, strider: sp, stars, noise: makeNoise() }
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
    const x = x0 + b * width * stray * (0.5 + 0.5 * ph) + Math.sin(y * 0.021 + c * 6.28) * 0.7
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
    img.data[i + 3] = Math.abs(v - 0.5) * 2 * 9
  }
  ctx.putImageData(img, 0, 0)
  return cv
}

/* ---------- the painter ---------- */

function paint(ctx: Ctx, t: number, land: Plates) {
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
  if (glow > 0 && first > 0) {
    const horizon = 800
    const sx = 1700
    const g = ctx.createRadialGradient(sx, horizon, 0, sx, horizon, 1300)
    g.addColorStop(0, `rgba(232,196,128,${0.62 * glow})`)
    g.addColorStop(0.35, `rgba(214,160,110,${0.3 * glow})`)
    g.addColorStop(1, "rgba(200,169,110,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // stars
  if (n > 0.3 && first > 0) {
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

/* The second world: your land. One painting, relit. The sand lands on it and stays. */
const MX = SX
const MY = 318
const MR = 37

function sceneLand(ctx: Ctx, t: number, n: number, o: number, land: Plates) {
  ctx.save()
  ctx.globalAlpha = o

  // the land before the gold, then the gold spreading out from where the sand lands
  const gild = ramp(t, 13.2, 19.4)
  ctx.drawImage(gild >= 1 ? land.day : land.grey, 0, 0)
  if (gild > 0 && gild < 1) {
    const tmp = blank(W, H)
    const tx = tmp.getContext("2d")!
    tx.drawImage(land.day, 0, 0)
    tx.globalCompositeOperation = "destination-in"
    const rad = 60 + 2300 * gild * gild
    const mg = tx.createRadialGradient(SX, LY, rad * 0.55, SX, LY, rad)
    mg.addColorStop(0, "rgba(0,0,0,1)")
    mg.addColorStop(1, "rgba(0,0,0,0)")
    tx.fillStyle = mg
    tx.fillRect(0, 0, W, H)
    ctx.drawImage(tmp, 0, 0)
  }

  // the light: night is the same painting under a deep sky
  const warm = glowAt(t)
  if (n > 0) {
    ctx.save()
    ctx.globalCompositeOperation = "multiply"
    ctx.globalAlpha = o * n
    const ng = ctx.createLinearGradient(0, 0, 0, H)
    ng.addColorStop(0, "rgb(30,26,60)")
    ng.addColorStop(0.72, "rgb(74,62,112)")
    ng.addColorStop(1, "rgb(40,34,72)")
    ctx.fillStyle = ng
    ctx.fillRect(0, 0, W, H)
    ctx.restore()
  }
  if (warm > 0) {
    // the sun sits low inside the gateway at dusk and at dawn
    ctx.save()
    ctx.globalCompositeOperation = "soft-light"
    const wg = ctx.createRadialGradient(1600, 660, 0, 1600, 660, 1700)
    wg.addColorStop(0, `rgba(255,176,96,${0.95 * warm})`)
    wg.addColorStop(0.5, `rgba(240,150,110,${0.5 * warm})`)
    wg.addColorStop(1, "rgba(200,120,120,0)")
    ctx.fillStyle = wg
    ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = "screen"
    const sg = ctx.createRadialGradient(1600, 650, 0, 1600, 650, 620)
    sg.addColorStop(0, `rgba(255,214,150,${0.6 * warm})`)
    sg.addColorStop(1, "rgba(255,200,130,0)")
    ctx.fillStyle = sg
    ctx.fillRect(0, 0, W, H)
    ctx.restore()
  }
  if (n > 0) {
    // the gold keeps its own light after dark
    ctx.save()
    ctx.globalAlpha = o * n
    ctx.drawImage(land.gold, 0, 0)
    ctx.globalCompositeOperation = "lighter"
    ctx.globalAlpha = o * n * 0.85
    ctx.drawImage(land.goldGlow, 0, 0)
    ctx.restore()
    for (const [x, y, s] of land.stars) {
      const tw = 0.65 + 0.35 * Math.sin(t * (1 + s * 2) + x)
      ctx.fillStyle = `rgba(241,236,223,${Math.max(0, (n - 0.35) / 0.65) * (0.15 + 0.7 * s * s) * tw * (1 - y / 900)})`
      ctx.beginPath()
      ctx.arc(x, y, 0.6 + s * 1.2, 0, 6.2832)
      ctx.fill()
    }
  }

  // haze at the foot of the frame while there are words on it
  const words = win(t, 12.2, 31.2, 0.6)
  if (words > 0) {
    const mc = n > 0.5 ? "22,19,38" : "247,242,231"
    const mist = ctx.createLinearGradient(0, 905, 0, H)
    mist.addColorStop(0, `rgba(${mc},0)`)
    mist.addColorStop(0.6, `rgba(${mc},${0.9 * words})`)
    mist.addColorStop(1, `rgba(${mc},${0.96 * words})`)
    ctx.fillStyle = mist
    ctx.fillRect(0, 905, W, H - 905)
  }

  // 12..19 the same sand falls again, lands on the road, and stays
  const pour = ramp(t, 12.2, 13) * (1 - ramp(t, 17.8, 18.5))
  const heap = k(t, [[12.6, 0], [18, 1]])
  const heapH = 74 * heap
  // its shadow on the road
  if (heapH > 2) {
    ctx.save()
    ctx.filter = "blur(8px)"
    ctx.fillStyle = `rgba(31,27,20,${0.3 * (1 - n * 0.5)})`
    ctx.beginPath()
    ctx.ellipse(SX - heapH * 0.5, LY + 5, heapH * 1.9, heapH * 0.16, 0, 0, 6.2832)
    ctx.fill()
    ctx.restore()
  }
  if (n > 0.2 && heapH > 2) halo(ctx, SX, LY - heapH * 0.4, heapH * 3.2, [232, 205, 150], 0.3 * n)
  pile(ctx, SX, LY + 4, heapH, n, 81)
  if (pour > 0) {
    stream(ctx, t, SX, -30, LY - heapH + 8, 13, 3600, n, 83, pour)
    splash(ctx, t, SX, LY - heapH + 6, pour, n, 85)
  }

  // 19.. the model: one small gold ball, and the thin thread it takes
  const model = ramp(t, 18.8, 20.2)
  const out = k(t, [[26.5, 0], [29.0, 1]])
  const inn = k(t, [[26.9, 0], [29.8, 1]])
  if (model > 0) {
    const top = LY - heapH + 4
    const lineC: RGB = n > 0.5 ? [232, 205, 150] : hex(C.goldInk)
    ctx.strokeStyle = rgba(lineC, 0.6 * model)
    ctx.lineWidth = 1.4
    ctx.setLineDash([2, 7])
    ctx.beginPath()
    ctx.arc(MX, MY, MR + 16, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
    const taking = model * (1 - win(t, 26.9, 29.4, 0.5) * 0.85)
    const r = rng(95)
    const pal = n > 0.5 ? SAND_NIGHT : SAND_DAY
    if (n > 0.2) {
      ctx.save()
      const tg = ctx.createLinearGradient(0, MY + MR, 0, top)
      tg.addColorStop(0, `rgba(232,205,150,${0.45 * n * taking})`)
      tg.addColorStop(1, `rgba(232,205,150,${0.2 * n * taking})`)
      ctx.strokeStyle = tg
      ctx.lineWidth = 6
      ctx.filter = "blur(5px)"
      ctx.beginPath()
      ctx.moveTo(MX, MY + MR + 16)
      ctx.lineTo(MX, top)
      ctx.stroke()
      ctx.restore()
    }
    ctx.strokeStyle = rgba(lineC, 0.55 * taking)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(MX, MY + MR + 16)
    ctx.lineTo(MX, top)
    ctx.stroke()
    for (let i = 0; i < 420; i++) {
      const a = r(), b = gz(r), c = r(), e = r()
      if (c > taking * (0.4 + 0.6 * n)) continue
      const ph = (a + t * 0.3) % 1
      const y = top - (top - MY - MR - 16) * ph
      ctx.fillStyle = rgba(pal[Math.floor(e * pal.length)], 0.92)
      ctx.beginPath()
      ctx.arc(MX + b * 2.4, y, 0.9 + e * 1.3, 0, 6.2832)
      ctx.fill()
    }

    // the gold ball: in the seat, then lifted out up and to the right
    const gx = MX + 420 * out * out
    const gy = MY - 250 * Math.pow(out, 1.4)
    const goldA = model * (1 - ramp(out, 0.84, 1))
    if (goldA > 0) {
      if (out > 0.02) trail(ctx, MX, MY, gx, gy, [232, 205, 150], 0.55 * goldA * Math.min(1, out * 4))
      halo(ctx, gx, gy, MR * (3.4 + 2 * n), [232, 205, 150], (0.3 + 0.35 * n) * goldA)
      orb(ctx, gx, gy, MR * (1 - 0.1 * out), "gold", 97, goldA)
    }
    // the different ball: down from the upper left into the same seat
    if (inn > 0) {
      const e = 1 - Math.pow(1 - inn, 2.2)
      const px = MX - 560 * (1 - e) * (1 - e)
      const py = MY - 230 * Math.pow(1 - e, 1.5)
      const pa = ramp(inn, 0, 0.2)
      if (inn < 0.98) trail(ctx, MX - 560, MY - 230, px, py, [214, 200, 240], 0.5 * pa * (1 - inn))
      halo(ctx, px, py, MR * 4.6, [214, 200, 240], 0.42 * pa * Math.max(n, 0.35))
      orb(ctx, px, py, MR * 1.06, "pearl", 99, pa)
    }
  }

  // 31.. the strider crosses the finished land toward the light
  const st = ramp(t, 30.9, 32)
  if (st > 0) {
    const walk = ramp(t, 30.9, 34.8)
    const s = 0.82
    const fx = 470 + 150 * walk
    const fy = 992 - 16 * walk
    ctx.save()
    ctx.globalAlpha = o * st
    ctx.drawImage(land.strider, fx - 215 * s, fy - 478 * s, 520 * s, 520 * s)
    ctx.restore()
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

const Big = ({ o, top, color, italic = false, children, size = 92, left }: { o: number; top: number; color: string; italic?: boolean; children: string; size?: number; left?: number }) => (
  <div style={{ position: "absolute", left: left ?? 0, right: 0, top, textAlign: left === undefined ? "center" : "left", fontFamily, fontWeight: 500, fontStyle: italic ? "italic" : "normal", fontSize: size, lineHeight: 1.1, letterSpacing: "-0.01em", color, opacity: o }}>
    {children}
  </div>
)

export const Film = () => {
  const t = useCurrentFrame() / FPS
  const { width: vw } = useVideoConfig()
  const fit = vw / W
  const ref = useRef<HTMLCanvasElement>(null)
  const [land, setLand] = useState<Plates | null>(null)
  const [handle] = useState(() => delayRender("paintings"))
  const released = useRef(false)

  useEffect(() => {
    const load = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const im = new Image()
        im.onload = () => res(im)
        im.onerror = rej
        im.src = src
      })
    Promise.all([load(staticFile("art/land.png")), load(staticFile("art/strider-src.png"))]).then(([a, b]) => setLand(buildPlates(a, b)))
  }, [])

  useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d")
    if (!ctx || !land) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.clearRect(0, 0, W, H)
    paint(ctx, t, land)
    if (!released.current) {
      released.current = true
      continueRender(handle)
    }
  }, [t, land, handle])

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
        <Big o={win(t, 31.4, 34.5, 0.6)} top={140} left={140} color={C.ink} size={80}>The model changes.</Big>
        <Big o={win(t, 32.2, 34.5, 0.6)} top={236} left={140} color={C.goldInk} italic size={80}>The memory is yours.</Big>
        <div style={{ position: "absolute", left: 146, top: 368, fontFamily, fontWeight: 500, fontSize: 30, letterSpacing: "0.24em", color: C.ink, opacity: win(t, 32.8, 34.5, 0.6) * 0.85, textShadow: "0 0 14px rgba(250,247,240,1)" }}>LONGSTRIDER</div>
      </div>
    </AbsoluteFill>
  )
}
