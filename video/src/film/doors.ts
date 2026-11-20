import { k, ramp, rng, win } from "../util"
import { type Ctx, H, type RGB, W, blank, gz, halo, lin, makeNoise, mix, orb, rgba, stream } from "./core"
import { spark } from "./cost"
import type { Plates } from "./plates"
import { strider } from "./strider"

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

/* ---------- the strider's walk ---------- */

/** One full stride of the strider at this height: stopping on a whole stride leaves the legs wide, mid-walk, never stiff. */
const STRIDE = 186 * 0.66
const STOP = 400
/**
 * Where the feet are, how far they have walked, and how tall the strider stands. On from the left, slowly across
 * their own disc, and at dawn one more stride toward the road side of it. Never off their own ground.
 */
function walkAt(t: number): { x: number; y: number; walked: number; h: number; a: number } {
  const first = 3 * STRIDE
  let w = t < 3.3 ? 140 * lin(t, 0.5, 3.3) : 140 + (first - 140) * (1 - Math.pow(1 - lin(t, 3.3, 8), 1.7))
  if (t > 31.2) {
    const u = lin(t, 31.2, 33.6)
    w = first + STRIDE * u * u * (3 - 2 * u)
  }
  const x = STOP - first + w
  const y = x < 124 ? 470 + 7 * lin(x, 30, 124) : 477
  return { x, y, walked: w, h: 186, a: ramp(t, 0.5, 1.1) }
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
 * A low heap of grain on a disc's face. `fill` is how much of it is there yet. `upTo` lets the first disc's
 * grain appear only behind the strider as it trickles from the hand. Nothing is ever drawn past the rim.
 */
function discGrain(ctx: Ctx, di: number, fill: number, dull: number, upTo = 1e9) {
  if (fill <= 0) return
  const d = DISCS[di]
  const high = d.ry * 0.55 * Math.min(1, fill * 1.2)
  for (const p of DOTS[di]) {
    if (p.order > fill) continue
    const x = d.x + p.dx * d.rx
    if (x > upTo) continue
    const y = d.y + p.dy * d.ry - p.lift * high
    const fresh = Math.min(1, (upTo - x) / 14)
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
  const wk = walkAt(t)
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
  discGrain(ctx, 0, d1, asking, t < 8.4 ? wk.x - 6 : 1e9)
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

  // the strider: sand trickles from the hand onto the disc while crossing it
  if (wk.a > 0) {
    const trickle = win(t, 3.5, 8.1, 0.5)
    if (trickle > 0) {
      stream(ctx, t, wk.x - 10, wk.y - 86, wk.y - 2, 2.2, 260, 0, 61, trickle)
      halo(ctx, wk.x - 10, wk.y - 3, 12, [236, 198, 108], 0.35 * trickle)
    }
    // the pinch: lifted from the disc to the hand, thrown over the rim, falling to the road, and turning road grey there
    const reach = win(t, 17.0, 19.6, 0.5)
    if (t > 16.9 && t < 22.4) {
      const r = rng(77)
      const hx = wk.x + 26, hy = wk.y - 58
      const [, , rdx, rdy] = roadPt(0.33)
      for (let j = 0; j < 46; j++) {
        const lag = r() * 0.5, wob = gz(r), c = r(), along = gz(r) * 16, across = gz(r) * 4, pick = r()
        // up from the heap at the feet into the hand
        const upT = lin(t, 17.0 + lag * 0.6, 17.6 + lag * 0.6)
        // then out of the hand: a short throw, and gravity does the rest
        const t0 = 18.0 + lag
        const fly = 0.62 + 0.1 * c
        const ph = (t - t0) / fly
        const lx = DROP[0] + rdx * along - rdy * across, ly = DROP[1] + rdy * along + rdx * across * 0.5
        let x: number, y: number, grey = 0, a = 1
        if (ph <= 0) {
          if (upT <= 0) continue
          const sx = wk.x + 6 + pick * 30, sy = wk.y - 2
          const e = upT * upT * (3 - 2 * upT)
          x = sx + (hx - sx) * e + wob * 2 * (1 - e)
          y = sy + (hy - sy) * e
          if (upT >= 1) { x = hx + wob * 2.5; y = hy + wob * 1.5 }
        } else if (ph < 1) {
          x = hx + (lx - hx) * ph + wob * 2
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
      // the road takes it: one grey ripple where it lands
      const landed = lin(t, 18.7, 19.9)
      if (landed > 0 && landed < 1) {
        ctx.strokeStyle = rgba(GREYS[1], 0.8 * (1 - landed) * (1 - landed))
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.ellipse(DROP[0], DROP[1], 6 + 38 * landed, (6 + 38 * landed) * 0.32, -0.2, 0, 6.2832)
        ctx.stroke()
      }
    }
    // a soft shadow under the feet, then the figure
    ctx.fillStyle = rgba(INKC, 0.14 * wk.a)
    ctx.beginPath()
    ctx.ellipse(wk.x - 4, wk.y + 1, wk.h * 0.2, wk.h * 0.022, 0, 0, 6.2832)
    ctx.fill()
    ctx.save()
    ctx.globalAlpha = wk.a
    // when reaching for the pinch the stride settles: both feet down
    strider(ctx, wk.x, wk.y, wk.h * (1 - 0.03 * reach), wk.walked, { body: "rgba(26,22,12,1)", far: "rgba(66,60,50,1)" })
    ctx.restore()
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
