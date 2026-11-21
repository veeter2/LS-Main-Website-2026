import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type RGB, W, blank, gz, halo, lin, makeNoise, mix, orb, rgba, stream } from "./core"
import { spark } from "./cost"
import type { Plates } from "./plates"
import { type Pose, figure, glide, handOf, walkPose } from "./strider"

/**
 * The two doors film: whose memory is it?
 * It lives in the stepping stones painting. Each stone disc is one person's own ground. The pale road that
 * runs past below them is the company's. Grain settles on a disc and stays on it. Only a pinch the person
 * picks up and sets down crosses to the road. Everything here is drawn in the painting's own pixels
 * (1400 x 650), and the camera scales it up.
 */
export const DOORS_SECONDS = 35

const PS = H / 650
const CREAM: RGB = [255, 251, 243]
const INKC: RGB = [26, 22, 12]
const GOLD: RGB = [200, 169, 110]
const GOLD_HI: RGB = [236, 198, 108]
const GOLD_DEEP: RGB = [176, 124, 30]

/* ---------- the places, in painting pixels ---------- */

/** Each disc's top face: centre, radii, and how tall its wall is. */
type Disc = { x: number; y: number; rx: number; ry: number; wall: number; pal: RGB[]; n: number }
const SHADES: RGB[][] = [
  [[146, 104, 34], [188, 140, 50], [216, 170, 74], [236, 198, 108]], // gold: the strider's own
  [[122, 62, 44], [164, 92, 62], [196, 124, 88], [222, 160, 124]], // copper
  [[70, 62, 112], [104, 92, 150], [140, 128, 186], [176, 166, 214]], // dusk violet
  [[52, 78, 76], [80, 112, 108], [116, 148, 142], [156, 184, 176]], // sea grey
  [[96, 84, 52], [132, 116, 74], [166, 150, 104], [200, 186, 142]], // olive sand
  [[120, 74, 86], [156, 104, 116], [188, 138, 148], [216, 174, 180]], // rose
]
const DISCS: Disc[] = [
  { x: 362, y: 475, rx: 244, ry: 24, wall: 86, pal: SHADES[0], n: 3000 },
  { x: 708, y: 423, rx: 150, ry: 17, wall: 60, pal: SHADES[1], n: 1500 },
  { x: 904, y: 368, rx: 128, ry: 15, wall: 55, pal: SHADES[2], n: 1200 },
  { x: 1081, y: 317, rx: 98, ry: 10, wall: 30, pal: SHADES[3], n: 800 },
  { x: 1128, y: 347, rx: 76, ry: 6, wall: 28, pal: SHADES[4], n: 0 },
  { x: 1211, y: 268, rx: 56, ry: 6, wall: 22, pal: SHADES[5], n: 360 },
]
/** The road's gold line, near to far, and how wide the road is at each end. */
const ROAD: [number, number][] = [[120, 652], [301, 620], [504, 581], [700, 543], [903, 494], [1099, 438], [1190, 389], [1262, 318], [1310, 262]]
const ROAD_LEN = ROAD.slice(1).map((p, i) => Math.hypot(p[0] - ROAD[i][0], p[1] - ROAD[i][1]))
const ROAD_SUM = ROAD_LEN.reduce((a, b) => a + b, 0)
/** A point u of the way along the road, with its direction and its half width there. */
function roadPt(u: number): [number, number, number, number, number] {
  let left = Math.max(0, Math.min(1, u)) * ROAD_SUM
  for (let i = 0; i < ROAD_LEN.length; i++) {
    if (left <= ROAD_LEN[i] || i === ROAD_LEN.length - 1) {
      const f = left / ROAD_LEN[i]
      const [x0, y0] = ROAD[i], [x1, y1] = ROAD[i + 1]
      return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, (x1 - x0) / ROAD_LEN[i], (y1 - y0) / ROAD_LEN[i], 30 - 24 * Math.pow(u, 0.8)]
    }
    left -= ROAD_LEN[i]
  }
  return [0, 0, 1, 0, 10]
}
/** The model's seat: where the painting had an ink ball on a thin gold orbit. */
const SEAT: [number, number] = [1028, 105]
const BALL_R = 20
/** Where a question lands on the road, and where the strider sets a pinch down. */
const ASK_U = 0.74
const DROP: [number, number] = [560, 572]

export type Scene = { P: Plates; paint: HTMLCanvasElement; buf: HTMLCanvasElement }
/** The painting with the painted strider and the ink ball taken out, so the disc starts empty and the model can change. */
export function buildScene(img: HTMLImageElement): Scene {
  const paint = blank(1400, 650)
  const x = paint.getContext("2d")!
  x.drawImage(img, 0, 0, 1400, 650)
  x.save()
  x.filter = "blur(2.5px)"
  // the strider: sky above the disc's back edge, the disc's own face below it
  x.beginPath()
  for (const [px, py, i] of [[146, 492], [150, 470], [250, 330], [296, 278], [350, 278], [352, 330], [338, 362], [372, 476], [352, 486], [318, 440], [300, 400], [200, 492]].map((p, i) => [p[0], p[1], i])) i === 0 ? x.moveTo(px, py) : x.lineTo(px, py)
  x.closePath()
  x.clip()
  const g = x.createLinearGradient(0, 446, 0, 458)
  g.addColorStop(0, "rgb(255,251,243)")
  g.addColorStop(1, "rgb(254,249,236)")
  x.fillStyle = g
  x.fillRect(100, 250, 320, 260)
  x.restore()
  x.save()
  x.beginPath()
  x.rect(100, 440, 395, 70)
  x.clip()
  x.filter = "blur(1.5px)"
  x.fillStyle = "rgb(254,249,236)"
  x.beginPath()
  x.ellipse(362, 474, 238, 21, 0, 0, 6.2832)
  x.fill()
  x.restore()
  x.save()
  x.filter = "blur(2px)"
  x.fillStyle = "rgb(255,251,243)"
  x.beginPath()
  x.arc(SEAT[0], SEAT[1], 24, 0, 6.2832)
  x.fill()
  x.restore()
  const P = { small: blank(W / 4, H / 4), noise: makeNoise() } as unknown as Plates
  return { P, paint, buf: blank(W, H) }
}

/* ---------- the camera ---------- */

/** Centre in painting pixels, and how close. Close on the first disc, then back to see them all. */
const camAt = (t: number) => ({
  x: k(t, [[0, 400], [8, 430], [11.6, 700], [16.2, 700], [17.4, 560], [20, 572], [21.4, 700], [35, 700]]),
  y: k(t, [[0, 400], [8, 404], [11.6, 350], [16.2, 350], [17.4, 452], [20, 456], [21.4, 350], [35, 350]]),
  z: k(t, [[0, 1.45], [8, 1.56], [11.6, 0.86], [16.2, 0.87], [17.4, 1.3], [20, 1.36], [21.4, 0.88], [31, 0.9], [35, 0.92]]),
})
function cam(ctx: Ctx, t: number) {
  const c = camAt(t)
  const z = c.z * PS
  ctx.setTransform(z, 0, 0, z, W / 2 - c.x * z, H / 2 - c.y * z)
}

/* ---------- the strider ---------- */

const HH = 186
const STRIDE = HH * 0.66
const FD = 0.05 * HH, FR = 1.6 * FD
/** Where they stop first, and where they stand after the pinch. */
const P1 = 301, P2 = 380
const IN_STEPS = 5
const X0 = P1 - (IN_STEPS - 1) * STRIDE
const IN0 = -0.5, IN1 = 3.5, BOW = 16.3, CAST = 19.05, OFF = 31
/** Where the poured grain lands on the disc. */
const SOW_X = 360
const ss = (u: number) => u * u * (3 - 2 * u)
/**
 * The walk is worked out on a straight flat line, then laid into the picture: the far stones are smaller and
 * higher, so the strider gets smaller and climbs. A planted foot maps to one fixed point, so it never slides.
 */
const sizeAt = (w: number) => (w < 520 ? 1 : (1 - 0.24 * ss(lin(w, 520, 700))) * (1 - 0.158 * ss(lin(w, 760, 1000))))
const XT = (() => {
  const a: number[] = []
  let x = -400
  for (let w = -400; w <= 1500; w += 4) { a.push(x); x += 4 * sizeAt(w + 2) }
  return a
})()
const toX = (w: number) => {
  const f = (w + 400) / 4, i = Math.max(0, Math.min(XT.length - 2, Math.floor(f)))
  return XT[i] + (XT[i + 1] - XT[i]) * (f - i)
}
const footG = (w: number) => (w < 124 ? 470 + 7 * lin(w, 30, 124) : 477 - 52 * ss(lin(w, 540, 626)) - 55 * ss(lin(w, 880, 994)))
const hipG = (w: number) => (w < 124 ? 470 + 7 * lin(w, 30, 124) : 477 - 52 * ss(lin(w, 564, 650)) - 55 * ss(lin(w, 932, 1018)))
/** How far the arm is up for pouring, and how much grain is coming out of the hand. */
const sowAt = (t: number) => Math.max(ss(lin(t, 3.7, 4.5)) * (1 - ss(lin(t, 7.6, 8.4))), ss(lin(t, 24.8, 25.6)) * (1 - ss(lin(t, 27.5, 28.3))))
const pourAt = (t: number) => Math.max(win(t, 4.5, 7.6, 0.3), win(t, 25.6, 27.5, 0.3))

/** The strider's pose on the flat line: walks on, pours, bows for a pinch and casts it, pours again, walks on at dawn. */
function actor(t: number): Pose {
  const breath = t * 1.9
  let p: Pose
  if (t < BOW) p = walkPose(X0, 0, HH, (IN_STEPS - 1) * STRIDE * glide(lin(t, IN0, IN1)), IN_STEPS, false, breath)
  else if (t < 20.5) {
    // one step forward, a deep bow to the heap, up with the pinch, an underarm cast, and the back foot comes up
    const st = lin(t, BOW, BOW + 0.5), jn = lin(t, 19.9, 20.5)
    const lean = k(t, [[BOW, 0.05], [16.8, 0.35], [17.3, 1.15], [17.9, 1.15], [18.5, 0.08], [18.85, -0.08], [19.15, 0.42], [19.8, 0.1], [20.5, 0.05]])
    p = {
      hx: k(t, [[BOW, P1], [16.9, 340], [17.3, 348], [18, 348], [18.5, 338], [18.85, 332], [19.15, 352], [19.8, 345], [20.5, P2]]),
      hy: -HH * k(t, [[BOW, 0.598], [16.8, 0.5], [17.3, 0.31], [17.9, 0.31], [18.5, 0.52], [18.85, 0.5], [19.15, 0.51], [19.9, 0.52], [20.5, 0.598]]),
      h: HH,
      fa: [P1 + FR + (P2 + FD - P1 - FR) * ss(st), -HH * 0.04 * Math.sin(Math.PI * st)],
      fb: [P1 - FR + (P2 - FD - P1 + FR) * ss(jn), -HH * 0.04 * Math.sin(Math.PI * jn)],
      lean,
      armN: k(t, [[BOW, -0.02], [16.9, 0.5], [17.3, 0.15], [17.9, 0.15], [18.5, 0.75], [18.85, -0.85], [19.15, 1.55], [19.6, 0.9], [20.4, -0.02]]),
      armF: k(t, [[BOW, -0.07], [17.3, -0.55], [17.9, -0.55], [18.5, -0.1], [18.85, 0.4], [19.15, -0.6], [20.4, -0.07]]),
      nod: lean * 0.9,
    }
  } else if (t < OFF) p = walkPose(P2, 0, HH, 0, 2, true, breath)
  else {
    const u = t - OFF, v = STRIDE / 0.78
    p = walkPose(P2, 0, HH, u < 0.6 ? (v * u * u) / 1.2 : v * (u - 0.3), 99, true)
  }
  const a = sowAt(t)
  if (a > 0) {
    p.armN += (1.2 + 0.1 * Math.sin(t * 1.4) - p.armN) * a
    p.lean += 0.04 * a
  }
  return p
}
/** The pose laid into the picture. */
function toPic(p: Pose): Pose {
  const s = sizeAt(p.hx)
  return { ...p, hx: toX(p.hx), hy: hipG(p.hx) + p.hy * s, h: HH * s, fa: [toX(p.fa[0]), footG(p.fa[0]) + p.fa[1] * sizeAt(p.fa[0])], fb: [toX(p.fb[0]), footG(p.fb[0]) + p.fb[1] * sizeAt(p.fb[0])] }
}

/* ---------- grain on a disc ---------- */

type Dot = { dx: number; dy: number; lift: number; c: number; s: number; order: number }
const DOTS: Dot[][] = DISCS.map((d, di) => {
  const r = rng(4100 + di * 13)
  return Array.from({ length: d.n }, () => {
    const rad = Math.sqrt(r()) * 0.84, a = r() * 6.2832
    return { dx: Math.cos(a) * rad, dy: Math.sin(a) * rad, lift: (1 - rad * rad) * Math.pow(r(), 0.6), c: r(), s: r(), order: r() }
  })
})
/**
 * A low heap of grain on a disc's face. `fill` is how much of it is there yet. `spread` lets the first disc's
 * grain pile outward from where it pours out of the hand. Nothing is ever drawn past the rim.
 */
function discGrain(ctx: Ctx, di: number, fill: number, dull: number, spread = 1e9) {
  if (fill <= 0) return
  const d = DISCS[di]
  const high = d.ry * 0.55 * Math.min(1, fill * 1.2)
  for (const p of DOTS[di]) {
    if (p.order > fill) continue
    const x = d.x + p.dx * d.rx
    const far = Math.hypot(p.dx - (SOW_X - d.x) / d.rx, p.dy)
    if (far > spread) continue
    const y = d.y + p.dy * d.ry - p.lift * high
    const fresh = Math.min(1, (spread - far) / 0.1)
    const col = d.pal[Math.min(3, Math.floor(p.c * 4 + p.lift * 0.8))]
    ctx.fillStyle = rgba(mix(col, [150, 146, 138], dull * 0.45), (0.55 + 0.4 * p.c) * fresh)
    ctx.beginPath()
    ctx.arc(x, y, 0.45 + p.s * 0.75, 0, 6.2832)
    ctx.fill()
  }
}
/** The gold rim at the front of a disc's face: the line that holds. */
function rim(ctx: Ctx, di: number, glow: number) {
  if (glow <= 0) return
  const d = DISCS[di]
  ctx.strokeStyle = rgba(GOLD_HI, 0.9 * glow)
  ctx.lineWidth = 1.5
  ctx.shadowColor = rgba([255, 214, 130], glow)
  ctx.shadowBlur = 14 * glow
  ctx.beginPath()
  ctx.ellipse(d.x, d.y, d.rx, d.ry, 0, 0.05, Math.PI - 0.05)
  ctx.stroke()
  ctx.shadowBlur = 0
}

/* ---------- the road ---------- */

const GREYS: RGB[] = [[74, 72, 68], [104, 102, 96], [134, 132, 126], [166, 164, 158]]
function roadGrain(ctx: Ctx, t: number, amount: number, lit: number) {
  if (amount <= 0) return
  const r = rng(5200)
  ctx.lineCap = "round"
  for (let i = 0; i < 9000; i++) {
    const u0 = r(), off = gz(r) * 0.62, c = r(), s = r(), keep = r(), sp = 0.012 + 0.012 * r()
    if (keep > amount / 1.6) continue
    const u = (u0 + t * sp) % 1
    // the road fills from the near end, and sand never runs evenly
    if (u > lin(amount, 0, 0.9) * 1.05) continue
    if (Math.sin(u * 60 - t * 1.6 + Math.floor(s * 3)) < -0.8 && s < 0.6) continue
    const [x, y, dx, dy, w] = roadPt(u)
    const px = x - dy * off * w, py = y + dx * off * w * 0.55
    const fade = Math.min(1, u * 14) * Math.min(1, (1 - u) * 10)
    const size = (0.5 + s * 0.8) * (1 - 0.5 * u)
    ctx.strokeStyle = rgba(mix(GREYS[Math.floor(c * 4)], [210, 204, 190], lit * 0.35), (0.6 + 0.4 * c) * fade)
    ctx.lineWidth = size * 2
    ctx.beginPath()
    ctx.moveTo(px - dx * 1.6 * (1 - 0.5 * u), py - dy * 1.6 * (1 - 0.5 * u))
    ctx.lineTo(px, py)
    ctx.stroke()
  }
}
/** The road's own gold line, brighter while the film is talking about it. */
function roadLine(ctx: Ctx, glow: number) {
  if (glow <= 0) return
  ctx.strokeStyle = rgba(GOLD_HI, 0.85 * glow)
  ctx.lineWidth = 1.4
  ctx.shadowColor = rgba([255, 214, 130], glow)
  ctx.shadowBlur = 12 * glow
  ctx.beginPath()
  ROAD.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)))
  ctx.stroke()
  ctx.shadowBlur = 0
}

/* ---------- the model above ---------- */

function ballAt(t: number): { x: number; y: number; kind: "gold" | "pearl"; a: number } {
  // it leaves along the painted orbit, up and to the right, and the next one comes down the same way
  const path = (e: number): [number, number] => [SEAT[0] + 80 * e + 40 * e * e, SEAT[1] - 150 * e]
  if (t < 29.4) {
    const out = ramp(t, 28.2, 29.4)
    const [x, y] = path(out * out)
    return { x, y, kind: "gold", a: 1 - ramp(t, 28.9, 29.4) }
  }
  const e = 1 - ramp(t, 29.3, 30.6)
  const [x, y] = path(e * e)
  return { x, y, kind: "pearl", a: ramp(t, 29.3, 29.8) }
}

/** Everything but the stones: used so a thread from the road passes behind them and never touches one. */
function clipOutDiscs(ctx: Ctx) {
  for (const d of DISCS) {
    ctx.beginPath()
    ctx.rect(-400, -400, 2200, 1500)
    ctx.moveTo(d.x + d.rx, d.y)
    ctx.ellipse(d.x, d.y, d.rx + 1, d.ry + 1, 0, 0, Math.PI, true)
    ctx.lineTo(d.x - d.rx, d.y + d.wall)
    ctx.ellipse(d.x, d.y + d.wall, d.rx + 1, d.ry + 1, 0, Math.PI, 0, true)
    ctx.closePath()
    ctx.clip("evenodd")
  }
}

const ASKS = [20.8, 22.6]
function asks(ctx: Ctx, t: number) {
  const b = ballAt(t)
  const [qx, qy] = roadPt(ASK_U)
  for (const [i, at] of ASKS.entries()) {
    // a question comes down out of the sky and lands on the road
    const dn = lin(t, at, at + 0.7)
    if (dn > 0 && dn < 1) {
      const e = dn * dn, e0 = Math.max(0, dn - 0.16) ** 2
      const sx = qx + 330, sy = qy - 60
      spark(ctx, sx + (qx - sx) * e, sy + (qy - sy) * e - 90 * Math.sin(Math.PI * e), sx + (qx - sx) * e0, sy + (qy - sy) * e0 - 90 * Math.sin(Math.PI * e0), GOLD_DEEP, 1, 3.4, [255, 244, 214])
    }
    const land = lin(t, at + 0.65, at + 1.4)
    if (land > 0 && land < 1) {
      ctx.strokeStyle = rgba(GOLD_DEEP, 0.8 * (1 - land) * (1 - land))
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.ellipse(qx, qy, 6 + 40 * land, (6 + 40 * land) * 0.3, -0.5, 0, 6.2832)
      ctx.stroke()
    }
    // a thread rises from the road, and only from the road, behind the stones
    const up = lin(t, at + 0.8, at + 1.5)
    if (up > 0) {
      const a = 1 - ramp(t, at + 2.6, at + 3.3)
      ctx.save()
      clipOutDiscs(ctx)
      ctx.strokeStyle = rgba(GOLD_DEEP, 0.75 * a)
      ctx.lineWidth = 0.9
      ctx.beginPath()
      ctx.moveTo(qx, qy)
      ctx.lineTo(qx + (b.x - qx) * up, qy + (b.y - qy) * up)
      ctx.stroke()
      const r = rng(900 + i)
      for (let j = 0; j < 12; j++) {
        const lag = r() * 0.3, w = gz(r) * 1.3
        const ph = Math.max(0, Math.min(1, (lin(t, at + 0.8, at + 1.8) - lag) / 0.7))
        if (ph <= 0 || ph >= 1) continue
        ctx.fillStyle = rgba(GREYS[1 + (j % 3)], 0.95)
        ctx.beginPath()
        ctx.arc(qx + (b.x - qx) * ph + w, qy + (b.y - qy) * ph + w * 0.5, 0.9 + r() * 0.8, 0, 6.2832)
        ctx.fill()
      }
      ctx.restore()
    }
    const fl = lin(t, at + 1.7, at + 2.2)
    if (fl > 0 && fl < 1) halo(ctx, b.x, b.y, BALL_R * 3, b.kind === "gold" ? [255, 214, 130] : [190, 180, 240], 0.6 * Math.sin(Math.PI * fl))
    // the answer drops back to the road and runs off down it
    const an = lin(t, at + 2, at + 3.1)
    if (an > 0 && an < 1) {
      const pos = (q: number): [number, number] => {
        if (q < 0.45) {
          const e = (q / 0.45) ** 2
          return [b.x + (qx - b.x) * e, b.y + (qy - b.y) * e]
        }
        const [x, y] = roadPt(ASK_U - ((q - 0.45) / 0.55) * 0.5)
        return [x, y - 2]
      }
      const [x, y] = pos(an), [px, py] = pos(Math.max(0, an - 0.07))
      ctx.save()
      if (an < 0.45) clipOutDiscs(ctx)
      spark(ctx, x, y, px, py, GOLD_DEEP, 1, 3.2, [255, 244, 214])
      ctx.restore()
    }
  }
}

/* ---------- the whole scene ---------- */

export function doorsScene(ctx: Ctx, t: number, S: Scene) {
  paint(ctx, t, S)
  // the last moments melt back into the first frame, so the loop has no seam
  const back = ramp(t, 34.3, DOORS_SECONDS)
  if (back > 0) {
    const bx = S.buf.getContext("2d")!
    paint(bx, 0, S)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = back
    ctx.drawImage(S.buf, 0, 0)
    ctx.globalAlpha = 1
  }
}

function paint(ctx: Ctx, t: number, S: Scene) {
  const others = ramp(t, 8.8, 11.8)
  const grow = ramp(t, 24.6, 28)
  const roadAmt = ramp(t, 12.2, 15.4) + 0.6 * grow
  const asking = Math.max(...ASKS.map((a) => win(t, a + 0.5, a + 3.2, 0.5)))
  const rims = Math.max(win(t, 12.4, 16.4, 0.8) * 0.8, win(t, 17.6, 20.4, 0.6) * 0.7, win(t, 24.6, 28.2, 0.9), asking * 0.6)
  const dawn = ramp(t, 31, 33)

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = rgba(CREAM, 1)
  ctx.fillRect(0, 0, W, H)
  cam(ctx, t)
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(S.paint, 0, 0)
  // the sky above the painting goes on up, the same cream
  ctx.fillStyle = rgba(CREAM, 1)
  ctx.fillRect(-400, -400, 2200, 401)

  // dawn: warm light from the far end of the road
  if (dawn > 0) {
    const g = ctx.createRadialGradient(1330, 220, 0, 1330, 220, 900)
    g.addColorStop(0, rgba([255, 214, 130], 0.42 * dawn))
    g.addColorStop(0.5, rgba([255, 214, 130], 0.12 * dawn))
    g.addColorStop(1, rgba([255, 214, 130], 0))
    ctx.fillStyle = g
    ctx.fillRect(-200, -200, 1800, 1100)
  }

  // the road, the company's: grey grain running along it, and its gold line
  roadGrain(ctx, t, roadAmt, asking)
  roadLine(ctx, Math.max(win(t, 12.4, 16.4, 0.8), asking, grow * (1 - ramp(t, 28, 29)) * 0.8, dawn * 0.5))

  // each disc's own grain, in its own shade, never past its rim
  const d1 = t < 8 ? 0.42 : 0.42 + 0.58 * grow
  discGrain(ctx, 0, d1, asking, t < 8.6 ? lin(t, 4.7, 8.4) * 2 : 1e9)
  for (let i = 1; i < DISCS.length; i++) discGrain(ctx, i, others * (0.45 + 0.55 * grow) * lin(others, (i - 1) * 0.12, (i - 1) * 0.12 + 0.5), asking)
  for (let i = 0; i < DISCS.length; i++) rim(ctx, i, rims * (i === 4 ? 0.5 : 1))

  // one slow pass of light and shade while the day goes by
  const pass = lin(t, 24.4, 28.2)
  if (pass > 0 && pass < 1) {
    const px = -300 + 2000 * pass
    const edge = Math.sin(Math.PI * pass)
    const sh = ctx.createLinearGradient(px - 600, 0, px + 300, 200)
    sh.addColorStop(0, "rgba(46,38,24,0)")
    sh.addColorStop(0.4, `rgba(46,38,24,${0.1 * edge})`)
    sh.addColorStop(0.66, "rgba(46,38,24,0)")
    sh.addColorStop(0.82, `rgba(255,214,130,${0.16 * edge})`)
    sh.addColorStop(1, "rgba(255,214,130,0)")
    ctx.fillStyle = sh
    ctx.fillRect(-300, 0, 2000, 700)
  }

  // the model above the road's far end
  const b = ballAt(t)
  const away = win(t, 28.6, 30.4, 0.3)
  if (away > 0) {
    ctx.strokeStyle = rgba(GOLD_DEEP, 0.7 * away)
    ctx.lineWidth = 0.8
    ctx.setLineDash([2, 5])
    ctx.lineDashOffset = -t * 4
    ctx.beginPath()
    ctx.arc(SEAT[0], SEAT[1], BALL_R + 4, 0, 6.2832)
    ctx.stroke()
    ctx.setLineDash([])
  }
  halo(ctx, b.x, b.y, BALL_R * 3.2, b.kind === "gold" ? [255, 214, 130] : [190, 180, 240], 0.3 * b.a)
  orb(ctx, b.x, b.y, BALL_R, b.kind, 91, b.a)
  if (b.kind === "pearl") halo(ctx, b.x, b.y, BALL_R * 4, [190, 180, 240], 0.5 * win(t, 30.5, 31.6, 0.4))
  asks(ctx, t)

  // the strider, always on the ground: a soft shadow under each foot that is down, then the figure
  const flat = actor(t)
  const P = toPic(flat)
  for (const [f, w] of [[P.fa, flat.fa], [P.fb, flat.fb]] as [[number, number], [number, number]][]) {
    const a = Math.max(0, 1 + w[1] / 5)
    if (a <= 0) continue
    ctx.fillStyle = rgba(INKC, 0.13 * a)
    ctx.beginPath()
    ctx.ellipse(f[0] + 2, f[1] + 1, P.h * 0.085, P.h * 0.014, 0, 0, 6.2832)
    ctx.fill()
  }
  const { hand } = figure(ctx, P, { body: "rgba(26,22,12,1)", far: "rgba(66,60,50,1)" })

  // grain pours from the open hand, held out, and piles where it lands
  const pour = pourAt(t)
  if (pour > 0) {
    stream(ctx, t, hand[0] + 1, hand[1] + 2, 474, 2, 240, 0, 61, pour)
    halo(ctx, hand[0], hand[1], 9, [236, 198, 108], 0.4 * pour)
    halo(ctx, hand[0] + 1, 473, 13, [236, 198, 108], 0.32 * pour)
  }

  // the pinch: gathered from the heap into the hand, carried up, cast over the rim, and turning road grey where it lands
  if (t > 17.2 && t < 23) {
    const r = rng(77)
    const [, , rdx, rdy] = roadPt(0.33)
    let held = 0
    for (let j = 0; j < 46; j++) {
      const lag = r(), wob = gz(r), c = r(), along = gz(r) * 16, across = gz(r) * 4, pick = r()
      const upT = lin(t, 17.25 + lag * 0.3, 17.7 + lag * 0.3)
      const t0 = CAST + lag * 0.13
      const fly = 0.62 + 0.1 * c
      const ph = (t - t0) / fly
      const lx = DROP[0] + rdx * along - rdy * across, ly = DROP[1] + rdy * along + rdx * across * 0.5
      let x: number, y: number, grey = 0, a = 1
      if (ph <= 0) {
        if (upT <= 0) continue
        const sx = hand[0] - 16 + pick * 32, sy = 471
        const e = ss(upT)
        x = sx + (hand[0] + wob * 2.2 - sx) * e
        y = sy + (hand[1] + (c - 0.5) * 4 - sy) * e
        held = Math.max(held, e)
      } else if (ph < 1) {
        const [hx, hy] = handOf(toPic(actor(t0)))
        x = hx + (lx - hx) * ph + wob * 2 * (1 - ph)
        y = hy + (ly - hy) * ph - 4 * 34 * ph * (1 - ph) + (ly - hy) * 0.35 * (ph * ph - ph)
      } else {
        // landed: a small bounce, then it lies on the road, goes grey, and moves off with the road's own grain
        const tl = t - t0 - fly
        const hop = Math.max(0, Math.sin(Math.min(1, tl / 0.28) * Math.PI)) * 3.5 * (1 - c * 0.5)
        const drift = Math.max(0, tl - 0.3) * 22
        x = lx + rdx * drift
        y = ly + rdy * drift - hop
        grey = lin(tl, 0.05, 0.45)
        a = 1 - lin(tl, 1.6, 2.6)
      }
      if (a <= 0) continue
      ctx.fillStyle = rgba(mix(SHADES[0][1 + (j % 3)], GREYS[j % 3], grey), a)
      ctx.beginPath()
      ctx.arc(x, y, 1.3 + c * 1.5, 0, 6.2832)
      ctx.fill()
      if (grey < 1 && j % 3 === 0) halo(ctx, x, y, 9, [236, 190, 90], 0.3 * (1 - grey) * a)
    }
    if (held > 0 && t < CAST) halo(ctx, hand[0], hand[1], 16, [236, 198, 108], 0.5 * held)
    // the road takes it: one grey ripple where it lands
    const landed = lin(t, CAST + 0.66, CAST + 1.86)
    if (landed > 0 && landed < 1) {
      ctx.strokeStyle = rgba(GREYS[1], 0.8 * (1 - landed) * (1 - landed))
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.ellipse(DROP[0], DROP[1], 6 + 38 * landed, (6 + 38 * landed) * 0.32, -0.2, 0, 6.2832)
      ctx.stroke()
    }
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  // room for the words, and cover for where the painting ends when the camera stands back
  const words = 1
  const mist = ctx.createLinearGradient(0, 820, 0, 960)
  mist.addColorStop(0, rgba(CREAM, 0))
  mist.addColorStop(0.7, rgba(CREAM, 0.93 * words))
  mist.addColorStop(1, rgba(CREAM, 1))
  ctx.fillStyle = mist
  ctx.fillRect(0, 820, W, H - 820)
  // the close: a quiet corner of sky for the words
  const close = ramp(t, 31.6, 32.4)
  if (close > 0) {
    const g = ctx.createRadialGradient(400, 240, 0, 400, 240, 520)
    g.addColorStop(0, rgba(CREAM, 0.75 * close))
    g.addColorStop(1, rgba(CREAM, 0))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
}
