import { C } from "../beats"
import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type RGB, W, gz, halo, hex, lin, mix, orb, rgba, spline } from "./core"
import { spark } from "./cost"
import { compose, roadAt } from "./land"
import { type Plates, camT, depthAt, warp } from "./plates"
import { strider } from "./strider"

/**
 * The connectors film: where does the work go?
 * This one leaves the dune. It lives in the orbit painting: ribbons of grain, thin gold orbit lines, a sun.
 * Five ribbons of work braid into one surface of dots that sort into clusters. The sun is the model: it lights
 * the surface and holds none of it. Experts ride the orbit lines and each draws a thread from a cluster.
 */
export const CONNECT_SECONDS = 36.5

/** The painting is 1400 x 650. It is laid over a world 1080 high, so the camera has room to travel sideways. */
const PS = H / 650
export const PW = Math.round(1400 * PS)
const SUN: [number, number] = [1022 * PS, 240 * PS]
const SUN_R = 152
const INKC: RGB = [46, 42, 36]
const GOLD: RGB = [176, 124, 30]
const GOLD_HI: RGB = [226, 178, 84]

export type Scene = { paint: HTMLImageElement; paper: RGB; land: Plates }

/** Where the camera looks, and how close. It rides in with the ribbons, pulls back to find the sun, then drifts. */
const camAt = (t: number) => ({
  x: spline(t, [[0, 520], [8, 730], [12.3, 760], [14.8, 1062], [25, 1078], [33, 1092], [36.5, 1092]]),
  y: spline(t, [[0, 630], [8, 668], [12.3, 660], [14.8, 540], [36.5, 540]]),
  z: spline(t, [[0, 1.56], [8, 1.36], [12.3, 1.3], [14.8, 1.0], [25, 1.02], [33, 1.04], [36.5, 1.04]]),
})
/** Layers nearer the lens move more than the painting does. `near` is how much nearer: 0 is the painting itself. */
function layer(ctx: Ctx, t: number, near: number) {
  const c = camAt(t)
  const z = c.z * (1 + near)
  ctx.setTransform(z, 0, 0, z, W / 2 - c.x * z, H / 2 - c.y * z)
}

/* ---------- the five ribbons ---------- */

type Pt = [number, number]
const bez = (p: Pt[], u: number): Pt => {
  const v = 1 - u
  return [v * v * v * p[0][0] + 3 * v * v * u * p[1][0] + 3 * v * u * u * p[2][0] + u * u * u * p[3][0], v * v * v * p[0][1] + 3 * v * v * u * p[1][1] + 3 * v * u * u * p[2][1] + u * u * u * p[3][1]]
}
/** Where they meet, and where the braid lets go of its dots. */
const J0: Pt = [420, 706]
const J1: Pt = [800, 600]
const TRUNK: Pt[] = [J0, [540, 690], [680, 640], J1]
type Rib = { name: string; path: Pt[]; w: number; n: number; speed: number; size: number; tone: RGB; edge: number; wave: number; h0: number; flat: number }
const RIBS: Rib[] = [
  // chat: quick and light
  { name: "chat", path: [[-120, 250], [140, 300], [250, 600], J0], w: 16, n: 520, speed: 0.3, size: 0.9, tone: [120, 112, 100], edge: 0.9, wave: 0, h0: 0.06, flat: 0 },
  // documents: slow and heavy
  { name: "documents", path: [[-120, 1040], [130, 1010], [280, 800], J0], w: 62, n: 2300, speed: 0.07, size: 1.5, tone: [36, 33, 28], edge: 2.2, wave: 0, h0: 0.06, flat: 0 },
  // files: flat
  { name: "files", path: [[-120, 640], [80, 640], [260, 690], J0], w: 34, n: 1200, speed: 0.13, size: 1.15, tone: [84, 78, 68], edge: 1.2, wave: 0, h0: 0.05, flat: 1 },
  // a call: it wavers
  { name: "call", path: [[850, -120], [760, 260], [560, 560], J0], w: 24, n: 900, speed: 0.19, size: 1.0, tone: [70, 64, 82], edge: 1.4, wave: 15, h0: 0.36, flat: 0 },
  // a teammate: warm
  { name: "teammate", path: [[1700, 1200], [1100, 1100], [640, 900], J0], w: 30, n: 1100, speed: 0.15, size: 1.25, tone: [150, 104, 34], edge: 1.6, wave: 0, h0: 0.42, flat: 0 },
]
/** A point along a ribbon: the way in for the first 3/4, then the shared braid. */
function along(r: Rib, i: number, u: number, t: number): [number, number, number, number] {
  const cut = 0.74
  const at = (q: number): Pt => (q < cut ? bez(r.path, q / cut) : bez(TRUNK, (q - cut) / (1 - cut)))
  const [x, y] = at(u)
  const [x2, y2] = at(Math.min(1, u + 0.01))
  const d = Math.hypot(x2 - x, y2 - y) || 1
  let nx = -(y2 - y) / d, ny = (x2 - x) / d
  // in the braid the five cross over and under each other
  const braid = u > cut ? Math.sin(((u - cut) / (1 - cut)) * Math.PI * 2.2 + i * 1.257 + t * 0.5) * 20 * Math.sin(((u - cut) / (1 - cut)) * Math.PI) : 0
  const wav = r.wave * Math.sin(u * 30 - t * 2.6) * Math.min(1, u * 4)
  return [x + nx * (braid + wav), y + ny * (braid + wav), nx, ny]
}
function ribbons(ctx: Ctx, t: number, amount: number) {
  RIBS.forEach((r, i) => {
    const head = r.h0 + (1 - r.h0) * lin(t, 0.3 + i * 0.22, 8.4)
    // the gold line each ribbon rides on
    ctx.strokeStyle = rgba(GOLD_HI, 0.55 * amount)
    ctx.lineWidth = 1.3
    ctx.beginPath()
    for (let s = 0; s <= 60; s++) {
      const u = (head * s) / 60
      const [x, y, nx, ny] = along(r, i, u, t)
      const e = r.w * 0.5
      s === 0 ? ctx.moveTo(x + nx * e, y + ny * e) : ctx.lineTo(x + nx * e, y + ny * e)
    }
    ctx.stroke()
    const rr = rng(410 + i * 17)
    for (let j = 0; j < r.n; j++) {
      const u0 = rr(), v0 = rr(), c = rr(), keep = rr()
      if (keep > amount) continue
      const u = (u0 + t * r.speed * (0.8 + 0.4 * c)) % 1
      if (u > head) continue
      // dense along the gold edge, thinning away from it: the way the painted ribbons are made
      const v = r.flat ? v0 : Math.pow(v0, r.edge)
      const [x, y, nx, ny] = along(r, i, u, t)
      const off = (0.5 - v) * r.w
      const fade = Math.min(1, u * 14) * Math.min(1, (head - u) * 16 + 0.25) * (1 - ramp(u, 0.9, 1))
      ctx.fillStyle = rgba(r.tone, (0.35 + 0.6 * (1 - v)) * fade)
      ctx.beginPath()
      ctx.arc(x + nx * off, y + ny * off, (0.6 + c * 1.2) * r.size, 0, 6.2832)
      ctx.fill()
      // the facts inside the work: a larger dot, now and then
      if (j % 46 === 0) {
        ctx.fillStyle = rgba(j % 92 === 0 ? GOLD : INKC, 0.95 * fade)
        ctx.beginPath()
        ctx.arc(x + nx * off * 0.5, y + ny * off * 0.5, 3.4 + c * 1.6, 0, 6.2832)
        ctx.fill()
      }
    }
  })
}

/* ---------- the surface, and the clusters on it ---------- */

const topAt = (x: number) => 590 - 70 * Math.sin((Math.PI * (x + 100)) / 1500)
const botAt = (x: number) => 790 - (x - 120) * 0.21
const sideAt = (x: number) => lin(x, 150, 380) * (1 - lin(x, 1080, 1215))
type Cl = { x: number; y: number; born: number; n: number }
const CL: Cl[] = [
  { x: 340, y: 672, born: 8.6, n: 150 },
  { x: 505, y: 606, born: 9.0, n: 190 },
  { x: 700, y: 584, born: 9.4, n: 230 },
  { x: 882, y: 566, born: 9.9, n: 150 },
  { x: 628, y: 664, born: 10.3, n: 170 },
  { x: 452, y: 702, born: 10.7, n: 120 },
  // two that only exist because the memory kept growing
  { x: 596, y: 548, born: 27.0, n: 110 },
  { x: 262, y: 612, born: 28.2, n: 100 },
]
/** When something learned comes back: [time, which expert, which cluster]. */
const BACK: [number, number, number][] = [[21.9, 0, 1], [23.6, 2, 4], [26.6, 1, 0], [28.3, 3, 3]]

function surface(ctx: Ctx, t: number, paper: RGB) {
  const a = ramp(t, 8.4, 10.6)
  if (a <= 0) return
  const spread = 1 + 0.0 * t
  ctx.save()
  ctx.beginPath()
  for (let x = 140; x <= 1220; x += 12) x === 140 ? ctx.moveTo(x, topAt(x)) : ctx.lineTo(x, topAt(x))
  for (let x = 1220; x >= 140; x -= 12) ctx.lineTo(x, botAt(x) * spread)
  ctx.closePath()
  const g = ctx.createLinearGradient(140, 0, 1220, 0)
  g.addColorStop(0, rgba(paper, 0))
  g.addColorStop(0.22, rgba(paper, 0.62 * a))
  g.addColorStop(0.86, rgba(paper, 0.62 * a))
  g.addColorStop(1, rgba(paper, 0))
  ctx.fillStyle = g
  ctx.fill()
  ctx.restore()
  // a fine grey grain all over it, thickest at the top edge
  const r = rng(77)
  for (let i = 0; i < 5200; i++) {
    const x = 140 + r() * 1080, v = Math.pow(r(), 1.9), c = r()
    const y = topAt(x) + v * (botAt(x) - topAt(x))
    ctx.fillStyle = rgba(INKC, (0.1 + 0.3 * (1 - v)) * a * sideAt(x))
    ctx.beginPath()
    ctx.arc(x, y, 0.7 + c * 1.1, 0, 6.2832)
    ctx.fill()
  }
  // the gold line along its top
  const lg = ctx.createLinearGradient(140, 0, 1220, 0)
  lg.addColorStop(0, rgba(GOLD_HI, 0))
  lg.addColorStop(0.25, rgba(GOLD_HI, 0.9 * a))
  lg.addColorStop(0.85, rgba(GOLD_HI, 0.9 * a))
  lg.addColorStop(1, rgba(GOLD_HI, 0))
  ctx.strokeStyle = lg
  ctx.lineWidth = 1.6
  ctx.beginPath()
  const draw = ramp(t, 8.4, 11)
  for (let x = 140; x <= 140 + 1080 * draw; x += 12) x === 140 ? ctx.moveTo(x, topAt(x)) : ctx.lineTo(x, topAt(x))
  ctx.stroke()
}

/** The dots. `lit` is how much light is on them, `cool` is whose light it is, `sx,sy` is where the light is. */
function clusters(ctx: Ctx, t: number, lit: number, cool: number, shadow: boolean) {
  const hot = mix(GOLD, [112, 96, 168], cool)
  CL.forEach((c, ci) => {
    const r = rng(900 + ci * 29)
    // how much it has been fed since it formed
    let fed = 0
    for (const [bt, , to] of BACK) if (to === ci) fed += ramp(t, bt + 0.7, bt + 1.9)
    const thick = ci < 6 ? ramp(t, 25.6, 29.6) : 0
    const total = Math.round(c.n * (1 + 0.55 * fed + 0.45 * thick))
    const sig = 30 + 5 * fed + 4 * thick
    // away from the sun, for the shadow each dot throws
    const ax = c.x - SUN[0], ay = c.y - SUN[1]
    const al = Math.hypot(ax, ay)
    for (let i = 0; i < Math.round(c.n * 2); i++) {
      const gx = gz(r), gy = gz(r), s = r(), late = r(), core = r()
      if (i >= total) continue
      // the first dots settle over a few seconds; the later ones arrive when they are learned
      const born = i < c.n ? c.born + late * 2.2 : ci < 6 && i < c.n * 1.55 ? (BACK.find((b) => b[2] === ci)?.[0] ?? 25.6) + 0.7 + late * 1.2 : 25.6 + late * 4
      const p = lin(t, born, born + 1.5)
      if (p <= 0) continue
      const e = 1 - Math.pow(1 - p, 3)
      const tx = c.x + gx * sig * 1.25, ty = c.y + gy * sig * 0.62
      // they leave the end of the braid and find their place, the way filings find a magnet
      const fromX = i < c.n ? J1[0] - 120 + late * 160 : tx + gx * 60, fromY = i < c.n ? J1[1] + 30 - late * 40 : ty - 140
      const curl = Math.sin(p * Math.PI) * (20 + 40 * s) * (i % 2 ? 1 : -1)
      const x = fromX + (tx - fromX) * e + curl * (1 - e), y = fromY + (ty - fromY) * e - curl * 0.4
      const rad = 1.6 + s * s * 3.6
      if (shadow) {
        const far = (6 + rad * 2.2) * lit
        ctx.fillStyle = rgba(INKC, 0.1 * lit * e)
        ctx.beginPath()
        ctx.ellipse(x + (ax / al) * far, y + (ay / al) * far * 0.6 + 2, rad * 1.5, rad * 0.8, 0, 0, 6.2832)
        ctx.fill()
        continue
      }
      const isHot = core < 0.2 && Math.abs(gx) + Math.abs(gy) < 1.3
      ctx.fillStyle = rgba(isHot ? mix(INKC, hot, 0.25 + 0.75 * lit) : INKC, (0.35 + 0.6 * s) * Math.min(1, p * 3))
      ctx.beginPath()
      ctx.arc(x, y, rad, 0, 6.2832)
      ctx.fill()
      if (isHot && lit > 0.3 && s > 0.5) halo(ctx, x, y, rad * 5, mix(GOLD_HI, [190, 176, 236], cool), 0.3 * lit)
    }
  })
}

/* ---------- the arch of days ---------- */

function arch(ctx: Ctx, t: number) {
  const cx = 610, cy = 742, ro = 330, ri = 272
  for (let i = 0; i < 9; i++) {
    const p = lin(t, 25.7 + i * 0.4, 26.25 + i * 0.4)
    if (p <= 0) continue
    const e = 1 - Math.pow(1 - p, 3)
    const a0 = Math.PI + (i * 17.2 * Math.PI) / 180, a1 = a0 + (16 * Math.PI) / 180
    // each stone rises into its place from just below it
    const dy = (1 - e) * 46
    ctx.save()
    ctx.translate(0, dy)
    ctx.beginPath()
    ctx.arc(cx, cy, ro, a0, a1)
    ctx.arc(cx, cy, ri, a1, a0, true)
    ctx.closePath()
    const c = mix([84, 66, 40], [204, 170, 106], i / 8)
    ctx.fillStyle = rgba(c, 0.94 * e)
    ctx.fill()
    // the side that faces the sun catches it
    const am = (a0 + a1) / 2
    const face = Math.max(0, Math.cos(am - Math.atan2(SUN[1] - cy, SUN[0] - cx)))
    ctx.fillStyle = rgba([255, 232, 178], 0.3 * face * e)
    ctx.fill()
    ctx.restore()
  }
}

/* ---------- the sun, and what rides its orbit ---------- */

type Ex = { R: number; a0: number; w: number; r: number; kind: "gold" | "moonstone" | "ink" | "pearl"; at: number; cl: number }
const EXP: Ex[] = [
  { R: 252, a0: 205, w: 3.2, r: 16, kind: "gold", at: 16.8, cl: 1 },
  { R: 338, a0: 152, w: -2.4, r: 24, kind: "moonstone", at: 17.5, cl: 0 },
  { R: 424, a0: 190, w: 1.9, r: 19, kind: "ink", at: 18.2, cl: 4 },
  { R: 338, a0: 238, w: -2.4, r: 13, kind: "gold", at: 18.9, cl: 3 },
]
const exAt = (e: Ex, t: number): Pt => {
  const a = ((e.a0 + e.w * (t - 17)) * Math.PI) / 180
  return [SUN[0] + e.R * Math.cos(a), SUN[1] + e.R * Math.sin(a)]
}
const PINCH = [15.0, 17.9, 20.4, 22.9, 25.2, 27.6, 32.7]

function grains(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, p: number, n: number, seed: number, c: RGB, big = 1) {
  if (p <= 0 || p >= 1) return
  const r = rng(seed)
  for (let j = 0; j < n; j++) {
    const lag = r() * 0.25, s = r(), w = gz(r) * 2.2
    const ph = Math.max(0, Math.min(1, (p - lag) / 0.75))
    if (ph <= 0 || ph >= 1) continue
    const e = ph * ph * (3 - 2 * ph)
    ctx.fillStyle = rgba(c, 0.95)
    ctx.beginPath()
    ctx.arc(x0 + (x1 - x0) * e + w, y0 + (y1 - y0) * e + w * 0.5, (1.3 + s * 1.6) * big, 0, 6.2832)
    ctx.fill()
  }
}

export function connectScene(ctx: Ctx, t: number, S: Scene) {
  const { paint, paper } = S
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = rgba(paper, 1)
  ctx.fillRect(0, 0, W, H)

  // whose light it is: the first sun, then nothing for a breath, then the second
  const dim = ramp(t, 29.6, 30.4)
  const out = k(t, [[30.2, 0], [31.3, 1]])
  const inn = k(t, [[30.7, 0], [31.9, 1]])
  const litB = ramp(t, 31.9, 32.8)
  const lit = ramp(t, 13.4, 15.2) * (1 - dim) + litB
  const cool = litB

  // the painting: it comes up out of the paper once the ribbons have braided
  const pa = ramp(t, 9.2, 12.4)
  layer(ctx, t, 0)
  if (pa > 0) {
    ctx.globalAlpha = pa
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(paint, 0, 0, PW, H)
    ctx.globalAlpha = 1
  }
  // the light the model throws across everything
  if (lit > 0) {
    const g = ctx.createRadialGradient(SUN[0], SUN[1], 60, SUN[0], SUN[1], 1500)
    const lc = mix([240, 196, 110], [200, 186, 240], cool)
    g.addColorStop(0, rgba(lc, 0))
    g.addColorStop(0.07, rgba(lc, 0.04 * lit))
    g.addColorStop(0.16, rgba(lc, 0.36 * lit))
    g.addColorStop(0.45, rgba(lc, 0.13 * lit))
    g.addColorStop(1, rgba(lc, 0))
    ctx.fillStyle = g
    ctx.fillRect(-200, -200, PW + 400, H + 400)
  }

  surface(ctx, t, paper)
  // the arch stands a little behind the dots, so it slides against them as the camera drifts
  layer(ctx, t, -0.03)
  arch(ctx, t)
  layer(ctx, t, 0)
  if (lit > 0.02) clusters(ctx, t, lit, cool, true)
  clusters(ctx, t, lit, cool, false)

  // the sun's seat, the sun, and the one that takes its place
  if (out > 0 || inn > 0) {
    const gone = ramp(out, 0, 0.12)
    ctx.fillStyle = rgba(paper, gone)
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R + 10, 0, 6.2832)
    ctx.fill()
    ctx.strokeStyle = rgba(GOLD_HI, 0.55 * gone)
    ctx.lineWidth = 1.2
    ctx.setLineDash([3, 8])
    ctx.lineDashOffset = -t * 5
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R + 4, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
  }
  if (pa > 0 && out < 1) {
    // the first sun is cut from the painting itself, so it can dim and slide away
    const ox = 520 * out * out, oy = -620 * Math.pow(out, 1.5)
    if (dim > 0) {
      ctx.save()
      ctx.translate(ox, oy)
      ctx.beginPath()
      ctx.arc(SUN[0], SUN[1], SUN_R, 0, 6.2832)
      ctx.clip()
      if (out > 0) ctx.drawImage(paint, 0, 0, PW, H)
      ctx.fillStyle = `rgba(52,48,60,${0.62 * dim})`
      ctx.fillRect(SUN[0] - SUN_R, SUN[1] - SUN_R, SUN_R * 2, SUN_R * 2)
      ctx.restore()
    }
  }
  if (inn > 0) {
    const e = 1 - Math.pow(1 - inn, 2.4)
    const px = SUN[0] - 700 * (1 - e) * (1 - e), py = SUN[1] - 520 * Math.pow(1 - e, 1.5)
    halo(ctx, px, py, SUN_R * (2.2 + 1.4 * litB), [206, 192, 244], 0.25 + 0.4 * litB)
    orb(ctx, px, py, SUN_R - 6, "pearl", 99, ramp(inn, 0, 0.15))
    // a faint core even before it lights, so it reads as a sun and not a stone
    halo(ctx, px, py, SUN_R * 0.7, [255, 255, 255], 0.35 * ramp(inn, 0, 0.3))
    if (litB > 0) {
      halo(ctx, px, py, SUN_R * 0.9, [255, 255, 255], 0.85 * litB)
      halo(ctx, px, py, SUN_R * 0.35, [255, 255, 255], litB)
      const f = lin(t, 31.9, 33.1)
      if (f > 0 && f < 1) {
        ctx.strokeStyle = rgba([150, 132, 210], 0.7 * (1 - f) * (1 - f))
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(SUN[0], SUN[1], SUN_R + 20 + 520 * (1 - (1 - f) * (1 - f)), 0, 6.2832)
        ctx.stroke()
      }
    }
  }

  // the model's one thread: it is handed a pinch from a cluster, and the answer drops back
  const thread = ramp(t, 14.4, 15.2)
  const mc = CL[2]
  const md = Math.hypot(mc.x - SUN[0], mc.y - SUN[1])
  const mx = SUN[0] + ((mc.x - SUN[0]) / md) * (SUN_R + 8), my = SUN[1] + ((mc.y - SUN[1]) / md) * (SUN_R + 8)
  if (thread > 0) {
    ctx.strokeStyle = rgba(GOLD, 0.6 * thread)
    ctx.lineWidth = 1.3
    ctx.beginPath()
    ctx.moveTo(mc.x, mc.y)
    ctx.lineTo(mc.x + (mx - mc.x) * thread, mc.y + (my - mc.y) * thread)
    ctx.stroke()
    PINCH.forEach((a, i) => {
      if (a > 29.4 && a < 32.6) return
      grains(ctx, mc.x, mc.y, mx, my, lin(t, a, a + 0.7), 14, 500 + i, GOLD, 1.25)
      const fl = lin(t, a + 0.6, a + 1.1)
      if (fl > 0 && fl < 1) halo(ctx, SUN[0], SUN[1], SUN_R * 2.4, mix([255, 214, 130], [214, 200, 255], cool), 0.5 * Math.sin(Math.PI * fl))
      const f = lin(t, a + 0.8, a + 1.5)
      if (f > 0 && f < 1) {
        const e = f * f, e0 = Math.max(0, f - 0.2) ** 2
        const ex = mc.x - 620, ey = mc.y + 620
        spark(ctx, mx + (ex - mx) * e, my + (ey - my) * e, mx + (ex - mx) * e0, my + (ey - my) * e0, GOLD, 1, 7, [140, 92, 12])
      }
    })
  }

  // experts and teammates: each rides an orbit line, and each has its own thread to its own cluster
  EXP.forEach((ex, i) => {
    const on = ramp(t, ex.at, ex.at + 0.7)
    if (on <= 0) return
    const [x, y] = exAt(ex, t)
    const c = CL[ex.cl]
    // the stretch of orbit it rides
    const a = Math.atan2(y - SUN[1], x - SUN[0])
    ctx.strokeStyle = rgba(GOLD_HI, 0.6 * on)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], ex.R, a - 0.7, a + 0.7)
    ctx.stroke()
    const grow = ramp(t, ex.at + 0.3, ex.at + 1.2)
    ctx.strokeStyle = rgba(GOLD, 0.5 * on)
    ctx.lineWidth = 1.1
    ctx.beginPath()
    ctx.moveTo(c.x, c.y)
    ctx.lineTo(c.x + (x - c.x) * grow, c.y + (y - c.y) * grow)
    ctx.stroke()
    // its shadow falls away from the sun, on the paper behind it
    ctx.fillStyle = rgba(INKC, 0.14 * lit * on)
    ctx.beginPath()
    ctx.ellipse(x + Math.cos(a) * ex.r * 1.1, y + Math.sin(a) * ex.r * 1.1 + 5, ex.r * 1.1, ex.r * 0.8, 0, 0, 6.2832)
    ctx.fill()
    const pop = 1 + 0.4 * Math.sin(Math.PI * lin(t, ex.at, ex.at + 0.6))
    orb(ctx, x, y, ex.r * pop, ex.kind, 140 + i, on)
    for (let q = 0; q < 8; q++) {
      const at = ex.at + 1.2 + q * 2.1 + i * 0.4
      if (at > 33) break
      if (BACK.some((b) => b[1] === i && Math.abs(b[0] - at - 0.9) < 1.2)) continue
      grains(ctx, c.x, c.y, x, y, lin(t, at, at + 0.6), 8, 800 + i * 31 + q, GOLD)
      // the answer leaves along the orbit
      const f = lin(t, at + 0.6, at + 1.4)
      if (f > 0 && f < 1) {
        const dir = ex.w > 0 ? 1 : -1
        const aa = a + dir * 1.5 * (1 - (1 - f) * (1 - f)), ab = a + dir * 1.5 * Math.max(0, 1 - (1 - f) * (1 - f) - 0.16)
        spark(ctx, SUN[0] + ex.R * Math.cos(aa), SUN[1] + ex.R * Math.sin(aa), SUN[0] + ex.R * Math.cos(ab), SUN[1] + ex.R * Math.sin(ab), GOLD, 1 - f * f, 5, [140, 92, 12])
      }
    }
  })
  // what one of them learned comes back down its thread and stays
  for (const [bt, who, to] of BACK) {
    const ex = EXP[who], c = CL[to]
    const [x, y] = exAt(ex, t)
    const p = lin(t, bt, bt + 0.9)
    grains(ctx, x, y, c.x, c.y, p, 16, 950 + Math.round(bt * 10), GOLD_HI, 1.7)
    const f = lin(t, bt + 0.7, bt + 1.9)
    if (f > 0 && f < 1) {
      ctx.strokeStyle = rgba(GOLD_HI, 0.8 * (1 - f) * (1 - f))
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.ellipse(c.x, c.y, 20 + 90 * f, (20 + 90 * f) * 0.5, 0, 0, 6.2832)
      ctx.stroke()
    }
  }

  // the ribbons run a little nearer the lens than the painting, so they slide across it as the camera moves
  layer(ctx, t, 0.05)
  const flow = (t < 12 ? 1 : 0.5 + 0.3 * ramp(t, 25.5, 27) * (1 - ramp(t, 29.4, 30.4))) * (1 - ramp(t, 33, 34))
  ribbons(ctx, t, flow)

  // dust close to the lens, out of focus, drifting the other way
  layer(ctx, t, 0.45)
  const br = rng(321)
  for (let i = 0; i < 26; i++) {
    const x0 = br() * 2600 - 200, y0 = br() * 1300 - 100, s = br(), ph = br() * 6.28
    const x = x0 - t * (8 + 14 * s), y = y0 + 14 * Math.sin(t * 0.4 + ph)
    halo(ctx, x, y, 16 + 40 * s, s > 0.6 ? [214, 170, 90] : [150, 142, 128], (0.07 + 0.09 * s) * ramp(t, 0.2, 2) * (1 - ramp(t, 33, 34)))
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // a soft edge all round, so the eye stays in the middle
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.55, W / 2, H / 2, H * 1.15)
  vg.addColorStop(0, "rgba(60,48,30,0)")
  vg.addColorStop(1, "rgba(60,48,30,.1)")
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)

  // room for the words
  const words = win(t, 3.6, 33.2, 0.6)
  if (words > 0) {
    const mist = ctx.createLinearGradient(0, 880, 0, H)
    mist.addColorStop(0, rgba(paper, 0))
    mist.addColorStop(0.55, rgba(paper, 0.92 * words))
    mist.addColorStop(1, rgba(paper, 0.97 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 880, W, H - 880)
  }

  // the close: for one beat the surface is the dawn road, and the strider steps in
  const dawn = ramp(t, 33, 34.1) * (1 - ramp(t, 36, 36.5))
  if (dawn > 0) {
    const P = S.land
    const cam = { z: 0.05 + 0.03 * lin(t, 33, 36.5), px: -8, py: -2 }
    compose(P, { t, n: 0, warm: 1, gold: 1.05, sunLow: 0.25, reach: 1800, lamp: () => 0 })
    warp(P, cam, 0.5, t)
    ctx.save()
    ctx.globalAlpha = dawn
    ctx.drawImage(P.out, 0, 0)
    const walked = (t - 33.2) * 185
    const st = ramp(t, 33.5, 34.4)
    if (walked > 0 && st > 0) {
      const [fx, fy] = roadAt(walked)
      const h = 310 * (1 - 0.14 * Math.min(1, walked / 900))
      const [ss, sx, sy] = camT(cam, depthAt(P, fx, fy))
      ctx.transform(ss, 0, 0, ss, sx, sy)
      ctx.globalAlpha = dawn * st
      strider(ctx, fx, fy, h, walked, { body: "rgba(64,60,54,1)", far: "rgba(92,87,79,1)" })
    }
    ctx.restore()
  }
}

