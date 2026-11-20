import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type RGB, SAND_DAY, SAND_NIGHT, W, blank, gz, halo, lin, mix, orb, palAt, rgba, spline } from "./core"
import { spark } from "./cost"
import { compose, roadAt } from "./land"
import { type Plates, buildPlates, camT, depthAt, warp } from "./plates"
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

export type Scene = { paint: HTMLImageElement; paintB: HTMLCanvasElement; buf: HTMLCanvasElement; paper: RGB; land: Plates }

/** Everything the film needs made once: the painting, a second copy with a cooler sun, and a working canvas. */
export function buildScene(paint: HTMLImageElement, landImg: HTMLImageElement): Scene {
  const c = blank(4, 4)
  const x = c.getContext("2d")!
  x.drawImage(paint, 0, 0, 40, 40, 0, 0, 4, 4)
  const d = x.getImageData(1, 1, 1, 1).data
  // the second sun is the first one's own paint, turned from gold to a cool pearl
  const pb = blank(paint.naturalWidth, paint.naturalHeight)
  const bx = pb.getContext("2d")!
  bx.drawImage(paint, 0, 0)
  const cool = blank(paint.naturalWidth, paint.naturalHeight)
  const cx = cool.getContext("2d")!
  cx.filter = "hue-rotate(195deg) saturate(0.85) brightness(1.06)"
  cx.drawImage(paint, 0, 0)
  cx.filter = "none"
  cx.globalCompositeOperation = "destination-in"
  const g = cx.createRadialGradient(1022, 240, 96, 1022, 240, 150)
  g.addColorStop(0, "rgba(0,0,0,1)")
  g.addColorStop(1, "rgba(0,0,0,0)")
  cx.fillStyle = g
  cx.fillRect(0, 0, cool.width, cool.height)
  bx.drawImage(cool, 0, 0)
  return { paint, paintB: pb, buf: blank(W, H), paper: [d[0], d[1], d[2]] as RGB, land: buildPlates(landImg) }
}

/** How much daylight there is. The film opens dark. The first sun lights it, goes out, and the second lights it again. */
export const dayAt = (t: number) => (t < 29.6 ? ramp(t, 13.4, 15.8) : t < 31.9 ? 1 - ramp(t, 29.6, 30.7) : ramp(t, 31.9, 33.2)) 
const DUSK_TOP: RGB = [22, 19, 38]
const DUSK_LOW: RGB = [58, 50, 92]

/** Where the camera looks, and how close. It rides in with the ribbons, pulls back to find the sun, then drifts. */
const camAt = (t: number) => ({
  x: spline(t, [[0, 520], [8, 730], [12.3, 760], [14.8, 1062], [22, 1072], [25.5, 930], [29, 650], [30.7, 1030], [33, 1042], [36.5, 1042]]),
  y: spline(t, [[0, 630], [8, 668], [12.3, 660], [14.8, 540], [22, 541], [25.5, 566], [29, 612], [30.7, 556], [36.5, 556]]),
  z: spline(t, [[0, 1.56], [8, 1.36], [12.3, 1.3], [14.8, 1.0], [22, 1.02], [25.5, 1.16], [29, 1.56], [30.7, 1.1], [33, 1.1], [36.5, 1.1]]),
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
type Rib = { name: string; path: Pt[]; w: number; n: number; speed: number; size: number; day: RGB; dark: RGB; wave: number; h0: number }
const RIBS: Rib[] = [
  // chat: quick and light
  { name: "chat", path: [[-120, 250], [140, 300], [250, 600], J0], w: 9, n: 1500, speed: 0.3, size: 0.8, day: [120, 104, 150], dark: [246, 236, 214], wave: 0, h0: 0.06 },
  // documents: slow and heavy
  { name: "documents", path: [[-120, 1040], [130, 1010], [280, 800], J0], w: 26, n: 5200, speed: 0.09, size: 1.35, day: [70, 58, 34], dark: [236, 184, 100], wave: 0, h0: 0.06 },
  // files: flat and even
  { name: "files", path: [[-120, 640], [80, 640], [260, 690], J0], w: 15, n: 2600, speed: 0.14, size: 1.05, day: [138, 115, 71], dark: [232, 205, 150], wave: 0, h0: 0.05 },
  // a call: it wavers
  { name: "call", path: [[850, -120], [760, 260], [560, 560], J0], w: 11, n: 2100, speed: 0.2, size: 0.95, day: [150, 84, 56], dark: [240, 190, 164], wave: 15, h0: 0.36 },
  // a teammate: warm
  { name: "teammate", path: [[1700, 1200], [1100, 1100], [640, 900], J0], w: 14, n: 2600, speed: 0.16, size: 1.2, day: [176, 124, 30], dark: [255, 226, 160], wave: 0, h0: 0.42 },
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
/** Sand in flight, drawn the way the first two films draw it: thousands of grains, each a short streak the way it is going. */
function ribbons(ctx: Ctx, t: number, amount: number, n: number) {
  const pal = palAt(n)
  ctx.lineCap = "round"
  RIBS.forEach((r, i) => {
    const head = r.h0 + (1 - r.h0) * lin(t, 0.3 + i * 0.22, 8.4)
    const tint = mix(r.day, r.dark, n)
    // after dark a ribbon carries its own light
    if (n > 0.2) {
      for (let s2 = 1; s2 <= 12; s2++) {
        const u = (head * s2) / 12.5
        const [x, y] = along(r, i, u, t)
        halo(ctx, x, y, 26 + r.w * 2.4, tint, 0.075 * n * amount * (1 - ramp(u, 0.86, 1)))
      }
    }
    const rr = rng(410 + i * 17)
    for (let j = 0; j < r.n; j++) {
      const u0 = rr(), b = gz(rr), c = rr(), keep = rr(), e = rr()
      if (keep > amount) continue
      const sp = r.speed * (0.8 + 0.4 * c)
      const u = (u0 + t * sp) % 1
      if (u > head) continue
      // sand never runs evenly: it comes in pulses
      if (Math.sin(u * 46 - t * 7 + Math.floor(e * 3)) < -0.7 && e < 0.7) continue
      const stray = e > 0.9 ? 3 : 1
      // at the end of the braid the ribbon opens out and lets go
      const open = 1 + 2.6 * ramp(u, 0.84, 1)
      const [x, y, nx, ny] = along(r, i, u, t)
      const [xp, yp] = along(r, i, Math.max(0, u - 0.004 - sp * 0.05), t)
      const off = b * r.w * stray * open
      const fade = Math.min(1, u * 16) * (1 - ramp(u, 0.9 - 0.16 * (1 - n), 1 - 0.14 * (1 - n))) * (stray > 1 ? 0.55 : 1)
      ctx.strokeStyle = rgba(mix(pal[Math.floor(c * pal.length)], tint, 0.5), (0.4 + 0.55 * c) * fade)
      ctx.lineWidth = (e < 0.72 ? 0.7 + c * 0.9 : 1.1 + c * 1.5) * r.size
      ctx.beginPath()
      ctx.moveTo(xp + nx * off, yp + ny * off)
      ctx.lineTo(x + nx * off, y + ny * off)
      ctx.stroke()
      // the facts inside the work: a bright bead, now and then
      if (j % 130 === 0 && stray === 1) {
        const [bx2, by2] = [x + nx * off * 0.4, y + ny * off * 0.4]
        halo(ctx, bx2, by2, 14, mix(GOLD_HI, [255, 236, 190], n), 0.5 * fade)
        ctx.fillStyle = rgba(mix(GOLD, [255, 244, 214], n), fade)
        ctx.beginPath()
        ctx.arc(bx2, by2, 2.6 + c * 1.4, 0, 6.2832)
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
  { x: 340, y: 672, born: 8.6, n: 520 },
  { x: 505, y: 606, born: 9.0, n: 640 },
  { x: 700, y: 584, born: 9.4, n: 760 },
  { x: 882, y: 566, born: 9.9, n: 520 },
  { x: 628, y: 664, born: 10.3, n: 600 },
  { x: 452, y: 702, born: 10.7, n: 440 },
  // two that only exist because the system kept learning
  { x: 596, y: 540, born: 26.6, n: 420 },
  { x: 262, y: 612, born: 27.6, n: 380 },
]
/** When something learned comes back: [time, which expert, which cluster]. */
const BACK: [number, number, number][] = [[21.9, 0, 1], [23.6, 2, 4], [26.4, 1, 0], [28.0, 3, 3]]
/** Each cluster has a handful of bright points, and they are joined: this is what makes it more than a store. */
const NODES: Pt[][] = CL.map((c, ci) => {
  const r = rng(1200 + ci * 7)
  return Array.from({ length: 7 }, () => [c.x + gz(r) * 52, c.y + gz(r) * 24] as Pt)
})
const INNER: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 3], [2, 5]]
/** The joins between clusters, and when each is made. A few at the start, one for each thing learned, then a run of them. */
const LINKS: [number, number, number][] = [
  [1, 2, 12.0], [0, 5, 12.5], [4, 2, 13.0],
  [1, 4, 23.0], [4, 3, 24.7],
  [0, 1, 25.7], [5, 4, 26.05], [2, 3, 26.4], [6, 1, 26.9], [6, 2, 27.2], [7, 0, 27.9], [7, 1, 28.2], [5, 1, 28.5], [3, 6, 28.8], [0, 4, 29.1],
]

function surface(ctx: Ctx, t: number, paper: RGB, n: number) {
  const a = ramp(t, 8.4, 10.6)
  if (a <= 0) return
  const veil = mix(paper, [92, 82, 132], n)
  ctx.save()
  ctx.beginPath()
  for (let x = 140; x <= 1220; x += 12) x === 140 ? ctx.moveTo(x, topAt(x)) : ctx.lineTo(x, topAt(x))
  for (let x = 1220; x >= 140; x -= 12) ctx.lineTo(x, botAt(x))
  ctx.closePath()
  const g = ctx.createLinearGradient(140, 0, 1220, 0)
  g.addColorStop(0, rgba(veil, 0))
  g.addColorStop(0.22, rgba(veil, (0.6 - 0.3 * n) * a))
  g.addColorStop(0.86, rgba(veil, (0.6 - 0.3 * n) * a))
  g.addColorStop(1, rgba(veil, 0))
  ctx.fillStyle = g
  ctx.fill()
  ctx.restore()
  // fine sand all over it, thickest along the top edge
  const pal = palAt(n)
  const r = rng(77)
  for (let i = 0; i < 9000; i++) {
    const x = 140 + r() * 1080, v = Math.pow(r(), 2.3), c = r()
    const y = topAt(x) + v * (botAt(x) - topAt(x))
    ctx.fillStyle = rgba(mix(INKC, pal[Math.floor(c * pal.length)], 0.45 + 0.55 * n), (0.12 + 0.5 * (1 - v)) * a * sideAt(x))
    ctx.beginPath()
    ctx.arc(x, y, 0.6 + c * 1.1, 0, 6.2832)
    ctx.fill()
  }
  // the gold line along its top
  const lg = ctx.createLinearGradient(140, 0, 1220, 0)
  const lc = mix(GOLD_HI, [255, 226, 160], n)
  lg.addColorStop(0, rgba(lc, 0))
  lg.addColorStop(0.25, rgba(lc, 0.95 * a))
  lg.addColorStop(0.85, rgba(lc, 0.95 * a))
  lg.addColorStop(1, rgba(lc, 0))
  ctx.strokeStyle = lg
  ctx.lineWidth = 1.8
  ctx.shadowColor = rgba([255, 214, 130], 0.9 * n)
  ctx.shadowBlur = 14 * n
  ctx.beginPath()
  const draw = ramp(t, 8.4, 11)
  for (let x = 140; x <= 140 + 1080 * draw; x += 12) x === 140 ? ctx.moveTo(x, topAt(x)) : ctx.lineTo(x, topAt(x))
  ctx.stroke()
  ctx.shadowBlur = 0
}

/** How far a cluster has come: 0 before its sand arrives, 1 once it has settled. */
const settled = (ci: number, t: number) => ramp(t, CL[ci].born + 1.2, CL[ci].born + 3.4)

/** The joins. Each is drawn on like a line of poured gold, and then light keeps running along it. */
function links(ctx: Ctx, t: number, n: number) {
  ctx.lineCap = "round"
  const lineC = mix([196, 142, 34], [255, 226, 160], n)
  ctx.shadowColor = rgba([255, 196, 96], 0.5 + 0.4 * n)
  // inside each cluster
  CL.forEach((_, ci) => {
    const s2 = settled(ci, t)
    if (s2 <= 0) return
    INNER.forEach(([a, b], li) => {
      const p = lin(s2, li / 10, li / 10 + 0.3)
      if (p <= 0) return
      const [x0, y0] = NODES[ci][a], [x1, y1] = NODES[ci][b]
      ctx.strokeStyle = rgba(lineC, 0.8)
      ctx.lineWidth = 1.3
      ctx.shadowBlur = 3 + 8 * n
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x0 + (x1 - x0) * p, y0 + (y1 - y0) * p)
      ctx.stroke()
    })
  })
  // between clusters
  LINKS.forEach(([a, b, at], li) => {
    const p = lin(t, at, at + 0.7)
    if (p <= 0) return
    const A = CL[a], B = CL[b]
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2 - 26 - (li % 3) * 10
    const q = (u: number): Pt => [(1 - u) * (1 - u) * A.x + 2 * (1 - u) * u * mx + u * u * B.x, (1 - u) * (1 - u) * A.y + 2 * (1 - u) * u * my + u * u * B.y]
    const e = 1 - Math.pow(1 - p, 2)
    ctx.strokeStyle = rgba(lineC, 0.95)
    ctx.lineWidth = 2.5 + 2 * (1 - p)
    ctx.shadowBlur = 6 + 12 * n
    ctx.beginPath()
    for (let s2 = 0; s2 <= 24; s2++) {
      const [x, y] = q((e * s2) / 24)
      s2 === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.shadowBlur = 0
    // the molten head while it is being drawn
    if (p < 1) {
      const [hx, hy] = q(e)
      halo(ctx, hx, hy, 26, [255, 226, 150], 0.9)
    }
    // and afterwards, a bead of light going back and forth
    if (p >= 1) {
      const ph = ((t - at) * 0.55 + li * 0.37) % 2
      const [bx, by] = q(ph < 1 ? ph : 2 - ph)
      halo(ctx, bx, by, 13, mix([226, 170, 70], [255, 236, 190], n), 0.75)
      ctx.fillStyle = rgba(mix([150, 100, 16], [255, 250, 232], n), 0.95)
      ctx.beginPath()
      ctx.arc(bx, by, 2.2, 0, 6.2832)
      ctx.fill()
    }
  })
  ctx.shadowBlur = 0
}

/** The clusters: fine sand gathered round a few bright points. `lit` is the sun on them, `n` is night. */
function clusters(ctx: Ctx, t: number, lit: number, cool: number, n: number) {
  const DAYP: RGB[] = [INKC, [70, 58, 34], [138, 115, 71], [176, 124, 30], [214, 166, 70]]
  const pal = DAYP.map((c, i) => mix(c, SAND_NIGHT[i], n))
  CL.forEach((c, ci) => {
    if (t < c.born) return
    const r = rng(900 + ci * 29)
    let fed = 0
    for (const [bt, , to] of BACK) if (to === ci) fed += ramp(t, bt + 0.7, bt + 1.9)
    const thick = ci < 6 ? ramp(t, 25.6, 29.4) : 0
    const total = Math.round(c.n * (1 + 0.5 * fed + 0.4 * thick))
    const sig = 30 + 5 * fed + 4 * thick
    const ax = c.x - SUN[0], ay = c.y - SUN[1]
    const al = Math.hypot(ax, ay)
    const s2 = settled(ci, t)
    // the shadow of the whole gathering, thrown away from the sun
    if (lit > 0.02 && n < 0.9) {
      ctx.save()
      ctx.filter = "blur(7px)"
      ctx.fillStyle = rgba(INKC, 0.2 * lit * (1 - n) * s2)
      ctx.beginPath()
      ctx.ellipse(c.x + (ax / al) * 22, c.y + (ay / al) * 12 + 8, sig * 1.7, sig * 0.62, 0, 0, 6.2832)
      ctx.fill()
      ctx.restore()
    }
    // after dark it glows by itself: the light was never the model's
    if (n > 0.05) halo(ctx, c.x, c.y, sig * 4.2, [232, 196, 128], 0.3 * n * s2 * (0.92 + 0.08 * Math.sin(t * 1.4 + ci)))
    for (let i = 0; i < Math.round(c.n * 1.95); i++) {
      const gx = gz(r), gy = gz(r), s = r(), late = r(), tone = r()
      if (i >= total) continue
      const born = i < c.n ? c.born + late * 2.2 : i < c.n * 1.5 ? (BACK.find((b) => b[2] === ci)?.[0] ?? 25.6) + 0.7 + late * 1.2 : 25.6 + late * 3.6
      const p = lin(t, born, born + 1.5)
      if (p <= 0) continue
      const e = 1 - Math.pow(1 - p, 3)
      const tx = c.x + gx * sig * 1.25, ty = c.y + gy * sig * 0.6
      const fromX = i < c.n ? J1[0] - 150 + late * 190 : tx + gx * 60, fromY = i < c.n ? J1[1] + 34 - late * 44 : ty - 150
      const curl = Math.sin(p * Math.PI) * (20 + 40 * s) * (i % 2 ? 1 : -1)
      const x = fromX + (tx - fromX) * e + curl * (1 - e), y = fromY + (ty - fromY) * e - curl * 0.4
      // the side toward the sun catches it
      const face = Math.max(0, -(gx * ax + gy * ay) / al) * lit * (1 - n)
      const k2 = Math.min(pal.length - 1, Math.floor(tone * pal.length + face * 1.6))
      ctx.fillStyle = rgba(pal[k2], (0.45 + 0.5 * s) * Math.min(1, p * 3))
      ctx.beginPath()
      ctx.arc(x, y, 0.7 + s * s * 1.9, 0, 6.2832)
      ctx.fill()
    }
    // the bright points
    NODES[ci].forEach(([nx, ny], ni) => {
      const p = lin(s2, ni / 9, ni / 9 + 0.25)
      if (p <= 0) return
      const rad = (4.6 + ((ni * 7) % 5)) * (1 + 0.5 * Math.sin(Math.PI * p) * (p < 1 ? 1 : 0))
      const glow = Math.max(lit * (1 - n), n)
      halo(ctx, nx, ny, rad * 4.5, mix(mix(GOLD_HI, [190, 176, 236], cool * (1 - n)), [255, 236, 190], n), 0.42 * glow * p)
      orb(ctx, nx, ny, rad, "gold", 1300 + ci * 9 + ni, p)
    })
  })
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
  const { paper } = S
  const D = dayAt(t)
  const n = 1 - D
  const dim = ramp(t, 29.6, 30.4)
  const out = k(t, [[30.2, 0], [31.3, 1]])
  const inn = k(t, [[30.7, 0], [31.9, 1]])
  const litB = ramp(t, 31.9, 32.8)
  const lit = ramp(t, 13.4, 15.2) * (1 - dim) + litB
  const cool = litB
  // once the second sun is in its seat, the painting is the one with the cool sun in it
  const paint = inn >= 1 ? S.paintB : S.paint
  const c = camAt(t)
  const sunS: Pt = [(SUN[0] - c.x) * c.z + W / 2, (SUN[1] - c.y) * c.z + H / 2]

  // the dark: a dusk sky, and the painting in it only as shadow
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, rgba(DUSK_TOP, 1))
  sky.addColorStop(0.62, rgba(DUSK_LOW, 1))
  sky.addColorStop(1, rgba(mix(DUSK_LOW, DUSK_TOP, 0.35), 1))
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)
  const pa = ramp(t, 9.2, 12.4)
  if (pa > 0 && D < 1) {
    layer(ctx, t, 0)
    ctx.globalAlpha = pa
    ctx.globalCompositeOperation = "multiply"
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(paint, 0, 0, PW, H)
    ctx.globalCompositeOperation = "source-over"
    ctx.globalAlpha = 1
  }
  // the daylight: it spreads out from the sun, so the model can be seen to light the place
  if (D > 0) {
    const bx = S.buf.getContext("2d")!
    bx.setTransform(1, 0, 0, 1, 0, 0)
    bx.globalCompositeOperation = "source-over"
    bx.globalAlpha = 1
    bx.fillStyle = rgba(paper, 1)
    bx.fillRect(0, 0, W, H)
    bx.setTransform(c.z, 0, 0, c.z, W / 2 - c.x * c.z, H / 2 - c.y * c.z)
    bx.imageSmoothingQuality = "high"
    bx.drawImage(paint, 0, 0, PW, H)
    // the light the model throws across everything
    const g = bx.createRadialGradient(SUN[0], SUN[1], 60, SUN[0], SUN[1], 1500)
    const lc = mix([240, 196, 110], [200, 186, 240], cool)
    g.addColorStop(0, rgba(lc, 0))
    g.addColorStop(0.07, rgba(lc, 0.04 * lit))
    g.addColorStop(0.16, rgba(lc, 0.36 * lit))
    g.addColorStop(0.45, rgba(lc, 0.13 * lit))
    g.addColorStop(1, rgba(lc, 0))
    bx.fillStyle = g
    bx.fillRect(-200, -200, PW + 400, H + 400)
    bx.setTransform(1, 0, 0, 1, 0, 0)
    const sweeping = t < 29.6 || t >= 31.9
    if (sweeping && D < 1) {
      const R = 60 + 2700 * D * D
      const m = bx.createRadialGradient(sunS[0], sunS[1], Math.max(0, R - 420), sunS[0], sunS[1], R)
      m.addColorStop(0, "rgba(0,0,0,1)")
      m.addColorStop(1, "rgba(0,0,0,0)")
      bx.globalCompositeOperation = "destination-in"
      bx.fillStyle = m
      bx.fillRect(0, 0, W, H)
      bx.globalCompositeOperation = "source-over"
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = sweeping ? 1 : D
    ctx.drawImage(S.buf, 0, 0)
    ctx.globalAlpha = 1
    // the edge of the light as it travels
    if (sweeping && D > 0.02 && D < 0.9) {
      const R = 60 + 2700 * D * D
      ctx.strokeStyle = rgba(mix([255, 226, 150], [214, 204, 255], cool), 0.5 * (1 - D))
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(sunS[0], sunS[1], Math.max(1, R - 200), 0, 6.2832)
      ctx.stroke()
    }
  }

  layer(ctx, t, 0)
  surface(ctx, t, paper, n)
  // the ribbons run a little nearer the lens than the painting, so they slide across it as the camera moves.
  // By day they thin out and stop short, so the system they feed is what the eye rests on.
  layer(ctx, t, 0.05)
  const flow = (t < 12 ? 1 : 0.3 + 0.7 * n) * (1 - ramp(t, 33, 34))
  ribbons(ctx, t, flow, n)
  layer(ctx, t, 0)
  links(ctx, t, n)
  clusters(ctx, t, lit, cool, n)
  // one slow pass of light over the system while it compounds, so time is seen to go by
  const pass = lin(t, 25.4, 29.6)
  if (pass > 0 && pass < 1) {
    const px = -200 + 1900 * pass
    const edge = Math.sin(Math.PI * pass)
    const sh = ctx.createLinearGradient(px - 760, 0, px + 420, 300)
    sh.addColorStop(0, "rgba(46,38,24,0)")
    sh.addColorStop(0.35, `rgba(46,38,24,${0.16 * edge})`)
    sh.addColorStop(0.62, "rgba(46,38,24,0)")
    sh.addColorStop(0.8, `rgba(255,214,130,${0.34 * edge})`)
    sh.addColorStop(1, "rgba(255,214,130,0)")
    ctx.fillStyle = sh
    ctx.fillRect(-300, 200, 2000, 800)
  }

  // the sun's seat, the sun, and the one that takes its place
  if (out > 0 || inn > 0) {
    const gone = ramp(out, 0, 0.12) * (inn >= 1 ? 0 : 1)
    ctx.fillStyle = rgba(mix(paper, [50, 43, 80], n), gone)
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R + 10, 0, 6.2832)
    ctx.fill()
    ctx.strokeStyle = rgba(mix(GOLD_HI, [232, 205, 150], n), 0.7 * gone)
    ctx.lineWidth = 1.2
    ctx.setLineDash([3, 8])
    ctx.lineDashOffset = -t * 5
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R + 4, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
  }
  if (out > 0 && out < 1) {
    // the first sun is cut from the painting itself, so it can go dark and slide away
    const ox = 520 * out * out, oy = -620 * Math.pow(out, 1.5)
    ctx.save()
    ctx.translate(ox, oy)
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R, 0, 6.2832)
    ctx.clip()
    ctx.fillStyle = rgba([40, 34, 62], 1)
    ctx.fillRect(SUN[0] - SUN_R, SUN[1] - SUN_R, SUN_R * 2, SUN_R * 2)
    ctx.globalAlpha = 0.5
    ctx.drawImage(S.paint, 0, 0, PW, H)
    ctx.restore()
  }
  if (inn > 0 && inn < 1) {
    const e = 1 - Math.pow(1 - inn, 2.4)
    const ox = -700 * (1 - e) * (1 - e), oy = -520 * Math.pow(1 - e, 1.5)
    ctx.save()
    ctx.translate(ox, oy)
    ctx.globalAlpha = ramp(inn, 0, 0.15)
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], SUN_R, 0, 6.2832)
    ctx.clip()
    ctx.fillStyle = rgba([40, 34, 62], 1)
    ctx.fillRect(SUN[0] - SUN_R, SUN[1] - SUN_R, SUN_R * 2, SUN_R * 2)
    ctx.globalAlpha = 0.6 * ramp(inn, 0, 0.15)
    ctx.drawImage(S.paintB, 0, 0, PW, H)
    ctx.restore()
  }
  // the moment the second sun lights: a ring of its light goes out across everything
  if (litB > 0) {
    halo(ctx, SUN[0], SUN[1], SUN_R * (1.6 + 1.2 * litB), [214, 204, 255], 0.5 * litB * (1 - ramp(t, 32.6, 33.4)))
  }

  // the model's one thread: it is handed a pinch from a cluster, and the answer drops back
  const thread = ramp(t, 14.4, 15.2)
  const mc = CL[2]
  const md = Math.hypot(mc.x - SUN[0], mc.y - SUN[1])
  const mx = SUN[0] + ((mc.x - SUN[0]) / md) * (SUN_R + 8), my = SUN[1] + ((mc.y - SUN[1]) / md) * (SUN_R + 8)
  if (thread > 0) {
    ctx.strokeStyle = rgba(mix(GOLD, [232, 205, 150], n), 0.6 * thread)
    ctx.lineWidth = 1.3
    ctx.beginPath()
    ctx.moveTo(mc.x, mc.y)
    ctx.lineTo(mc.x + (mx - mc.x) * thread, mc.y + (my - mc.y) * thread)
    ctx.stroke()
    PINCH.forEach((a, i) => {
      if (a > 29.4 && a < 32.6) return
      grains(ctx, mc.x, mc.y, mx, my, lin(t, a, a + 0.7), 14, 500 + i, mix(GOLD, [255, 240, 204], n), 1.25)
      const fl = lin(t, a + 0.6, a + 1.1)
      if (fl > 0 && fl < 1) halo(ctx, SUN[0], SUN[1], SUN_R * 2.4, mix([255, 214, 130], [214, 200, 255], cool), 0.5 * Math.sin(Math.PI * fl))
      const f = lin(t, a + 0.8, a + 1.5)
      if (f > 0 && f < 1) {
        const e = f * f, e0 = Math.max(0, f - 0.2) ** 2
        const ex = mc.x - 620, ey = mc.y + 620
        spark(ctx, mx + (ex - mx) * e, my + (ey - my) * e, mx + (ex - mx) * e0, my + (ey - my) * e0, mix(GOLD, [255, 226, 160], n), 1, 7, mix([140, 92, 12], [255, 250, 232], n))
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
    ctx.strokeStyle = rgba(mix(GOLD_HI, [232, 205, 150], n), 0.6 * on)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(SUN[0], SUN[1], ex.R, a - 0.7, a + 0.7)
    ctx.stroke()
    const grow = ramp(t, ex.at + 0.3, ex.at + 1.2)
    ctx.strokeStyle = rgba(mix(GOLD, [232, 205, 150], n), 0.5 * on)
    ctx.lineWidth = 1.1
    ctx.beginPath()
    ctx.moveTo(c.x, c.y)
    ctx.lineTo(c.x + (x - c.x) * grow, c.y + (y - c.y) * grow)
    ctx.stroke()
    // its shadow falls away from the sun, on the paper behind it
    ctx.fillStyle = rgba(INKC, 0.14 * lit * on * (1 - n))
    ctx.beginPath()
    ctx.ellipse(x + Math.cos(a) * ex.r * 1.1, y + Math.sin(a) * ex.r * 1.1 + 5, ex.r * 1.1, ex.r * 0.8, 0, 0, 6.2832)
    ctx.fill()
    const pop = 1 + 0.4 * Math.sin(Math.PI * lin(t, ex.at, ex.at + 0.6))
    orb(ctx, x, y, ex.r * pop, ex.kind, 140 + i, on)
    for (let q = 0; q < 8; q++) {
      const at = ex.at + 1.2 + q * 2.1 + i * 0.4
      if (at > 33) break
      if (BACK.some((b) => b[1] === i && Math.abs(b[0] - at - 0.9) < 1.2)) continue
      grains(ctx, c.x, c.y, x, y, lin(t, at, at + 0.6), 8, 800 + i * 31 + q, mix(GOLD, [255, 240, 204], n))
      // the answer leaves along the orbit
      const f = lin(t, at + 0.6, at + 1.4)
      if (f > 0 && f < 1) {
        const dir = ex.w > 0 ? 1 : -1
        const aa = a + dir * 1.5 * (1 - (1 - f) * (1 - f)), ab = a + dir * 1.5 * Math.max(0, 1 - (1 - f) * (1 - f) - 0.16)
        spark(ctx, SUN[0] + ex.R * Math.cos(aa), SUN[1] + ex.R * Math.sin(aa), SUN[0] + ex.R * Math.cos(ab), SUN[1] + ex.R * Math.sin(ab), mix(GOLD, [255, 226, 160], n), 1 - f * f, 5, mix([140, 92, 12], [255, 250, 232], n))
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


  // dust close to the lens, out of focus, drifting the other way
  layer(ctx, t, 0.45)
  const br = rng(321)
  for (let i = 0; i < 26; i++) {
    const x0 = br() * 2600 - 200, y0 = br() * 1300 - 100, s = br(), ph = br() * 6.28
    const x = x0 - t * (8 + 14 * s), y = y0 + 14 * Math.sin(t * 0.4 + ph)
    halo(ctx, x, y, 16 + 40 * s, s > 0.6 ? [226, 186, 110] : mix([150, 142, 128], [200, 190, 230], n), (0.07 + 0.09 * s + 0.08 * n) * ramp(t, 0.2, 2) * (1 - ramp(t, 33, 34)))
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
    const mc = mix(paper, [26, 22, 44], n)
    mist.addColorStop(0, rgba(mc, 0))
    mist.addColorStop(0.55, rgba(mc, 0.9 * words))
    mist.addColorStop(1, rgba(mc, 0.96 * words))
    ctx.fillStyle = mist
    ctx.fillRect(0, 880, W, H - 880)
  }

  // the close: for one beat the surface is the dawn road, and the strider steps in
  const dawn = ramp(t, 33.2, 34.3)
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
  // the last half second falls back into the dark the film began in
  const end = ramp(t, 35.8, CONNECT_SECONDS)
  if (end > 0) {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const sk = ctx.createLinearGradient(0, 0, 0, H)
    sk.addColorStop(0, rgba(DUSK_TOP, end))
    sk.addColorStop(0.62, rgba(DUSK_LOW, end))
    sk.addColorStop(1, rgba(mix(DUSK_LOW, DUSK_TOP, 0.35), end))
    ctx.fillStyle = sk
    ctx.fillRect(0, 0, W, H)
  }
}

